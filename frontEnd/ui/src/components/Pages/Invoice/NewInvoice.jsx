import {
    Button,
    Card,
    Col,
    ConfigProvider,
    Input,
    message,
    Radio,
    Row,
    Select,
    Space,
    Table,
    Tooltip,
    Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";

import { DeleteOutlined } from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useNavigate } from "react-router-dom";
import {
    authenticate,
    getAllProducts,
} from "../../../services/api/get/authorizedGetServices";
import { createInvoice } from "../../../services/api/post/authorizedPostService";
import TokenManager from "../../../services/cookies/TokenManager";
import {
    customerNameHelper,
    getCustomerAsOptions,
} from "../../../services/utils/common/helpers/client/customerHelpers";
import {
    generateFormattedDateString,
    getMonthYearFormat,
} from "../../../services/utils/common/helpers/client/dateHelpers";
import { validate } from "../../../services/utils/common/validation/validate";
import "../../coreComponents/Styles/primaryStyle.css";
import PDFFileCreator from "../../utilComponents/PDFFileCreator";
import CustomerLocalManager from "../Customers/CustomerLocalManager";
import "./utils/css/newInvoice.css";
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
} from "./utils/events/KeyboardEvents";
import { getInvoiceRequestObj } from "./utils/helpers/invoiceHelpers";

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
    const quantityRef = useRef(null);
    const discountRef = useRef(null);

    let productDropDownState = false;

    let itemObj = {
        serialNumber: 0,
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
    const [products, setProducts] = useState([]);
    const [serialNumber, setSerialNumber] = useState(0);
    const [isInvoiceReady, setIsInvoiceReady] = useState(false);
    const [dropdownActiveState, setDropdownActiveState] = useState(false);
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [customersAsOptions, setCustomersAsOptions] = useState([]);

    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [customers, setCustomers ] = useState([]);


    const checkAuthentication = async (token) => {
        if (!(await authenticate(token))) {
            console.log("Unauthenticated!");
            navigate("/login");
            return false;
        }
        return true;
    };

    const fetchProducts = async () => {
        try {
            const fetchedProducts = await getAllProducts(TokenManager.getToken);
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

    const productNameHelper = (product) => {
        if (!product) {
            return "";
        }
        return ` ${product?.name ?? ""} - ${getMonthYearFormat(
            product?.expiryDate ?? ""
        )}`;
    };

    const getProductsAsOptions = (products) => {
        return products.map((product) => ({
            value: product.id,
            label: productNameHelper(product),
            customValue: product,
        }));
    };

    /**
     * Deletes the specified product from the invoice data and updates the invoice.
     *
     * @param {Object} product - The product to be deleted
     * @return {void}
     */
    const deleteItem = (product) => {
        const updatedItems = invoiceData?.filter(
            (item) => item?.serialNumber !== product?.serialNumber
        );
        setInvoiceData([...updatedItems]);
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
            key: "2",
            title: "PRODUCT",
            dataIndex: "product",
            width: "14%",
        },
        {
            key: "3",
            title: "COMPANY",
            dataIndex: "company",
            width: "11%",
        },
        {
            key: "4",
            title: "QUAN",
            dataIndex: "quantity",
            width: "6%",
        },
        {
            key: "5",
            title: "PACK",
            dataIndex: "packingType",
            width: "5%",
        },
        {
            key: "6",
            title: "MFD",
            dataIndex: "manufacturingDate",
            width: "5%",
        },
        {
            key: "7",
            title: "EXP",
            dataIndex: "expiryDate",
            width: "5%",
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
            title: "RATE",
            dataIndex: "rate",
            width: "7%",
        },
        {
            key: "12",
            title: "MRP",
            dataIndex: "mrp",
            width: "6%",
        },
        {
            key: "13",
            title: "DISC",
            dataIndex: "discount",
            width: "5%",
        },
        {
            key: "14",
            title: "PRICE",
            dataIndex: "price",
            width: "8%",
        },
        {
            key: "x",
            title: "ACTION",
            dataIndex: "action",
            width: "6.15%",
            render: (_, item) => (
                <Tooltip title="Delete">
                    <DeleteOutlined
                        onClick={() => deleteItem(item)}
                        style={{
                            color: "red",
                            fontSize: "18px",
                            cursor: "pointer",
                        }}
                    />
                </Tooltip>
            ),
        },
    ];

    const dropDownStyles = {
        padding: "0",
        textAlign: "start",
    };

    /**
     * Sets the invoice data to local storage.
     *
     */
    const setInvoiceDataToLocalStorage = () => {
        if (
            invoiceData &&
            invoiceData.length > 0 &&
            customer &&
            paymentModeValue
        ) {
            let invoiceObject = {
                customer: customer,
                paymentModeValue: paymentModeValue,
                items: invoiceData,
            };

            console.log(invoiceObject);

            let invoiceObjectInJson = JSON.stringify(invoiceObject);
            console.log(invoiceObjectInJson);

            localStorage.setItem("invoice", invoiceObjectInJson);
        }
    };

    /**
     * Adds an item to the invoice table.
     *
     * @param {Object} itemObj - The item object to be added to the invoice table.
     * @returns {void}
     */
    const addToInvoiceTable = (itemObj) => {
        if (
            itemObj !== null &&
            itemObj !== undefined &&
            itemObj.product !== undefined
        ) {
            setInvoiceData([...invoiceData, itemObj]);
            setInvoiceDataToLocalStorage();
        }
    };

    /**
     * Updates the selected product's quantity in the products array.
     */
    const updateSelectedProduct = () => {
        const index = products.findIndex((item) => item.id === product.id);
        if (index !== -1) {
            products[index].quantity -= parseInt(quantity);
        }
    };

    /**
     * Retrieves invoice data from local storage and sets the customer, payment mode value, invoice data, and serial number.
     */
    const retriveInvoiceDataFromLocalStorage = () => {
        const invoiceInJSON = localStorage.getItem("invoice");
        if (!(invoiceInJSON === "null" || invoiceInJSON === null)) {
            let retrivedInvoice = JSON.parse(invoiceInJSON);
            setCustomer(retrivedInvoice.customer);
            setPaymentModeValue(retrivedInvoice.paymentModeValue);
            if (retrivedInvoice && retrivedInvoice.items.length > 0) {
                setInvoiceData(retrivedInvoice.items);
                setSerialNumber(
                    retrivedInvoice.items[retrivedInvoice.items.length - 1]
                        .serialNumber
                );
            }
        }
        console.log(`Selected customer: ${customer}`);
    };

    const onKeyupRateField = (event) => {
        /* 
            --Validate all fields--
        */
        if (event.keyCode === 13) {
            onClickAddButton();
        }
    };

    /**
     * Resets the product by setting all related state variables to null or empty strings.
     */
    const resetProduct = () => {
        setProduct(null);
        setCompany("");
        setQuantity("");
        setPackingType("");
        setManufacturingDate("");
        setExpiryDate("");
        setDiscount(customer?.discount ?? "");
        setSGst("");
        setCGst("");
        setIGst("");
        setRate("");
        setMrp("");
    };

    /**
     * An onClick event handler for adding a new item to the invoice.
     *
     * @return {void}
     */
    const onClickAddButton = () => {
        if (quantity === 0) {
            showMessage("warning", "Items are not sufficient");
            return;
        }
        itemObj.serialNumber = serialNumber + 1;
        itemObj.product = product?.name;
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
        if (validate(itemObj)) {
            addToInvoiceTable(itemObj);
            setSerialNumber(serialNumber + 1);
            resetProduct();
            productSearchDropdown.focus();
            updateSelectedProduct();
        }
    };

    /**
     * Resets the invoice by setting the customer to null, clearing the invoice data, resetting the serial number,
     * clearing the payment mode value, and removing the invoice from local storage.
     *
     * @param {}- No parameters
     * @return {void} No return value
     */
    const resetInvoice = () => {
        setCustomer(null);
        setInvoiceData([]);
        setSerialNumber(0);
        setPaymentModeValue("");
        localStorage.removeItem("invoice");
    };

    /**
     * A function that opens a message with the specified type and content based on the type.
     *
     * @param {type} type - the type of the message | success | error
     */
    const showMessage = (type, message) => {
        messageApi.open({
            type: `${type}`,
            content: `${message}`,
        });
    };

    /**
     * Asynchronously saves a new invoice if invoiceData is not empty.
     *
     * @return {Promise} a Promise that resolves to the created invoice
     */
    const saveNewInvoice = async () => {
        if (invoiceData.length > 0) {
            let obj = getInvoiceRequestObj(
                customer?.customerNumber,
                paymentModeValue,
                invoiceData,
                generateFormattedDateString()
            );
            console.log(obj);
            return createInvoice(obj, TokenManager.getToken());
        }
    };

    const onPressedSaveButtonHandler = () => {
        saveNewInvoice().then((response) => {
            if (response) {
                showMessage("success", "Successfully Saved!");
                resetInvoice();
            } else {
                showMessage("error", "Failed to Save!");
            }
        });
    };

    const onPressedGenerateHandler = () => {
        saveNewInvoice().then((response) => {
            if (response) {
                showMessage("success", "Successfully Saved!");
                setInvoiceNumber(response);
                setIsInvoiceReady(true);
            } else {
                showMessage("error", "Failed to Save!");
            }
        });
    };

    const onPressedPrintHandler = () => {
        resetInvoice();
    };

    const onPressedEmailHandler = () => {
        saveNewInvoice().then((response) => {
            if (response) {
                showMessage("success", "Successfully Saved!");
                resetInvoice();
            } else {
                showMessage("error", "Failed to Save!");
            }
        });
    };

    const styles1 = {
        margin: "8px 5px 8px 5px",
        // border: "1px solid black",
    };

    /**
     * This function checks if the invoiceData array is empty.
     *
     * @return {boolean} true if invoiceData is empty, false otherwise
     */
    const checkDisability = () => {
        if (invoiceData.length < 1) {
            return true;
        }
        return false;
    };

    /**
     * Check if there are no invoices, no customer, and no payment mode value.
     *
     * @return {boolean} true if there are no invoices, no customer, and no payment mode value; false otherwise
     */
    const checkDisabilityForReset = () => {
        if (
            invoiceData.length < 1 &&
            customer === null &&
            (paymentModeValue === undefined || paymentModeValue === "")
        ) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        if (checkAuthentication(TokenManager.getToken())) {
            fetchProducts().then((data) => {
                setProducts(data);
            });
            retriveInvoiceDataFromLocalStorage();
            setCustomers(CustomerLocalManager.getCustomers());
        }
        setDropdownActiveState(customer === null ? true : false);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setDiscount(customer?.discount);
    }, [customer]);

    useEffect(() => {
        setInvoiceDataToLocalStorage();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceData]);

    useEffect(() => {
        setCompany(product?.company);
        setQuantity(product?.quantity);
        setPackingType(product?.packingType);
        setManufacturingDate(getMonthYearFormat(product?.manufacturingDate));
        setExpiryDate(getMonthYearFormat(product?.expiryDate));
        setSGst(product?.sGstInPercent);
        setCGst(product?.cGstInPercent);
        setIGst(product?.iGstInPercent);
        setRate(product?.rate);
        setMrp(product?.mrp);
    }, [product]);

    useState(() => {
        checkDisability();
    }, [serialNumber]);

    useEffect(() => {
        setCustomersAsOptions(getCustomerAsOptions({ customers: customers, addAllOptions: false }));
    }, [customers]);

    return (
        <>
            {contextHolder}
            <div className="newInvoiceWrapper">
                <Col span={24}>
                    <Row style={styles1} justify="space-between" align="middle">
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
                                <button
                                    className="primaryButtonStyle actionButtons"
                                    onClick={() => {
                                        resetInvoice();
                                    }}
                                    disabled={checkDisabilityForReset()}
                                    style={{
                                        cursor: checkDisabilityForReset()
                                            ? "not-allowed"
                                            : "pointer",
                                    }}
                                >
                                    Reset
                                </button>
                                {isInvoiceReady && (
                                    <PDFDownloadLink
                                        document={
                                            <PDFFileCreator
                                                products={invoiceData}
                                                customer={customer}
                                                invoiceNumber={`INV${invoiceNumber}`}
                                            />
                                        }
                                        fileName={`INV${invoiceNumber}`}
                                    >
                                        {({ loading }) =>
                                            loading ? (
                                                <button className="primaryButtonStyle">
                                                    Loading...
                                                </button>
                                            ) : (
                                                <button
                                                    className="primaryButtonStyle"
                                                    onClick={() => {
                                                        onPressedPrintHandler();
                                                    }}
                                                >
                                                    Print
                                                </button>
                                            )
                                        }
                                    </PDFDownloadLink>
                                )}
                                {!isInvoiceReady && (
                                    <button
                                        className="primaryButtonStyle"
                                        onClick={() => {
                                            onPressedGenerateHandler();
                                        }}
                                        disabled={checkDisability()}
                                        style={{
                                            cursor: checkDisability()
                                                ? "not-allowed"
                                                : "pointer",
                                        }}
                                    >
                                        Generate Invoice
                                    </button>
                                )}
                                <button
                                    className="primaryButtonStyle"
                                    onClick={onPressedSaveButtonHandler}
                                    disabled={checkDisability()}
                                    style={{
                                        cursor: checkDisability()
                                            ? "not-allowed"
                                            : "pointer",
                                    }}
                                >
                                    Save
                                </button>
                                <button
                                    className="primaryButtonStyle"
                                    disabled={checkDisability()}
                                    style={{
                                        cursor: checkDisability()
                                            ? "not-allowed"
                                            : "pointer",
                                    }}
                                >
                                    Email
                                </button>
                            </Space>
                        </Row>
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
                                            className="selectableDropdown"
                                            value={customerNameHelper(customer)}
                                            onSelect={(
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
                                            placeholder="Select Customer"
                                            options={customersAsOptions}
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
                                            defaultOpen
                                            autoFocus
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
                                        productSearchDropdown.focus();
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
                                            className="selectableDropdown"
                                            id="productSearch"
                                            value={productNameHelper(product)}
                                            onSelect={(
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
                                                    setTimeout(() => {
                                                        quantityRef.current.select();
                                                    }, 100);
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
                                            onFocus={() => {
                                                console.log(
                                                    `Before : ${productDropDownState}`
                                                );
                                                productDropDownState = true;
                                                console.log(
                                                    `After : ${productDropDownState}`
                                                );
                                            }}
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
                                            discountRef,
                                        })
                                    }
                                    ref={quantityRef}
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
                                    ref={discountRef}
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
                                pagination={false}
                            ></Table>
                        </Row>
                    </Card>
                </Col>
            </div>
        </>
    );
};
