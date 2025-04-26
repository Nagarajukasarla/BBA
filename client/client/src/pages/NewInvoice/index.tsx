import React from "react";
import {
    Card,
    Col,
    ConfigProvider,
    Radio,
    Row,
    Space,
    Table,
    Tooltip,
    Typography,
    Button,
} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    FileAddOutlined,
    MailOutlined,
    PlusCircleOutlined,
    ReloadOutlined,
    SaveOutlined,
} from "@ant-design/icons";
import { Select, DatePicker, Input } from "@/components/ui";
import { InvoiceButton } from "@/components/ui/Button";
import { ProductSelectionModal } from "@/components/features/ProductSelectionModal";
import { ProductOption } from "@/types/component";
import { invoiceItemsColumns, paymentModes } from "./constants";
import { useInvoiceState } from "@/states/invoiceState";

const { Title } = Typography;

/**
 * NewInvoice component for creating a new invoice.
 *
 * @returns {JSX.Element} The NewInvoice component.
 */
const NewInvoice = (): JSX.Element => {
    // Use our centralized invoice state
    const {
        // State
        invoiceData,
        productData,
        discount,
        productsAsOptions,
        similarProducts,
        modalVisible,
        customersAsOptions,
        contextHolder,

        // State setters
        setInvoiceData,
        setProductData,
        setDiscount,
        setModalVisible,

        // Action handlers
        handleProductSelect,
        handleFinalProductSelection,
        onClickAddButton,
        resetProduct,
        resetInvoiceData,
        fetchSelectedCustomer,

        // Utility functions
        checkDisability,
        checkDisabilityForReset,
    } = useInvoiceState();

    // Render action buttons for the table
    const renderActionButtons = (_, record: any) => (
        <Space size="small">
            <Tooltip title="Edit">
                <EditOutlined
                    style={{
                        color: "blue",
                        fontSize: "18px",
                        cursor: "pointer",
                    }}
                />
            </Tooltip>
            <Tooltip title="Delete">
                <DeleteOutlined
                    style={{
                        color: "red",
                        fontSize: "18px",
                        cursor: "pointer",
                    }}
                />
            </Tooltip>
        </Space>
    );

    // Add the render function to the columns
    const columnsWithActions = [...invoiceItemsColumns];
    if (columnsWithActions.length > 0) {
        const actionColumn = columnsWithActions.find(col => col.key === "16");
        if (actionColumn) {
            actionColumn.render = renderActionButtons;
        }
    }

    return (
        <>
            {contextHolder}

            {/* Product Selection Modal */}
            <ProductSelectionModal
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onSelect={handleFinalProductSelection}
                products={similarProducts}
            />
            <div className="newInvoiceWrapper">
                <Col span={24}>
                    <Row
                        style={{ margin: "8px 5px 8px 5px" }}
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
                                    onClick={resetInvoiceData}
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
                            <Select
                                label="Customer"
                                style={{ width: "380px" }}
                                value={invoiceData?.customer?.number}
                                onSelect={(_, selectedCustomer: any) => {
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
                                    value={invoiceData?.paymentModeValue}
                                    onChange={event => {
                                        setInvoiceData({
                                            ...invoiceData,
                                            paymentModeValue:
                                                event.target.value,
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
                            <Select
                                label="Product"
                                style={{ width: "380px" }}
                                id="productSearch"
                                value={productData?.name}
                                onSelect={(_, selectedProduct) => {
                                    handleProductSelect(
                                        selectedProduct as ProductOption
                                    );
                                }}
                                onKeyDown={e => {
                                    // Handle Enter key press on dropdown
                                    if (
                                        e.key === "Enter" &&
                                        productsAsOptions.length > 0
                                    ) {
                                        e.preventDefault();
                                        e.stopPropagation();

                                        // Find the highlighted option in the dropdown
                                        const highlightedOption =
                                            document.querySelector(
                                                ".ant-select-item-option-active, .ant-select-item-option-selected"
                                            ) as HTMLElement;

                                        if (highlightedOption) {
                                            // Get the data-value attribute which contains the product ID
                                            const productId =
                                                highlightedOption.getAttribute(
                                                    "data-value"
                                                );
                                            if (productId) {
                                                // Find the product option with this ID
                                                const selectedOption =
                                                    productsAsOptions.find(
                                                        option =>
                                                            option.value ===
                                                            productId
                                                    );

                                                if (selectedOption) {
                                                    // Manually trigger product selection
                                                    handleProductSelect(
                                                        selectedOption
                                                    );
                                                }
                                            }
                                        }
                                    }
                                }}
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
                            />
                            <Input
                                label="Company"
                                style={{ width: "110px" }}
                                value={productData?.company}
                                disabled={true}
                                className="invoiceInputFields"
                            />
                            <Input
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
                                onKeyUp={e => {
                                    if (e.key === "Enter") {
                                        const rateField =
                                            document.getElementById(
                                                "rateField"
                                            );
                                        rateField?.focus();
                                    }
                                }}
                            />
                            <Input
                                label="Pack"
                                value={productData?.packingType}
                                id="packingTypeField"
                                disabled={true}
                            />
                            <Input
                                label="Mf Date"
                                value={productData?.manufacturingDate?.toString()}
                                id="manufacturingDateField"
                                disabled={true}
                            />
                            <Input
                                label="Exp Date"
                                value={productData?.expiryDate?.toString()}
                                id="expiryDateField"
                                disabled={true}
                            />
                            <Input
                                label="SGST"
                                value={productData?.sGst}
                                id="sGstField"
                                disabled={true}
                            />
                            <Input
                                label="CGST"
                                value={productData?.cGst}
                                id="cGstField"
                                disabled={true}
                            />
                            <Input
                                label="IGST"
                                value={productData?.iGst}
                                id="iGstField"
                                disabled={true}
                            />
                            <Input
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
                                onKeyUp={e => {
                                    if (e.key === "Enter") {
                                        const mrpField =
                                            document.getElementById(
                                                "mrpField"
                                            );
                                        mrpField?.focus();
                                    }
                                }}
                            />
                            <Input
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
                                onKeyUp={e => {
                                    if (e.key === "Enter") {
                                        const discountField =
                                            document.getElementById(
                                                "discountField"
                                            );
                                        discountField?.focus();
                                    }
                                }}
                            />
                            <Input
                                label="Discount"
                                value={discount}
                                id="discountField"
                                onChange={event =>
                                    setDiscount(Number(event.target.value))
                                }
                                onKeyUp={e => {
                                    if (e.key === "Enter") {
                                        const addButton =
                                            document.getElementById(
                                                "addButton"
                                            );
                                        addButton?.focus();
                                    }
                                }}
                            />
                            <InvoiceButton
                                type="primary"
                                id="addButton"
                                onClick={onClickAddButton}
                                icon={<PlusCircleOutlined />}
                                containerStyle={{ margin: "31px 0 0 0" }}
                            >
                                Add
                            </InvoiceButton>
                        </Row>
                        <Row style={{ marginTop: "20px" }}>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Table: {
                                            headerBg: "#F5F5F5",
                                        },
                                    },
                                }}
                            >
                                <Table
                                    bordered
                                    columns={columnsWithActions}
                                    dataSource={invoiceData?.items}
                                    scroll={{
                                        y: 270,
                                    }}
                                    pagination={false}
                                />
                            </ConfigProvider>
                        </Row>
                    </Card>
                </Col>
            </div>
        </>
    );
};

export default NewInvoice;
