import {
    Button,
    Card,
    Col,
    message,
    Radio,
    Row,
    Space,
    Spin,
    Table,
    theme,
    Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";

import {
    FileAddOutlined,
    MailOutlined,
    PlusCircleOutlined,
    ReloadOutlined,
    SaveOutlined,
} from "@ant-design/icons";
import type { NoticeType } from "antd/es/message/interface";

import {
    InvoiceButton,
    InvoiceInput,
    InvoiceSelect,
} from "@/components/InvoiceFormFields";
import { handleFieldNavigation } from "@/utils/newInvoiceKeyboardEvents";
import { invoiceItemsColumns, paymentModes } from "./constants";
import { useInvoiceState } from "@/states/invoiceState";

import { checkDisabilityForReset } from "./validators";

export const NewInvoice: React.FC = () => {
    const {
        invoiceData,
        setInvoiceData,
        productData,
        setProductData,
        selectedCustomer,
        customersAsOptions,
        productsAsOptions,
        checkDisability,
        fetchSelectedCustomer,
        fetchCustomers,
        fetchProducts,
    } = useInvoiceState();

    const quantityRef = useRef(null);
    const discountRef = useRef(null);

    // Modal state
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [isCustomersLoading, setIsCustomersLoading] =
        useState<boolean>(false);
    const [isProductsLoading, setIsProductsLoading] = useState<boolean>(false);

    // Message API
    const [messageApi, contextHolder] = message.useMessage();

    // Update invoice data when selected customer changes
    useEffect(() => {
        setInvoiceData({
            ...invoiceData,
            customer: selectedCustomer, // Currently we are storing the entire customer object in furture we can store only the id
        });
    }, [selectedCustomer]);

    useEffect(() => {
        setIsCustomersLoading(true);
        fetchCustomers()
            .then(() => setIsCustomersLoading(false))
            .catch(message => {
                showMessage("error", message);
                setIsCustomersLoading(false);
            });

        setIsProductsLoading(true);
        fetchProducts()
            .then(() => setIsProductsLoading(false))
            .catch(message => {
                showMessage("error", message);
                setIsProductsLoading(false);
            });
    }, []);

    const resetInvoiceData = () => {
        setInvoiceData({
            customer: null,
            paymentMode: "",
            items: [],
        });
    };

    const showMessage = (type: NoticeType, message: string) => {
        messageApi.open({
            type: `${type}`,
            content: `${message}`,
        });
    };

    // Handle keyboard navigation for form fields
    const handleKeyUp = (
        e: React.KeyboardEvent<HTMLInputElement>,
        fieldId: string
    ) => {
        handleFieldNavigation(e, fieldId);
    };

    return (
        <>
            {contextHolder}

            {/* Product Selection Modal */}
            {/* <ProductSelectionModal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onSelect={handleFinalProductSelection}
                products={similarProducts}
            /> */}
            <div className="newInvoiceWrapper">
                <Col span={24}>
                    <Row
                        style={{
                            margin: "8px 5px 8px 5px",
                        }}
                        justify="space-between"
                        align="middle"
                    >
                        <Typography.Title
                            level={4}
                            className="customerDropdownTitle"
                            // style={{border: "1px solid black"}}
                        >
                            New Invoice
                        </Typography.Title>
                        <Row
                        // style={{ border: "1px solid black" }}
                        >
                            <Space
                                direction="horizontal"
                                style={{ marginRight: "8px" }}
                            >
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        resetInvoiceData();
                                    }}
                                    disabled={checkDisabilityForReset()}
                                    style={{
                                        cursor: checkDisabilityForReset()
                                            ? "not-allowed"
                                            : "pointer",
                                    }}
                                    icon={<ReloadOutlined />}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        // onPressedGenerateHandler();
                                    }}
                                    disabled={checkDisability()}
                                    style={{
                                        cursor: checkDisability()
                                            ? "not-allowed"
                                            : "pointer",
                                    }}
                                    icon={<FileAddOutlined />}
                                >
                                    Generate Invoice
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        // onPressedSaveButtonHandler();
                                    }}
                                    disabled={checkDisability()}
                                    style={{
                                        cursor: checkDisability()
                                            ? "not-allowed"
                                            : "pointer",
                                    }}
                                    icon={<SaveOutlined />}
                                >
                                    Save
                                </Button>
                                <Button
                                    type="primary"
                                    disabled={checkDisability()}
                                    style={{
                                        cursor: checkDisability()
                                            ? "not-allowed"
                                            : "pointer",
                                    }}
                                    icon={<MailOutlined />}
                                >
                                    Email
                                </Button>
                            </Space>
                        </Row>
                    </Row>
                    <Card styles={{ body: { margin: "0px", padding: "8px" } }}>
                        <Row>
                            <InvoiceSelect
                                label="Customer"
                                width={380}
                                value={invoiceData?.customer?.number}
                                onSelect={(_, selectedCustomer) => {
                                    if (selectedCustomer?.customValue) {
                                        fetchSelectedCustomer(
                                            selectedCustomer.customValue.id
                                        );
                                    }
                                }}
                                placeholder="Select Customer"
                                options={customersAsOptions}
                                filterOption={(input, option) => {
                                    return (
                                        option?.label
                                            ?.toString()
                                            .toLowerCase()
                                            .includes(input.toLowerCase()) ??
                                        false
                                    );
                                }}
                                showSearch
                                allowClear
                                defaultOpen
                                autoFocus
                                loading={isCustomersLoading}
                            />
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    marginLeft: "100px",
                                }}
                            >
                                <Typography.Text className="primary-input-field-header-style">
                                    Payment Mode
                                </Typography.Text>
                                <Radio.Group
                                    value={invoiceData?.paymentMode}
                                    onChange={event => {
                                        if (!invoiceData.customer) {
                                            showMessage(
                                                "warning",
                                                "Please select Customer"
                                            );
                                            return;
                                        }
                                        setInvoiceData({
                                            ...invoiceData,
                                            paymentMode: event.target.value,
                                        });

                                        const productSearchDropdown =
                                            document.getElementById(
                                                "productSearch"
                                            );
                                        productSearchDropdown?.focus();
                                    }}
                                    options={paymentModes}
                                    optionType="button"
                                    buttonStyle="solid"
                                />
                            </Space>
                        </Row>
                        <Row style={{ marginTop: "20px" }}>
                            <InvoiceSelect
                                label="Product"
                                width={380}
                                id="productSearch"
                                value={productData?.name}
                                // onSelect={(_, selectedProduct) => {
                                //     if (
                                //         (selectedProduct as ProductOption)
                                //             ?.customValue
                                //     ) {
                                //         handleProductSelectWithValidation(
                                //             selectedProduct as ProductOption
                                //         );
                                //     }
                                // }}
                                // onKeyDown={e => {
                                //     // Handle Enter key press on dropdown
                                //     if (
                                //         e.key === "Enter" &&
                                //         productsAsOptions.length > 0
                                //     ) {
                                //         e.preventDefault();
                                //         e.stopPropagation();

                                //         // Find the highlighted option in the dropdown
                                //         const highlightedOption =
                                //             document.querySelector(
                                //                 ".ant-select-item-option-active, .ant-select-item-option-selected"
                                //             ) as HTMLElement;

                                //         if (highlightedOption) {
                                //             // Get the data-value attribute which contains the product ID
                                //             const productId =
                                //                 highlightedOption.getAttribute(
                                //                     "data-value"
                                //                 );
                                //             if (productId) {
                                //                 // Find the product option with this ID
                                //                 const selectedOption =
                                //                     productsAsOptions.find(
                                //                         option =>
                                //                             option.value ===
                                //                             productId
                                //                     );

                                //                 if (selectedOption) {
                                //                     // Manually trigger product selection
                                //                     handleProductSelectWithValidation(
                                //                         selectedOption
                                //                     );
                                //                 }
                                //             }
                                //         }
                                //     }
                                // }}
                                onClear={() => setProductData(null)}
                                options={productsAsOptions}
                                filterOption={(input, option) =>
                                    option?.label
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(input.toLowerCase()) ?? false
                                }
                                placeholder="Select Product"
                                showSearch
                                allowClear
                                loading={isProductsLoading}
                            />
                            <InvoiceInput
                                label="Company"
                                width="110px"
                                value={productData?.company}
                                disabled={true}
                                className="invoiceInputFields"
                            />
                            <InvoiceInput
                                label="Quantity"
                                value={productData?.quantity}
                                id="quantityField"
                                onChange={event =>
                                    setProductData(prev =>
                                        prev === null
                                            ? null
                                            : {
                                                  ...prev,
                                                  quantity: Number(
                                                      event.target.value
                                                  ),
                                              }
                                    )
                                }
                                onKeyUp={e => handleKeyUp(e, "quantityField")}
                                ref={quantityRef}
                            />
                            <InvoiceInput
                                label="Pack"
                                value={productData?.packingType}
                                id="packingTypeField"
                                disabled={true}
                            />
                            <InvoiceInput
                                label="Mf Date"
                                value={productData?.manufacturingDate?.toString()}
                                id="manufacturingDateField"
                                disabled={true}
                            />
                            <InvoiceInput
                                label="Exp Date"
                                value={productData?.expiryDate?.toString()}
                                id="expiryDateField"
                                disabled={true}
                            />
                            <InvoiceInput
                                label="SGST"
                                value={productData?.sGst}
                                id="sGstField"
                                disabled={true}
                            />
                            <InvoiceInput
                                label="CGST"
                                value={productData?.cGst}
                                id="cGstField"
                                disabled={true}
                            />
                            <InvoiceInput
                                label="IGST"
                                value={productData?.iGst}
                                id="iGstField"
                                disabled={true}
                            />
                            <InvoiceInput
                                label="Rate"
                                value={productData?.rate}
                                id="rateField"
                                className="invoiceInputFields rateInputFields"
                                onChange={event =>
                                    setProductData(prev =>
                                        prev === null
                                            ? null
                                            : {
                                                  ...prev,
                                                  rate: Number(
                                                      event.target.value
                                                  ),
                                              }
                                    )
                                }
                                onKeyUp={e => handleKeyUp(e, "rateField")}
                            />
                            <InvoiceInput
                                label="Mrp"
                                value={productData?.mrp}
                                id="mrpField"
                                onChange={event =>
                                    setProductData(prev =>
                                        prev === null
                                            ? null
                                            : {
                                                  ...prev,
                                                  mrp: Number(
                                                      event.target.value
                                                  ),
                                              }
                                    )
                                }
                                onKeyUp={e => handleKeyUp(e, "mrpField")}
                            />
                            <InvoiceInput
                                label="Discount"
                                value={"discount"}
                                id="discountField"
                                // onChange={event =>
                                //     setDiscount(Number(event.target.value))
                                // }
                                onKeyUp={e => handleKeyUp(e, "discountField")}
                                ref={discountRef}
                            />
                            <InvoiceButton
                                type="primary"
                                id="addButton"
                                // onClick={onClickAddButton}
                                icon={<PlusCircleOutlined />}
                                containerStyle={{ margin: "31px 0 0 0" }}
                            >
                                Add
                            </InvoiceButton>
                        </Row>
                        <Row style={{ marginTop: "20px" }}>
                            <Table
                                bordered
                                columns={invoiceItemsColumns}
                                dataSource={invoiceData?.items}
                                scroll={{
                                    y: 270,
                                }}
                                pagination={false}
                            ></Table>
                        </Row>
                    </Card>
                </Col>
            </div>
        </>
    );
};
