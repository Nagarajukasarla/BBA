import React, { useState } from "react";
import {
    Col,
    Row,
    Typography,
    Space,
    Card,
    Select,
    Radio,
    Input,
    Button,
    Table,
} from "antd";

import "./css/newInvoice.css";

import {
    onPressedEnterOnCompanyField,
    onPressedEnterQuantityField,
    onPressedEnterManufacturingDateField,
    onPressedEnterExpiryDateField,
    onPressedEnterSGSTField,
    onPressedEnterCGSTField,
    onPressedEnterIGSTField,
    onPressedEnterDiscountField,
} from "./events/KeyboardEvents";

export const NewInvoice = () => {
    // DOM Elements
    const productSearchDropdown = document.getElementById("productSearch");
    const quantityField = document.getElementById("quantityField");
    const manufacturingDateField = document.getElementById(
        "manufacturingDateField"
    );
    const expiryDateField = document.getElementById("expiryDateField");
    const sGstField = document.getElementById("sGstField");
    const cGstField = document.getElementById("cGstField");
    const iGstField = document.getElementById("iGstField");
    const discountField = document.getElementById("discountField");
    const priceField = document.getElementById("priceField");

    let itemObj = {
        id: "",
        product: "",
        quantity: "",
        manufacturingDate: "",
        expiryDate: "",
        sGst: "",
        cGst: "",
        iGst: "",
        discount: "",
        price: "",
    };

    // State variables
    const [invoiceData, setInvoiceData] = useState([]);
    const [customer, setCustomer] = useState("");
    const [product, setProduct] = useState("");
    const [company, setCompany] = useState("");
    const [quantity, setQuantity] = useState("");
    const [manufacturingDate, setManufacturingDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [sGst, setSGst] = useState("");
    const [cGst, setCGst] = useState("");
    const [iGst, setIGst] = useState("");
    const [discount, setDiscount] = useState("");
    const [price, setPrice] = useState("");
    const [paymentModeValue, setPaymentModeValue] = useState("");

    // Customer list
    const myList = [
        {
            value: "sri-venkateshwara-agencies",
            label: "Sri Venkateshwara Agencies",
        },
        {
            value: "dwaraka-medical-pharma",
            label: "Dwaraka Medical Pharma",
        },
        {
            value: "rudra-phrama-agencies",
            label: "Rudra Phrama Agencies",
        },
        {
            value: "markandeya-agencies",
            label: "Markandeya Agencies",
        },
        {
            value: "surya-pharma",
            label: "Surya Pharma",
        },
        {
            value: "sruthi-medical-phrama",
            label: "Sruthi Medical Phrama",
        },
        {
            value: "varuna-agencies",
            label: "Varuna Agencies",
        },
        {
            value: "sri-nitya-pharma",
            label: "Sri Nitya Pharma",
        },
        {
            value: "shiva-medical-pharma",
            label: "Shiva medical Pharma",
        },
        {
            value: "vidya-agencies",
            label: "Vidya Agencies",
        },
        {
            value: "vignana-medical-pharma",
            label: "Vignana Medical Pharma",
        },
        {
            value: "vignana-pharma",
            label: "Vignana Pharma",
        },
        {
            value: "vishu-pharma",
            label: "Vishu Pharma",
        },
        {
            value: "chandra-pharma",
            label: "Chandra Pharma",
        },
        {
            value: "dwapara-phrama",
            label: "Dwapara Phrama",
        },
        {
            value: "sakthi-agencies",
            label: "Sakthi Agencies",
        },
    ];

    // Payment modes
    const paymentModes = [
        {
            value: "cash",
            label: "Cash",
            key: "1",
        },
        {
            value: "credit",
            label: "Credit",
            key: "2",
        },
        {
            value: "digital",
            label: "Digital",
            key: "3",
        },
    ];

    // Invoice columns headings
    const invoiceColumns = [
        {
            key: "1",
            title: "S.No",
            dataIndex: "key",
            width: "5%",
        },
        {
            key: "2",
            title: "Product",
            dataIndex: "product",
            width: "23%",
        },
        {
            key: "3",
            title: "Company",
            dataIndex: "company",
            width: "10%",
        },
        {
            key: "4",
            title: "Quantity",
            dataIndex: "quantity",
            width: "8%",
        },
        {
            key: "5",
            title: "Mf Date",
            dataIndex: "manufacturingDate",
            width: "7%",
        },
        {
            key: "6",
            title: "Exp Date",
            dataIndex: "expiryDate",
            width: "7%",
        },
        {
            key: "7",
            title: "SGST",
            dataIndex: "sGst",
            width: "5%",
        },
        {
            key: "8",
            title: "CGST",
            dataIndex: "cGst",
            width: "5%",
        },
        {
            key: "9",
            title: "IGST",
            dataIndex: "iGst",
            width: "5%",
        },
        {
            key: "10",
            title: "Discount",
            dataIndex: "discount",
            width: "7%",
        },
        {
            key: "11",
            title: "Price",
            dataIndex: "price",
            width: "10%",
        },
    ];

    // Styles
    const dropDownStyles = {
        padding: "0",
        textAlign: "start",
    };

    // OnValueChange event handlers
    const onSelectPaymentMode = ({ target: { value } }) => {
        console.log("radio4 checked", value);
        setPaymentModeValue(value);
    };

    const onCustomerSelection = (value) => {
        setCustomer(value);
        console.log(`Customer: ${value}`);
    };

    const onChangeProductValue = (value) => {
        setProduct(value);
        console.log(`Product Selected: ${value}`);
    };

    const onChangeCompanyValue = (value) => {
        setCompany(value.target.value);
        console.log(`Company Selected: ${value.target.value}`);
    };

    const onChangeQuantityValue = (value) => {
        setQuantity(value.target.value);
        console.log(`Quantity: ${value.target.value}`);
    };

    const onChangeManufacturingDateValue = (value) => {
        setManufacturingDate(value.target.value);
        console.log(`Manufacturing Date: ${value.target.value}`);
    };

    const onChangeExpiryDateValue = (value) => {
        setExpiryDate(value.target.value);
        console.log(`Expiry Date: ${value.target.value}`);
    };

    const onChangeSGSTValue = (value) => {
        setSGst(value.target.value);
        console.log(`SGST: ${value.target.value}`);
    };

    const onChangeCGSTValue = (value) => {
        setCGst(value.target.value);
        console.log(`CGST: ${value.target.value}`);
    };

    const onChangeIGSTValue = (value) => {
        setIGst(value.target.value);
        console.log(`IGST: ${value.target.value}`);
    };

    const onChangeDiscountValue = (value) => {
        setDiscount(value.target.value);
        console.log(`Discount: ${value.target.value}`);
    };

    const onChangePriceValue = (value) => {
        setPrice(value.target.value);
        console.log(`Price: ${value.target.value}`);
    };

    // OnKeyup event handlers
    const onKeyupPriceField = (event) => {
        if (event.keyCode === 13) {
            onClickAddButton();
            activateDropdown();
            itemObj.product = product;
            itemObj.company = company;
            itemObj.quantity = quantity;
            itemObj.manufacturingDate = manufacturingDate;
            itemObj.expiryDate = expiryDate;
            itemObj.sGst = sGst;
            itemObj.cGst = cGst;
            itemObj.iGst = iGst;
            itemObj.discount = discount;
            itemObj.price = price;
            addToInvoiceTable(itemObj);
            setToEmpty();
        }
    };

    // OnClickButton event handlers
    const onClickAddButton = () => {
        console.log("Enter pressed !!!");
        productSearchDropdown.focus();
    };

    // Util Methods
    const activateDropdown = () => {
        productSearchDropdown.focus();
    };

    const addToInvoiceTable = (itemObj) => {
        if (
            itemObj !== null &&
            itemObj !== undefined &&
            itemObj.product !== undefined &&
            itemObj.product !== ""
        ) {
            setInvoiceData([...invoiceData, itemObj]);
        }
    };

    const setToEmpty = () => {
        setProduct("");
        setCompany("");
        setQuantity("");
        setManufacturingDate("");
        setExpiryDate("");
        setSGst("");
        setCGst("");
        setIGst("");
        setDiscount("");
        setPrice("");
    };

    //

    return (
        <>
            <div
                className="newInvoiceWrapper"
                style={{ border: "1px solid green" }}
            >
                <Col span={24}>
                    <Row>
                        <Typography.Title
                            level={4}
                            className="customerDropdownTitle"
                        >
                            New Invoice
                        </Typography.Title>
                    </Row>
                    <Card bodyStyle={{ margin: "0px", padding: "8px" }}>
                        <Row>
                            <Space
                                direction="vertical"
                                style={{ textAlign: "start" }}
                            >
                                <Typography.Text className="invoiceComponentsHeader">
                                    Customer
                                </Typography.Text>
                                <Select
                                    className="customerSelectionDropdown"
                                    showSearch
                                    value={customer}
                                    onChange={onCustomerSelection}
                                    placeholder="Select Customer"
                                    options={myList}
                                    dropdownStyle={dropDownStyles}
                                    allowClear
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    marginLeft: "100px",
                                }}
                            >
                                <Typography.Text className="invoiceComponentsHeader">
                                    Payment Mode
                                </Typography.Text>
                                <Radio.Group
                                    options={paymentModes}
                                    onChange={onSelectPaymentMode}
                                    value={paymentModeValue}
                                    optionType="button"
                                    buttonStyle="solid"
                                />
                            </Space>
                        </Row>
                        <Row style={{ marginTop: "20px" }}>
                            <Space
                                direction="vertical"
                                style={{ textAlign: "start" }}
                            >
                                <Typography.Text className="invoiceComponentsHeader">
                                    Product
                                </Typography.Text>
                                <Select
                                    className="customerSelectionDropdown"
                                    id="productSearch"
                                    showSearch
                                    value={product}
                                    onChange={onChangeProductValue}
                                    placeholder="Select Product"
                                    options={myList}
                                    dropdownStyle={dropDownStyles}
                                    allowClear
                                    onFocus={() => {
                                        console.log("CLiked");
                                    }}
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    marginLeft: "20px",
                                }}
                            >
                                <Typography.Text className="invoiceComponentsHeader">
                                    Company
                                </Typography.Text>
                                <Input
                                    style={{ width: "110px" }}
                                    value={company}
                                    onChange={onChangeCompanyValue}
                                    className="invoiceInputFields"
                                    onKeyUp={(event) =>
                                        onPressedEnterOnCompanyField(event, {
                                            quantityField,
                                        })
                                    }
                                ></Input>
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    marginLeft: "20px",
                                }}
                            >
                                <Typography.Text className="invoiceComponentsHeader">
                                    Quantity
                                </Typography.Text>
                                <Input
                                    style={{ width: "110px" }}
                                    value={quantity}
                                    className="invoiceInputFields"
                                    id="quantityField"
                                    onChange={onChangeQuantityValue}
                                    onKeyUp={(event) =>
                                        onPressedEnterQuantityField(event, {
                                            manufacturingDateField,
                                        })
                                    }
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    marginLeft: "20px",
                                }}
                            >
                                <Typography.Text className="invoiceComponentsHeader">
                                    Mf Date
                                </Typography.Text>
                                <Input
                                    style={{ width: "60px" }}
                                    value={manufacturingDate}
                                    className="invoiceInputFields"
                                    id="manufacturingDateField"
                                    onChange={onChangeManufacturingDateValue}
                                    onKeyUp={(event) =>
                                        onPressedEnterManufacturingDateField(
                                            event,
                                            { expiryDateField }
                                        )
                                    }
                                ></Input>
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    marginLeft: "20px",
                                }}
                            >
                                <Typography.Text className="invoiceComponentsHeader">
                                    Exp Date
                                </Typography.Text>
                                <Input
                                    style={{ width: "60px" }}
                                    value={expiryDate}
                                    className="invoiceInputFields"
                                    id="expiryDateField"
                                    onChange={onChangeExpiryDateValue}
                                    onKeyUp={(event) =>
                                        onPressedEnterExpiryDateField(event, {
                                            sGstField,
                                        })
                                    }
                                ></Input>
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    marginLeft: "20px",
                                }}
                            >
                                <Typography.Text className="invoiceComponentsHeader">
                                    SGST
                                </Typography.Text>
                                <Input
                                    style={{ width: "60px" }}
                                    value={sGst}
                                    className="invoiceInputFields"
                                    id="sGstField"
                                    onChange={onChangeSGSTValue}
                                    onKeyUp={(event) =>
                                        onPressedEnterSGSTField(event, {
                                            cGstField,
                                        })
                                    }
                                ></Input>
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    marginLeft: "20px",
                                }}
                            >
                                <Typography.Text className="invoiceComponentsHeader">
                                    CGST
                                </Typography.Text>
                                <Input
                                    style={{ width: "60px" }}
                                    value={cGst}
                                    className="invoiceInputFields"
                                    id="cGstField"
                                    onChange={onChangeCGSTValue}
                                    onKeyUp={(event) =>
                                        onPressedEnterCGSTField(event, {
                                            iGstField,
                                        })
                                    }
                                ></Input>
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    marginLeft: "20px",
                                }}
                            >
                                <Typography.Text className="invoiceComponentsHeader">
                                    IGST
                                </Typography.Text>
                                <Input
                                    style={{ width: "60px" }}
                                    value={iGst}
                                    className="invoiceInputFields"
                                    id="iGstField"
                                    onChange={onChangeIGSTValue}
                                    onKeyUp={(event) =>
                                        onPressedEnterIGSTField(event, {
                                            discountField,
                                        })
                                    }
                                ></Input>
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    marginLeft: "20px",
                                }}
                            >
                                <Typography.Text className="invoiceComponentsHeader">
                                    Discount
                                </Typography.Text>
                                <Input
                                    style={{ width: "60px" }}
                                    value={discount}
                                    className="invoiceInputFields"
                                    id="discountField"
                                    onChange={onChangeDiscountValue}
                                    onKeyUp={(event) =>
                                        onPressedEnterDiscountField(event, {
                                            priceField,
                                        })
                                    }
                                ></Input>
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    marginLeft: "20px",
                                }}
                            >
                                <Typography.Text className="invoiceComponentsHeader">
                                    Price
                                </Typography.Text>
                                <Input
                                    style={{ width: "90px" }}
                                    value={price}
                                    className="invoiceInputFields priceField"
                                    id="priceField"
                                    onChange={onChangePriceValue}
                                    onKeyUp={onKeyupPriceField}
                                />
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    margin: "29px 0 0 20px",
                                }}
                            >
                                <Button
                                    type="primary"
                                    id="addButton"
                                    onClick={onClickAddButton}
                                >
                                    Add
                                </Button>
                            </Space>
                        </Row>
                        <Row style={{ marginTop: "20px" }}>
                            <Table
                                bordered
                                columns={invoiceColumns}
                                dataSource={invoiceData}
                                scroll={{
                                    y: 270,
                                }}
                            ></Table>
                        </Row>
                        <Row style={{ marginTop: "20px", paddingRight: "20px" }}
                            justify="end"
                        >
                            <Space direction="horizontal">
                                <button className="invoiceEmailButton confirmButtons">Email</button>
                                <button className="invoiceSaveButton confirmButtons" >Save</button>
                                <button className="invoicePrintButton confirmButtons" >Save & Print</button>
                            </Space>
                        </Row>
                    </Card>
                </Col>
            </div>
        </>
    );
};
