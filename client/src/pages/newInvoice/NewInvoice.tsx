import {
    Button,
    Card,
    Col,
    Form,
    message,
    Radio,
    Row,
    Space,
    Typography
} from "antd";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";

import {
    InvoiceButton,
    InvoiceInput,
    InvoiceSelect,
} from "@/components/InvoiceFormFields";
import { handleFieldNavigation } from "@/utils/newInvoiceKeyboardEvents";
import {
    FileAddOutlined,
    MailOutlined,
    PlusCircleOutlined,
    ReloadOutlined,
    SaveOutlined,
} from "@ant-design/icons";
import { invoiceItemsColumns, paymentModes } from "./constants";

import EditableTable from "@/components/common/EditableTable";
import ProductSelectionModal from "@/components/features/ProductSelectionModal";
import { newInvoiceStore } from "@/stores/newInvoiceStore";
import { InvoiceItem, ProductOption } from "@/types/component";
import { NoticeType } from "antd/es/message/interface";
import { fetchCustomers, fetchProducts, fetchSelectedCustomer } from "./fetch";
import {
    handleFinalProductSelection,
    handleProductSelect,
    onClickAddButton,
} from "./handlers";
import { checkDisability, checkDisabilityForReset } from "./validators";

export const NewInvoice: React.FC = observer(() => {
    const quantityRef = useRef(null);
    const discountRef = useRef(null);
    const [form] = Form.useForm();
    const [tableData, setTableData] = useState(
        newInvoiceStore.invoiceData.items
    );
    const [editingKey, setEditingKey] = useState("");
    const isEditing = (record: any) => record.key === editingKey;

    const [messageApi, contextHolder] = message.useMessage();

    const showMessage = (type: NoticeType, message: string) => {
        messageApi.open({
            type: `${type}`,
            content: `${message}`,
        });
    };

    const edit = (record: Partial<InvoiceItem> & { key: string }) => {
        form.setFieldsValue(record); // Once check it
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as InvoiceItem;
            const newData = [...tableData];
            const index = newData.findIndex(item => key === item.id);
            if (index === -1) {
                console.log("Item not found");
                return;
            }
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
            setTableData(newData);
            newInvoiceStore.setInvoiceData({
                ...newInvoiceStore.invoiceData,
                items: newData,
            });
            setEditingKey("");
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const invoiceColumns = [
        ...invoiceItemsColumns,
        {
            key: "17",
            title: "ACTION",
            dataIndex: "action",
            width: "6.15%",
            render: (_: any, record: any) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space>
                        <Typography.Link onClick={() => save(record.key)}>
                            Save
                        </Typography.Link>
                        <Typography.Link onClick={cancel}>
                            Cancel
                        </Typography.Link>
                    </Space>
                ) : (
                    <Typography.Link
                        disabled={editingKey !== ""}
                        onClick={() => edit(record)}
                    >
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    useEffect(() => {
        newInvoiceStore.setIsCustomersLoading(true);
        fetchCustomers()
            .catch(message => {
                showMessage("error", message);
            })
            .finally(() => newInvoiceStore.setIsCustomersLoading(false));

        newInvoiceStore.setIsProductsLoading(true);
        fetchProducts()
            .catch(message => {
                showMessage("error", message);
            })
            .finally(() => newInvoiceStore.setIsProductsLoading(false));
    }, []);

    const handleKeyUp = (
        e: React.KeyboardEvent<HTMLInputElement>,
        fieldId: string
    ) => {
        handleFieldNavigation(e, fieldId);
    };

    return (
        <>
            {contextHolder}

            <ProductSelectionModal
                visible={newInvoiceStore.modalVisible}
                onCancel={() => newInvoiceStore.setModalVisible(false)}
                onSelect={handleFinalProductSelection}
                products={newInvoiceStore.similarProducts}
            />
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
                        >
                            New Invoice
                        </Typography.Title>
                        <Row>
                            <Space
                                direction="horizontal"
                                style={{ marginRight: "8px" }}
                            >
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        newInvoiceStore.reset();
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
                                value={
                                    newInvoiceStore.invoiceData?.customer
                                        ?.number
                                } // Updated to use MobX store
                                onSelect={(_, selectedCustomer) => {
                                    console.log(
                                        "Select: ",
                                        selectedCustomer,
                                        "- ",
                                        selectedCustomer.customValue
                                    );
                                    if (selectedCustomer?.customValue) {
                                        fetchSelectedCustomer(
                                            selectedCustomer.customValue.id
                                        );
                                    }
                                }}
                                placeholder="Select Customer"
                                options={newInvoiceStore.customersAsOptions} // Updated to use MobX store
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
                                loading={newInvoiceStore.isCustomersLoading} // Updated to use MobX store
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
                                    value={
                                        newInvoiceStore.invoiceData?.paymentMode
                                    } // Updated to use MobX store
                                    onChange={event => {
                                        if (
                                            !newInvoiceStore.invoiceData
                                                ?.customer
                                        ) {
                                            console.log(
                                                "Customer: ",
                                                newInvoiceStore.invoiceData
                                                    ?.customer
                                            );
                                            showMessage(
                                                "warning",
                                                "Please select Customer"
                                            );
                                            return;
                                        }
                                        newInvoiceStore.setInvoiceData({
                                            ...newInvoiceStore.invoiceData,
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
                                value={newInvoiceStore.productData?.name} // Updated to use MobX store
                                onSelect={(_, selectedProduct) => {
                                    if (
                                        (selectedProduct as ProductOption)
                                            ?.customValue
                                    ) {
                                        handleProductSelect(
                                            selectedProduct as ProductOption
                                        );
                                    }
                                }}
                                onKeyDown={e => {
                                    if (
                                        e.key === "Enter" &&
                                        newInvoiceStore.productsAsOptions
                                            .length > 0
                                    ) {
                                        e.preventDefault();
                                        e.stopPropagation();

                                        const highlightedOption =
                                            document.querySelector(
                                                ".ant-select-item-option-active, .ant-select-item-option-selected"
                                            ) as HTMLElement;

                                        if (highlightedOption) {
                                            const productId =
                                                highlightedOption.getAttribute(
                                                    "data-value"
                                                );
                                            if (productId) {
                                                const selectedOption =
                                                    newInvoiceStore.productsAsOptions.find(
                                                        option =>
                                                            option.value ===
                                                            productId
                                                    );

                                                if (selectedOption) {
                                                    handleProductSelect(
                                                        selectedOption
                                                    );
                                                }
                                            }
                                        }
                                    }
                                }}
                                onClear={() =>
                                    newInvoiceStore.setProductData(null)
                                } // Updated to use MobX store
                                options={newInvoiceStore.productsAsOptions} // Updated to use MobX store
                                filterOption={(input, option) =>
                                    option?.label
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(input.toLowerCase()) ?? false
                                }
                                placeholder="Select Product"
                                showSearch
                                allowClear
                                loading={newInvoiceStore.isProductsLoading} // Updated to use MobX store
                            />
                            <InvoiceInput
                                label="Company"
                                width="110px"
                                value={newInvoiceStore.productData?.company} // Updated to use MobX store
                                disabled={true}
                                className="invoiceInputFields"
                            />
                            <InvoiceInput
                                isError={newInvoiceStore.invalidProductFieldError.includes(
                                    "quantity"
                                )}
                                containerStyle={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                }}
                                label="Quantity"
                                value={newInvoiceStore.productData?.quantity} // Updated to use MobX store
                                id="quantityField"
                                onChange={event => {
                                    if (newInvoiceStore.productData) {
                                        newInvoiceStore.setProductData({
                                            ...newInvoiceStore.productData,
                                            quantity: Number(
                                                event.target.value
                                            ),
                                        });
                                    }
                                }}
                                onKeyUp={e => handleKeyUp(e, "quantityField")}
                                ref={quantityRef}
                            />
                            <InvoiceInput
                                isError={newInvoiceStore.invalidProductFieldError.includes(
                                    "packingType"
                                )}
                                label="Pack"
                                value={newInvoiceStore.productData?.packingType} // Updated to use MobX store
                                id="packingTypeField"
                                disabled={true}
                            />
                            <InvoiceInput
                                isError={newInvoiceStore.invalidProductFieldError.includes(
                                    "manufacturingDate"
                                )}
                                label="Mf Date"
                                value={newInvoiceStore.productData?.manufacturingDate?.toString()} // Updated to use MobX store
                                id="manufacturingDateField"
                                disabled={true}
                            />
                            <InvoiceInput
                                isError={newInvoiceStore.invalidProductFieldError.includes(
                                    "expiryDate"
                                )}
                                label="Exp Date"
                                value={newInvoiceStore.productData?.expiryDate?.toString()} // Updated to use MobX store
                                id="expiryDateField"
                                disabled={true}
                            />
                            <InvoiceInput
                                isError={newInvoiceStore.invalidProductFieldError.includes(
                                    "sGst"
                                )}
                                label="SGST"
                                value={newInvoiceStore.productData?.sGst} // Updated to use MobX store
                                id="sGstField"
                                disabled={true}
                            />
                            <InvoiceInput
                                isError={newInvoiceStore.invalidProductFieldError.includes(
                                    "cGst"
                                )}
                                label="CGST"
                                value={newInvoiceStore.productData?.cGst} // Updated to use MobX store
                                id="cGstField"
                                disabled={true}
                            />
                            <InvoiceInput
                                isError={newInvoiceStore.invalidProductFieldError.includes(
                                    "iGst"
                                )}
                                label="IGST"
                                value={newInvoiceStore.productData?.iGst} // Updated to use MobX store
                                id="iGstField"
                                disabled={true}
                            />
                            <InvoiceInput
                                isError={newInvoiceStore.invalidProductFieldError.includes(
                                    "rate"
                                )}
                                label="Rate"
                                value={newInvoiceStore.productData?.rate} // Updated to use MobX store
                                id="rateField"
                                className="invoiceInputFields rateInputFields"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    if (newInvoiceStore.productData) {
                                        newInvoiceStore.setProductData({
                                            ...newInvoiceStore.productData,
                                            rate: Number(event.target.value),
                                        });
                                    }
                                }}
                                onKeyUp={e => handleKeyUp(e, "rateField")}
                            />
                            <InvoiceInput
                                isError={newInvoiceStore.invalidProductFieldError.includes(
                                    "mrp"
                                )}
                                label="Mrp"
                                value={newInvoiceStore.productData?.mrp} // Updated to use MobX store
                                id="mrpField"
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    if (newInvoiceStore.productData) {
                                        newInvoiceStore.setProductData({
                                            ...newInvoiceStore.productData,
                                            mrp: Number(event.target.value),
                                        });
                                    }
                                }}
                                onKeyUp={e => handleKeyUp(e, "mrpField")}
                            />
                            <InvoiceInput
                                label="Discount"
                                value={
                                    newInvoiceStore.invoiceData?.customer
                                        ?.defaultDiscount
                                } // static value as placeholder
                                id="discountField"
                                onKeyUp={e => handleKeyUp(e, "discountField")}
                                ref={discountRef}
                            />
                            <InvoiceButton
                                type="primary"
                                onClick={onClickAddButton}
                                id="addButton"
                                icon={<PlusCircleOutlined />}
                                containerStyle={{ margin: "31px 0 0 0" }}
                            >
                                Add
                            </InvoiceButton>
                        </Row>

                        <Row style={{ marginTop: "20px" }}>
                            <Form form={form} 
                            style={{ width: "100%" }}>
                                <EditableTable
                                    style={{ marginTop: "25px" }}
                                    columns={invoiceColumns}
                                    dataSource={
                                        newInvoiceStore.invoiceData?.items
                                    } // Updated to use MobX store
                                    page={false}
                                    isEditing={isEditing}
                                    // summary={pageData => {
                                    //     const totalAmount = pageData.reduce(
                                    //         (total, record) => total + (record.total || 0),
                                    //         0
                                    //     );
                                    //     return (
                                    //         <>
                                    //             <Table.Summary.Row>
                                    //                 <Table.Summary.Cell
                                    //                     colSpan={6}
                                    //                     className="invoice-summary"
                                    //                 >
                                    //                     Total Amount
                                    //                 </Table.Summary.Cell>
                                    //                 <Table.Summary.Cell>
                                    //                     <Typography.Text
                                    //                         style={{
                                    //                             fontWeight: "bold",
                                    //                         }}
                                    //                     >
                                    //                         ₹ {totalAmount}
                                    //                     </Typography.Text>
                                    //                 </Table.Summary.Cell>
                                    //             </Table.Summary.Row>
                                    //         </>
                                    //     );
                                    // }}
                                />
                            </Form>
                        </Row>
                    </Card>
                </Col>
            </div>
        </>
    );
});
