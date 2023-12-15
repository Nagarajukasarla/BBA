import React, { useEffect, useState } from "react";
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
    ConfigProvider,
    message,
} from "antd";

import "./css/newInvoice.css";
import "../../coreComponents/Styles/primaryStyle.css";
import {
    onPressedCGSTHandler,
    onPressedCompanyHandler,
    onPressedDiscountHandler,
    onPressedExpiryDateHandler,
    onPressedIGSTHandler,
    onPressedManufacturingDateHandler,
    onPressedMrpHandler,
    onPressedPackingTypeHandler,
    onPressedQuantityHandler,
    onPressedSGSTHandler,
} from "./events/KeyboardEvents";
import {
    authenticate,
    getAllCustomers,
    getAllProducts,
} from "../../../services/api/get/authorizedGetServices";
import { getToken } from "../../../services/load/loadBrowserContent";
import { useNavigate } from "react-router-dom";
import {
    generateFormattedDateString,
    getYearMonthFormat,
} from "../../../services/utils/dateFormater";
import { getInvoiceRequestObj } from "./utils";
import { createInvoice, saveNewInvoice } from "../../../services/api/post/authorizedPostService";

export const NewInvoice = () => {
    const productSearchDropdown = document.getElementById("productSearch");
    const quantityField = document.getElementById("quantityField");
    const packingTypeField = document.getElementById("packingTypeField");
    const manufacturingDateField = document.getElementById(
        "manufacturingDateField"
    );
    const expiryDateField = document.getElementById("expiryDateField");
    const sGstField = document.getElementById("sGstField");
    const cGstField = document.getElementById("cGstField");
    const iGstField = document.getElementById("iGstField");
    const discountField = document.getElementById("discountField");
    const rateField = document.getElementById("rateField");
    const mrpField = document.getElementById("mrpField");

    let itemObj = {
        serialNumber: "",
        product: "",
        company: "",
        quantity: "",
        packingType: "",
        manufacturingDate: "",
        expiryDate: "",
        sGst: "",
        cGst: "",
        iGst: "",
        rate: "",
        mrp: "",
        discount: "",
        price: "",
        batchNumber: "",
    };

    const [invoiceData, setInvoiceData] = useState([]);
    const [customer, setCustomer] = useState(null);
    const [product, setProduct] = useState(null);
    const [company, setCompany] = useState("");
    const [packingType, setPackingType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [manufacturingDate, setManufacturingDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [sGst, setSGst] = useState("");
    const [cGst, setCGst] = useState("");
    const [iGst, setIGst] = useState("");
    const [discount, setDiscount] = useState("");
    const [rate, setRate] = useState("");
    const [mrp, setMrp] = useState("");
    const [paymentModeValue, setPaymentModeValue] = useState("");
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [serialNumber, setSerialNumber] = useState(0);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const checkAuthentication = async (token) => {
        if (!(await authenticate(token))) {
            console.log("Unauthenticated!");
            navigate("/login");
            return false;
        }
        return true;
    };

    const fetchCustomers = async () => {
        try {
            const fectchedCustomers = await getAllCustomers(getToken());
            if (fectchedCustomers && fectchedCustomers.length > 0) {
                return fectchedCustomers;
            } else {
                console.log("Data not found!");
                return [];
            }
        } catch (error) {
            console.log("Error occurred: " + error);
            return [];
        }
    };

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await getAllProducts(getToken());
            if (fetchedProducts && fetchedProducts.length > 0) {
                return fetchedProducts;
            } else {
                return [];
            }
        } catch (error) {
            console.log("Error occurred: " + error);
            return [];
        }
    };

    useEffect(() => {
        if (checkAuthentication(getToken())) {
            fetchCustomers().then((data) => {
                setCustomers(data);
            });
            fetchProducts().then((data) => {
                setProducts(data);
            });
            getInvoiceDataFromLocalStorage();
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setDiscount(customer?.discount);
    }, [customer]);

    useEffect(() => {
        setCompany(product?.company);
        setQuantity(product?.quantity);
        setPackingType(product?.packingType);
        setManufacturingDate(getYearMonthFormat(product?.manufacturingDate));
        setExpiryDate(getYearMonthFormat(product?.expiryDate));
        setSGst(product?.sGstInPercent);
        setCGst(product?.cGstInPercent);
        setIGst(product?.iGstInPercent);
        setRate(product?.rate);
        setMrp(product?.mrp);
    }, [product]);

    useEffect(() => {
        setInvoiceDataToLocalStorage(invoiceData);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceData]);

    const customerNameHelper = (customer) => {
        if (!customer) {
            return "";
        }
        return `${customer?.customerNumber ?? ""} - ${customer?.name ?? ""}, ${
            customer?.addressDto?.city ?? ""
        }`;
    };

    const productNameHelper = (product) => {
        if (!product) {
            return "";
        }
        return ` ${product?.name ?? ""} - ${getYearMonthFormat(
            product?.expiryDate ?? ""
        )}`;
    };

    const getCustomerAsOptions = (customers) => {
        return customers.map((item) => ({
            value: item.customerNumber,
            label: customerNameHelper(item),
            customValue: item,
        }));
    };

    const getProductsAsOptions = (products) => {
        return products.map((product) => ({
            value: product.id,
            label: productNameHelper(product),
            customValue: product,
        }));
    };

    const resetInvoice = () => {
        setCustomer(null);
        setInvoiceData([]);
        setSerialNumber(0);
        setPaymentModeValue("");
        localStorage.removeItem("invoice");
    };

    const result = (type) => {
        messageApi.open({
            type: `${type}`,
            content:
                type === "success" ? "Saved successfully" : "Failed to Save",
        });
    };

    const onPressedSaveButtonHandler =  () => {
        console.log(invoiceData.length);
        if (invoiceData.length > 0) {
            // Write request api
            let obj = getInvoiceRequestObj(
                customer?.customerNumber ?? "",
                paymentModeValue,
                invoiceData,
                generateFormattedDateString()
            );
            console.log(obj);
            createInvoice(obj, getToken()).then((response) => {
                if (response) {
                    resetInvoice();
                    result("success");
                }
                else {
                    result("error");
                }
            });
        }
    };

    const onPressedSaveAndPrintHandler = () => {
        onPressedSaveButtonHandler();
    };

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

    const invoiceColumns = [
        {
            key: "1",
            title: "S.No",
            dataIndex: "serialNumber",
            width: "6%",
        },
        {
            key: "2",
            title: "Product",
            dataIndex: "product",
            width: "13%",
        },
        {
            key: "3",
            title: "Company",
            dataIndex: "company",
            width: "8%",
        },
        {
            key: "4",
            title: "Quantity",
            dataIndex: "quantity",
            width: "8%",
        },
        {
            key: "5",
            title: "Pack",
            dataIndex: "packingType",
            width: "6%",
        },
        {
            key: "6",
            title: "Mf Date",
            dataIndex: "manufacturingDate",
            width: "7%",
        },
        {
            key: "7",
            title: "Exp Date",
            dataIndex: "expiryDate",
            width: "7%",
        },
        {
            key: "8",
            title: "SGST",
            dataIndex: "sGst",
            width: "5%",
        },
        {
            key: "9",
            title: "CGST",
            dataIndex: "cGst",
            width: "5%",
        },
        {
            key: "10",
            title: "IGST",
            dataIndex: "iGst",
            width: "5%",
        },
        {
            key: "11",
            title: "Rate",
            dataIndex: "rate",
            width: "5%",
        },
        {
            key: "12",
            title: "Mrp",
            dataIndex: "mrp",
            width: "6%",
        },
        {
            key: "13",
            title: "Discount",
            dataIndex: "discount",
            width: "7%",
        },
        {
            key: "14",
            title: "Price",
            dataIndex: "price",
            width: "8%",
        },
    ];

    const dropDownStyles = {
        padding: "0",
        textAlign: "start",
    };

    /**
     * Sets the invoice data to local storage.
     *
     * @param {object} obj - The invoice data object.
     */

    const setInvoiceDataToLocalStorage = () => {
        if (invoiceData.length > 0 && customer && paymentModeValue) {
            let invoiceObject = {
                customer: customer,
                paymentModeValue: paymentModeValue,
                items: invoiceData,
            };

            let invoiceObjectInJson = JSON.stringify(invoiceObject);
            localStorage.setItem("invoice", invoiceObjectInJson);
        }
    };

    const getInvoiceDataFromLocalStorage = () => {
        let invoiceInJSON = localStorage.getItem("invoice");
        if (!(invoiceInJSON === "null" || invoiceInJSON === null)) {
            let retrivedInvoice = JSON.parse(invoiceInJSON);
            setCustomer(retrivedInvoice.customer);
            setPaymentModeValue(retrivedInvoice.paymentModeValue);
            setInvoiceData(retrivedInvoice.items);
            setSerialNumber(
                retrivedInvoice.items[retrivedInvoice.items.length - 1]
                    .serialNumber
            );
        }
    };

    const onKeyupRateField = (event) => {
        /* 
            --Validate all fields--
        */
        if (event.keyCode === 13) {
            onClickAddButton();
        }
    };

    const onClickAddButton = () => {
        itemObj.serialNumber = serialNumber + 1;
        itemObj.product = product?.name ?? "Not available currently";
        itemObj.company = company;
        itemObj.quantity = quantity;
        itemObj.packingType = packingType;
        itemObj.manufacturingDate = manufacturingDate;
        itemObj.expiryDate = expiryDate;
        itemObj.sGst = sGst;
        itemObj.cGst = cGst;
        itemObj.iGst = iGst;
        itemObj.rate = rate;
        itemObj.mrp = mrp;
        itemObj.discount = discount;
        itemObj.price = (rate * quantity).toFixed(2);
        itemObj.batchNumber = product?.batchNumber ?? "";
        addToInvoiceTable(itemObj);
        setSerialNumber(serialNumber + 1);
        resetProduct();
        productSearchDropdown.focus();
    };

    const addToInvoiceTable = (itemObj) => {
        if (itemObj !== null && itemObj !== undefined) {
            setInvoiceData([...invoiceData, itemObj]);
        }
    };

    const resetProduct = () => {
        setProduct(null);
        setCompany("");
        setQuantity("");
        setPackingType("");
        setManufacturingDate("");
        setExpiryDate("");
        setSGst("");
        setCGst("");
        setIGst("");
        setDiscount("");
        setRate("");
        setMrp("");
    };

    return (
        <>
            {contextHolder}
            <div className="newInvoiceWrapper">
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
                                <Typography.Text className="primary-input-field-header-style">
                                    Customer
                                </Typography.Text>
                                {
                                    <ConfigProvider
                                        theme={{
                                            token: {
                                                Select: {
                                                    optionActiveBg:
                                                        "rgba(0, 0, 0, 0.15)",
                                                },
                                            },
                                        }}
                                    >
                                        <Select
                                            style={{
                                                width: 380,
                                            }}
                                            className="customerSelectionDropdown"
                                            value={customerNameHelper(customer)}
                                            onChange={(
                                                value,
                                                selectedCustomer
                                            ) => {
                                                if (
                                                    selectedCustomer &&
                                                    selectedCustomer.customValue
                                                ) {
                                                    setCustomer(
                                                        selectedCustomer.customValue
                                                    );
                                                }
                                            }}
                                            onClear={() => setCustomer(null)}
                                            placeholder="Select Customer"
                                            options={getCustomerAsOptions(
                                                customers
                                            )}
                                            filterOption={(input, option) =>
                                                option.label
                                                    .toLowerCase()
                                                    .indexOf(
                                                        input.toLowerCase()
                                                    ) > 0
                                            }
                                            dropdownStyle={dropDownStyles}
                                            showSearch
                                            allowClear
                                        />
                                    </ConfigProvider>
                                }
                            </Space>
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
                                    value={paymentModeValue}
                                    onChange={(event) => {
                                        setPaymentModeValue(event.target.value);
                                    }}
                                    options={paymentModes}
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
                                <Typography.Text className="primary-input-field-header-style">
                                    Product
                                </Typography.Text>
                                {
                                    <ConfigProvider
                                        theme={{
                                            token: {
                                                Select: {
                                                    optionActiveBg:
                                                        "rgba(0, 0, 0, 0.15)",
                                                },
                                            },
                                        }}
                                    >
                                        <Select
                                            className="customerSelectionDropdown"
                                            id="productSearch"
                                            value={productNameHelper(product)}
                                            onChange={(
                                                value,
                                                selectedProduct
                                            ) => {
                                                if (
                                                    selectedProduct &&
                                                    selectedProduct.customValue
                                                ) {
                                                    setProduct(
                                                        selectedProduct.customValue
                                                    );
                                                }
                                            }}
                                            onClear={() => setProduct(null)}
                                            options={getProductsAsOptions(
                                                products
                                            )}
                                            filterOption={(input, option) =>
                                                option.label
                                                    .toLowerCase()
                                                    .indexOf(
                                                        input.toLowerCase()
                                                    ) > 0
                                            }
                                            placeholder="Select Product"
                                            dropdownStyle={dropDownStyles}
                                            showSearch
                                            allowClear
                                        />
                                    </ConfigProvider>
                                }
                            </Space>
                            <Space
                                direction="vertical"
                                style={{
                                    textAlign: "start",
                                    marginLeft: "20px",
                                }}
                            >
                                <Typography.Text className="primary-input-field-header-style">
                                    Company
                                </Typography.Text>
                                <Input
                                    style={{
                                        width: "110px",
                                        padding: "4px",
                                    }}
                                    value={company}
                                    onChange={(event) =>
                                        setCompany(event.target.value)
                                    }
                                    className="invoiceInputFields"
                                    onKeyUp={(event) =>
                                        onPressedCompanyHandler(event, {
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
                                <Typography.Text className="primary-input-field-header-style">
                                    Quantity
                                </Typography.Text>
                                <Input
                                    style={{ width: "50px", padding: "4px" }}
                                    value={quantity}
                                    className="invoiceInputFields"
                                    id="quantityField"
                                    onChange={(event) =>
                                        setQuantity(event.target.value)
                                    }
                                    onKeyUp={(event) =>
                                        onPressedQuantityHandler(event, {
                                            packingTypeField,
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
                                <Typography.Text className="primary-input-field-header-style">
                                    Pack
                                </Typography.Text>
                                <Input
                                    style={{ width: "50px", padding: "4px" }}
                                    value={packingType}
                                    className="invoiceInputFields"
                                    id="packingTypeField"
                                    onChange={(event) =>
                                        setPackingType(event.target.value)
                                    }
                                    onKeyUp={(event) =>
                                        onPressedPackingTypeHandler(event, {
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
                                <Typography.Text className="primary-input-field-header-style">
                                    Mf Date
                                </Typography.Text>
                                <Input
                                    style={{ width: "50px", padding: "4px" }}
                                    value={manufacturingDate}
                                    className="invoiceInputFields"
                                    id="manufacturingDateField"
                                    onChange={(event) =>
                                        setManufacturingDate(event.target.value)
                                    }
                                    onKeyUp={(event) =>
                                        onPressedManufacturingDateHandler(
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
                                <Typography.Text className="primary-input-field-header-style">
                                    Exp Date
                                </Typography.Text>
                                <Input
                                    style={{ width: "50px", padding: "4px" }}
                                    value={expiryDate}
                                    className="invoiceInputFields"
                                    id="expiryDateField"
                                    onChange={(event) =>
                                        setExpiryDate(event.target.value)
                                    }
                                    onKeyUp={(event) =>
                                        onPressedExpiryDateHandler(event, {
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
                                <Typography.Text className="primary-input-field-header-style">
                                    SGST
                                </Typography.Text>
                                <Input
                                    style={{ width: "50px", padding: "4px" }}
                                    value={sGst}
                                    className="invoiceInputFields"
                                    id="sGstField"
                                    onChange={(event) =>
                                        setSGst(event.target.value)
                                    }
                                    onKeyUp={(event) =>
                                        onPressedSGSTHandler(event, {
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
                                <Typography.Text className="primary-input-field-header-style">
                                    CGST
                                </Typography.Text>
                                <Input
                                    style={{ width: "50px", padding: "4px" }}
                                    value={cGst}
                                    className="invoiceInputFields"
                                    id="cGstField"
                                    onChange={(event) =>
                                        setCGst(event.target.value)
                                    }
                                    onKeyUp={(event) =>
                                        onPressedCGSTHandler(event, {
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
                                <Typography.Text className="primary-input-field-header-style">
                                    IGST
                                </Typography.Text>
                                <Input
                                    style={{ width: "50px", padding: "4px" }}
                                    value={iGst}
                                    className="invoiceInputFields"
                                    id="iGstField"
                                    onChange={(event) =>
                                        setIGst(event.target.value)
                                    }
                                    onKeyUp={(event) =>
                                        onPressedIGSTHandler(event, {
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
                                <Typography.Text className="primary-input-field-header-style">
                                    Discount
                                </Typography.Text>
                                <Input
                                    style={{ width: "50px", padding: "4px" }}
                                    value={discount}
                                    className="invoiceInputFields"
                                    id="discountField"
                                    onChange={(event) =>
                                        setDiscount(event.target.value)
                                    }
                                    onKeyUp={(event) =>
                                        onPressedDiscountHandler(event, {
                                            mrpField,
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
                                <Typography.Text className="primary-input-field-header-style">
                                    Mrp
                                </Typography.Text>
                                <Input
                                    style={{ width: "50px", padding: "4px" }}
                                    value={mrp}
                                    className="invoiceInputFields"
                                    id="mrpField"
                                    onChange={(event) =>
                                        setMrp(event.target.value)
                                    }
                                    onKeyUp={(event) =>
                                        onPressedMrpHandler(event, {
                                            rateField,
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
                                <Typography.Text className="primary-input-field-header-style">
                                    Rate
                                </Typography.Text>
                                <Input
                                    style={{ width: "50px", padding: "4px" }}
                                    value={rate}
                                    className="invoiceInputFields rateInputFields"
                                    id="rateField"
                                    onChange={(event) =>
                                        setRate(event.target.value)
                                    }
                                    onKeyUp={onKeyupRateField}
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
                        <Row
                            style={{ marginTop: "20px", paddingRight: "60px" }}
                            justify="end"
                        >
                            <Space direction="horizontal">
                                <button
                                    className="invoicePrintButton confirmButtons"
                                    style={{ marginRight: "8px" }}
                                    onClick={onPressedSaveAndPrintHandler()}
                                >
                                    Save & Print
                                </button>
                                <button
                                    className="primary-save-button-style"
                                    style={{ marginRight: "8px" }}
                                    onClick={onPressedSaveButtonHandler()}
                                >
                                    Save
                                </button>
                                <button className="invoiceEmailButton confirmButtons">
                                    Email
                                </button>
                            </Space>
                        </Row>
                    </Card>
                </Col>
            </div>
        </>
    );
};
