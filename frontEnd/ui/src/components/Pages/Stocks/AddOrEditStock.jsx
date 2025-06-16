import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    Col,
    Row,
    Space,
    Typography,
    Input,
    message,
    Tooltip,
    Table,
    ConfigProvider,
    Select,
    Radio,
    DatePicker,
    Modal,
    Button,
} from "antd";
import { DeleteOutlined, CloseCircleOutlined } from "@ant-design/icons";
import "../../coreComponents/Styles/primaryStyle.css";

import {
    validate,
    vaidateMonthYearDateFields,
    validateDatesRanges,
} from "../../../services/utils/common/validation/validate";
import {
    generateFormattedDateString,
    getFormattedDate,
} from "../../../services/utils/common/helpers/client/dateHelpers";
import {
    customerNameHelper,
    getCustomerAsOptions,
} from "../../../services/utils/common/helpers/client/customerHelpers";
import {
    onPressedHsnNumberHandler,
    onPressedBatchNumberHandler,
    onPressedCGSTHandler,
    onPressedCompanyHandler,
    onPressedExpiryDateHandler,
    onPressedIGSTHandler,
    onPressedManufacturingDateHandler,
    onPressedPackingTypeHandler,
    onPressedProductNameHandler,
    onPressedQuantityHandler,
    onPressedRateHandler,
    onPressedSGSTHandler,
} from "./events/KeyboardEvents";
import TokenManager from "../../../services/cookies/TokenManager";
import CustomerLocalManager from "../Customers/CustomerLocalManager";
import APIResponse from "../../../services/api/statusUtils/APIResponse";
import { getMonthYearFormat } from "../../../services/utils/common/helpers/client/dateHelpers";
import DateHelper from "../../../services/utils/common/helpers/client/DateHelper";
import { saveInvoiceWithItems } from "../../../services/api/post/authorizedPostService";

export const AddOrEditStock = () => {
    useEffect(() => {
        document.title = "Stocks";
        setShopId(TokenManager.getShopId());
        setToken(TokenManager.getToken());
        setCustomers(CustomerLocalManager.getCustomers());
        console.log("Hiii");
    }, []);

    const navigate = useNavigate();

    const [shopId, setShopId] = useState(null);
    const [token, setToken] = useState(null);
    const [customers, setCustomers] = useState([]);

    const hsnNumberRef = useRef(null);
    const paymentModeRef = useRef(null);
    const billedDateRef = useRef(null);
    const datePickerRef = useRef(null);
    const productNameRef = useRef(null);
    const batchNumberRef = useRef(null);
    const companyRef = useRef(null);
    const quantityRef = useRef(null);
    const manufacturingDateRef = useRef(null);
    const expiryDateRef = useRef(null);
    const sGstRef = useRef(null);
    const cGstRef = useRef(null);
    const iGstRef = useRef(null);
    const rateRef = useRef(null);
    const mrpRef = useRef(null);
    const packingTypeRef = useRef(null);

    const [serialNumber, setSerialNumber] = useState(0);
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [customer, setCustomer] = useState(null);
    const [paymentMode, setPaymentMode] = useState("");
    const [billedDate, setBilledDate] = useState("");
    const [billedDateString, setBilledDateString] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [dueDateString, setDueDateString] = useState("");
    const [hsnNumber, setHsnNumber] = useState("");
    const [productName, setProductName] = useState("");
    const [batchNumber, setBatchNumber] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [packingType, setPackingType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [manufacturingDate, setManufacturingDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [sGst, setSGST] = useState("");
    const [cGst, setCGST] = useState("");
    const [iGst, setIGST] = useState("");
    const [rate, setRate] = useState("");
    const [mrp, setMrp] = useState("");
    const [items, setItems] = useState([]);

    const [invoiceNumberFieldStatus, setInvoiceNumberFieldStatus] =
        useState(false);
    const [hsnNumberFieldStatus, setHsnNumberFieldStatus] = useState(false);
    const [productNameFieldStatus, setProductNameFieldStatus] = useState(false);
    const [batchNumberFieldStatus, setBatchNumberFieldStatus] = useState(false);
    const [companyFieldStatus, setCompanyFieldStatus] = useState(false);
    const [packingTypeFieldStatus, setPackingTypeFieldStatus] = useState(false);
    const [quantityFieldStatus, setQuantityFieldStatus] = useState(false);
    const [manufacturingDateFieldStatus, setManufacturingDateFieldStatus] =
        useState(false);
    const [expiryDateFieldStatus, setExpiryDateFieldStatus] = useState(false);
    const [sGstFieldStatus, setSGSTFieldStatus] = useState(false);
    const [iGstFieldStatus, setIGSTFieldStatus] = useState(false);
    const [cGstFieldStatus, setCGSTFieldStatus] = useState(false);
    const [rateFieldStatus, setRateFieldStatus] = useState(false);
    const [mrpFieldStatus, setMrpFieldStatus] = useState(false);
    const [dueDateFieldStatus, setDueDateFieldStatus] = useState(false);
    const [billedDateFieldStatus, setBilledDateFieldStatus] = useState(false);
    const [paymentModeFieldStatus, setPaymentModeFieldStatus] = useState(false);
    const [customerFieldStatus, setCustomerFieldStatus] = useState(false);

    const [
        saveInvoiceWithItemsErrorReponseText,
        setSaveInvoiceWithItemsErrorReponseText,
    ] = useState("");

    const [messageApi, contextHolder] = message.useMessage();
    const [open, setOpen] = useState(false);

    const fields = [
        invoiceNumber,
        hsnNumber,
        productName,
        batchNumber,
        companyName,
        packingType,
        quantity,
        manufacturingDate,
        expiryDate,
        sGst,
        cGst,
        iGst,
        rate,
        mrp,
    ];

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

    useEffect(() => {
        console.log("Updated items: ", items);
    }, [items]); // This will log the updated items after each change

    useEffect(() => {
        if (invoiceNumber && invoiceNumber !== "") {
            setInvoiceNumberFieldStatus(false);
        }
    }, [invoiceNumber]);

    useEffect(() => {
        if (customer) {
            setCustomerFieldStatus(false);
        }
    }, [customer]);

    useEffect(() => {
        if (paymentMode) {
            setPaymentModeFieldStatus(false);
        }
    }, [paymentMode]);

    useEffect(() => {
        if (billedDate) {
            setBilledDateFieldStatus(false);
            setDueDateFieldStatus(false);
        }
    }, [billedDate]);

    useEffect(() => {
        if (dueDate) {
            setDueDateFieldStatus(false);
            setBilledDateFieldStatus(false);
        }
    }, [dueDate]);

    useEffect(() => {
        if (hsnNumber && hsnNumber !== "") {
            setHsnNumberFieldStatus(false);
        }
    }, [hsnNumber]);

    useEffect(() => {
        if (productName && productName !== "") {
            setProductNameFieldStatus(false);
        }
    }, [productName]);

    useEffect(() => {
        if (batchNumber && batchNumber !== "") {
            setBatchNumberFieldStatus(false);
        }
    }, [batchNumber]);

    useEffect(() => {
        if (companyName && companyName !== "") {
            setCompanyFieldStatus(false);
        }
    }, [companyName]);

    useEffect(() => {
        if (packingType && packingType !== "") {
            setPackingTypeFieldStatus(false);
        }
    }, [packingType]);

    useEffect(() => {
        if (quantity && quantity !== "") {
            setQuantityFieldStatus(false);
        }
    }, [quantity]);

    useEffect(() => {
        if (manufacturingDate && manufacturingDate !== "") {
            setManufacturingDateFieldStatus(false);
        }
    }, [manufacturingDate]);

    useEffect(() => {
        if (expiryDate && expiryDate !== "") {
            setExpiryDateFieldStatus(false);
        }
    }, [expiryDate]);

    useEffect(() => {
        if (sGst && sGst !== "") {
            setSGSTFieldStatus(false);
        }
    }, [sGst]);

    useEffect(() => {
        if (cGst && cGst !== "") {
            setCGSTFieldStatus(false);
        }
    }, [cGst]);

    useEffect(() => {
        if (iGst && iGst !== "") {
            setIGSTFieldStatus(false);
        }
    }, [iGst]);

    useEffect(() => {
        if (rate && rate !== "") {
            setRateFieldStatus(false);
        }
    }, [rate]);

    useEffect(() => {
        if (mrp && mrp !== "") {
            setMrpFieldStatus(false);
        }
    }, [mrp]);

    const clearProduct = () => {
        setHsnNumber("");
        setProductName("");
        setBatchNumber("");
        setCompanyName("");
        setPackingType();
        setQuantity("");
        setManufacturingDate("");
        setExpiryDate("");
        setSGST("");
        setCGST("");
        setIGST("");
        setRate("");
        setMrp("");
    };

    const result = (type) => {
        messageApi.open({
            type: `${type}`,
            content:
                type === "success" ? "Saved successfully" : "Failed to Save",
        });
    };

    const submitInvoice = async () => {
        await saveInvoiceWithItems(shopId, token, {
            invoiceNumber: invoiceNumber,
            customer: customer,
            paymentMode: paymentMode,
            billedDate: billedDateString,
            dueDate: dueDateString,
            generationDate: DateHelper.getCurrentFormattedDateString(),
            items: items,
        })
            .then((response) => {
                if (response.code === APIResponse.SUCCESS) {
                    result("success");
                } else {
                    result("error");
                }
            })
            .catch((error) => {
                setOpen(true);
                setSaveInvoiceWithItemsErrorReponseText(error);
            });
    };

    const onClickSaveButton = () => {
        if (
            validate([
                invoiceNumber,
                customer,
                paymentMode,
                billedDateString,
                dueDateString,
                shopId,
                token,
            ]) &&
            validateDatesRanges([billedDate, dueDate]) &&
            serialNumber >= 1
        ) {
            submitInvoice();
        } else {
            notifyInvalidInvoiceFields();
            return;
        }
    };

    const notifyInvalidInvoiceFields = () => {
        if (
            dueDateString === "" ||
            dueDateString === undefined ||
            dueDateString === null
        ) {
            setDueDateFieldStatus(true);
        }
        if (
            billedDateString === "" ||
            billedDateString === undefined ||
            billedDateString === null
        ) {
            setBilledDateFieldStatus(true);
        }
        if (!validateDatesRanges([billedDateString, dueDateString])) {
            setBilledDateFieldStatus(true);
            setDueDateFieldStatus(true);
        } else {
            setBilledDateFieldStatus(false);
            setDueDateFieldStatus(false);
        }
        if (
            paymentMode === "" ||
            paymentMode === undefined ||
            paymentMode === null
        ) {
            setPaymentModeFieldStatus(true);
        }
        if (
            invoiceNumber === "" ||
            invoiceNumber === undefined ||
            invoiceNumber === null
        ) {
            setInvoiceNumberFieldStatus(true);
        }
        if (customer === null || customer === undefined || customer === "") {
            setCustomerFieldStatus(true);
        }
    };

    const notifyInvalidProductFields = () => {
        if (mrp === "" || mrp === undefined || mrp === null) {
            setMrpFieldStatus(true);
            mrpRef.current.focus();
        }
        if (rate === "" || rate === undefined || rate === null) {
            setRateFieldStatus(true);
            rateRef.current.focus();
        }
        if (iGst === "" || iGst === undefined || iGst === null) {
            setIGSTFieldStatus(true);
            iGstRef.current.focus();
        }
        if (cGst === "" || cGst === undefined || cGst === null) {
            setCGSTFieldStatus(true);
            cGstRef.current.focus();
        }
        if (sGst === "" || sGst === undefined || sGst === null) {
            setSGSTFieldStatus(true);
            sGstRef.current.focus();
        }
        if (
            expiryDate === "" ||
            expiryDate === undefined ||
            expiryDate === null
        ) {
            setExpiryDateFieldStatus(true);
            expiryDateRef.current.focus();
        }
        if (expiryDate.length < 5 && expiryDate[0] === "0") {
            setExpiryDateFieldStatus(true);
            expiryDateRef.current.focus();
        }
        if (expiryDate[0] === "0" && expiryDate[1] === "0") {
            setExpiryDateFieldStatus(true);
            expiryDateRef.current.focus();
        }
        if (
            manufacturingDate === "" ||
            manufacturingDate === undefined ||
            manufacturingDate === null
        ) {
            setManufacturingDateFieldStatus(true);
            manufacturingDateRef.current.focus();
            // TODO specify field is empty
        }
        if (manufacturingDate.length < 5 && manufacturingDate[0] === "0") {
            setManufacturingDateFieldStatus(true);
            manufacturingDateRef.current.focus();
            // TODO specify field is invalid
        }
        if (manufacturingDate[0] === "0" && manufacturingDate[1] === "0") {
            setManufacturingDateFieldStatus(true);
            manufacturingDateRef.current.focus();
        }
        if (!validateDatesRanges([manufacturingDate, expiryDate])) {
            setManufacturingDateFieldStatus(true);
            setExpiryDateFieldStatus(true);
            manufacturingDateRef.current.focus();
        } else {
            setManufacturingDateFieldStatus(false);
            setExpiryDateFieldStatus(false);
        }
        if (quantity === "" || quantity === undefined || quantity === null) {
            setQuantityFieldStatus(true);
            quantityRef.current.focus();
        }
        if (
            packingType === "" ||
            packingType === undefined ||
            packingType === null
        ) {
            setPackingTypeFieldStatus(true);
            packingTypeRef.current.focus();
        }
        if (
            companyName === "" ||
            companyName === undefined ||
            companyName === null
        ) {
            setCompanyFieldStatus(true);
            companyRef.current.focus();
        }
        if (
            batchNumber === "" ||
            batchNumber === undefined ||
            batchNumber === null
        ) {
            setBatchNumberFieldStatus(true);
            batchNumberRef.current.focus();
        }
        if (
            productName === "" ||
            productName === undefined ||
            productName === null
        ) {
            setProductNameFieldStatus(true);
            productNameRef.current.focus();
        }
        if (hsnNumber === "" || hsnNumber === undefined || hsnNumber === null) {
            setHsnNumberFieldStatus(true);
            hsnNumberRef.current.focus();
        }
    };

    const handleNumericInputChange = (setter) => (event) => {
        if (!(event && event.target)) return;
        const value = event.target.value;
        // Ensure only integers are allowed
        if (/^\d*$/.test(value)) {
            setter(value);
        }
    };

    const handleDateInputChange = (setter) => (event) => {
        if (!(event && event.target)) return;
        const value = event.target.value;

        // Only allow digits and slashes
        if (!/^[\d\/]*$/.test(value)) return;

        // Add '/' automatically after two digits
        let formattedDate = value.replace(/^(\d{2})(\d{1,2})$/, "$1/$2");

        // Ensure that only DD/YY format is allowed
        if (formattedDate.length > 5) return;

        setter(formattedDate);
    };

    const onPressedEnterMrpField = (event) => {
        if (event.key === "Enter") {
            addProduct();
        }
    };

    const addProduct = () => {
        if (
            validate(fields) &&
            vaidateMonthYearDateFields([manufacturingDate, expiryDate])
        ) {
            const product = {
                key: serialNumber,
                hsnNumber: hsnNumber,
                name: productName,
                batchNumber: batchNumber,
                company: companyName,
                packingType: packingType,
                quantity: quantity,
                manufacturingDate: getFormattedDate(manufacturingDate),
                expiryDate: getFormattedDate(expiryDate),
                sGst: sGst,
                cGst: cGst,
                iGst: iGst,
                rate: rate,
                mrp: mrp,
            };
            setItems([...items, product]);
            setSerialNumber(serialNumber + 1);
            clearProduct();
            hsnNumberRef.current.focus();
        } else {
            notifyInvalidProductFields();
            return;
        }
    };

    const onClickDelete = (item) => {
        setItems(items.filter((it) => it.key !== item?.key));
    };

    const onSelectedCustomer = (value, selectedCustomer) => {
        setCustomer(selectedCustomer.customValue);
    };

    const onChangeBilledDate = (date, dateString) => {
        setBilledDate(date);
        setBilledDateString(
            DateHelper.parseDayMonthYearToFormattedString(dateString)
        );
    };

    const onChangeDueDate = (date, dateString) => {
        setDueDate(date);
        setDueDateString(
            DateHelper.parseDayMonthYearToFormattedString(dateString)
        );
    };

    const invalidStyle = {
        border: "1.6px solid #C42B1C",
    };

    const filterOptionsStyles = {
        paddingRight: "10px",
    };

    const columns = [
        {
            key: "hsnNumber",
            title: "HSN",
            dataIndex: "hsnNumber",
            width: "5%",
        },
        {
            key: "name",
            title: "Product",
            dataIndex: "name",
            width: "7%",
        },
        {
            key: "batchNumber",
            title: "Batch",
            dataIndex: "batchNumber",
            width: "4%",
        },
        {
            key: "company",
            title: "Company",
            dataIndex: "company",
            width: "7%",
        },
        {
            key: "packingType",
            title: "Pack",
            dataIndex: "packingType",
            width: "3%",
        },
        {
            key: "quantity",
            title: "Quantity",
            dataIndex: "quantity",
            width: "2%",
        },
        {
            key: "manufacturingDate",
            title: "Mf Date",
            dataIndex: "manufacturingDate",
            width: "4%",
            render: (_, item) => (
                <>{getMonthYearFormat(item.manufacturingDate)}</>
            ),
        },
        {
            key: "expiryDate",
            title: "Exp Date",
            dataIndex: "expiryDate",
            width: "5%",
            render: (_, item) => <>{getMonthYearFormat(item.expiryDate)}</>,
        },
        {
            key: "sGst",
            title: "SGST",
            dataIndex: "sGst",
            width: "2%",
        },
        {
            key: "cGst",
            title: "CGST",
            dataIndex: "cGst",
            width: "2%",
        },
        {
            key: "iGst",
            title: "IGST",
            dataIndex: "iGst",
            width: "2%",
        },
        {
            key: "rate",
            title: "Rate",
            dataIndex: "rate",
            width: "4%",
        },
        {
            key: "mrp",
            title: "Mrp",
            dataIndex: "mrp",
            width: "4%",
        },
        {
            key: "action",
            title: "Action",
            width: "2%",
            render: (_, item) => (
                <>
                    <Tooltip title="delete">
                        <DeleteOutlined
                            className="deleteRecord"
                            onClick={() => onClickDelete(item)}
                        />
                    </Tooltip>
                </>
            ),
        },
    ];

    return (
        <>
            {contextHolder}
            <Card
                bodyStyle={{
                    paddingTop: "10px",
                    paddingLeft: "5px",
                    paddingBottom: "15px",
                }}
            >
                <Col>
                    <Row justify={"space-between"}>
                        <Typography.Title
                            style={{ marginLeft: "10px" }}
                            level={4}
                        >
                            Add Stock
                        </Typography.Title>
                        <Tooltip title="Back">
                            <CloseCircleOutlined
                                style={{
                                    marginRight: "20px",
                                    fontSize: "150%",
                                }}
                                onClick={() => navigate("/app/stocks")}
                            />
                        </Tooltip>
                    </Row>
                    <Row>
                        <Space
                            direction="vertical"
                            style={{
                                marginLeft: "10px",
                                textAlign: "start",
                                ...filterOptionsStyles,
                            }}
                        >
                            <Typography.Text className="primary-input-field-header-style">
                                Customer
                            </Typography.Text>
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
                                        width: 350,
                                        ...(customerFieldStatus &&
                                            invalidStyle),
                                    }}
                                    value={
                                        customer === null
                                            ? "--Select--"
                                            : customerNameHelper(customer)
                                    }
                                    options={getCustomerAsOptions({
                                        customers: customers,
                                        addAllOption: false,
                                    })}
                                    onSelect={(value, selectedCustomer) =>
                                        onSelectedCustomer(
                                            value,
                                            selectedCustomer
                                        )
                                    }
                                />
                            </ConfigProvider>
                        </Space>
                        <Space
                            direction="vertical"
                            style={{
                                textAlign: "start",
                                marginLeft: "30px",
                            }}
                        >
                            <Typography.Text className="primary-input-field-header-style">
                                Invoice Number
                            </Typography.Text>
                            <Input
                                style={{
                                    width: "130px",
                                    padding: "4px 3px 4px 6px",
                                    ...(invoiceNumberFieldStatus &&
                                        invalidStyle),
                                }}
                                value={invoiceNumber}
                                onChange={(event) =>
                                    setInvoiceNumber(event.target.value)
                                }
                            ></Input>
                        </Space>
                        <Space
                            direction="vertical"
                            style={{
                                textAlign: "start",
                                marginLeft: "50px",
                            }}
                        >
                            <Typography.Text className="primary-input-field-header-style">
                                Payment Mode
                            </Typography.Text>
                            <Radio.Group
                                style={{
                                    ...(paymentModeFieldStatus && invalidStyle),
                                }}
                                value={paymentMode}
                                onChange={(event) => {
                                    setPaymentMode(event.target.value);
                                }}
                                options={paymentModes}
                                optionType="button"
                                buttonStyle="solid"
                            />
                        </Space>
                        <Space
                            direction="vertical"
                            style={{
                                textAlign: "start",
                                marginLeft: "50px",
                            }}
                        >
                            <Typography.Text className="primary-input-field-header-style">
                                Billed Date
                            </Typography.Text>
                            <DatePicker
                                style={{
                                    width: "150px",
                                    padding: "4px 3px 4px 6px",
                                    ...(billedDateFieldStatus && invalidStyle),
                                }}
                                value={billedDate}
                                onChange={onChangeBilledDate}
                            />
                        </Space>
                        <Space
                            direction="vertical"
                            style={{
                                textAlign: "start",
                                marginLeft: "50px",
                            }}
                        >
                            <Typography.Text className="primary-input-field-header-style">
                                Due Date
                            </Typography.Text>
                            <DatePicker
                                style={{
                                    width: "150px",
                                    padding: "4px 3px 4px 6px",
                                    ...(dueDateFieldStatus && invalidStyle),
                                }}
                                value={dueDate}
                                onChange={onChangeDueDate}
                            />
                        </Space>
                    </Row>
                    <Row
                        style={{
                            marginTop: "25px",
                        }}
                    >
                        <Space
                            direction="vertical"
                            style={{
                                textAlign: "start",
                                marginLeft: "10px",
                            }}
                        >
                            <Typography.Text className="primary-input-field-header-style">
                                HSN Code
                            </Typography.Text>
                            <Input
                                style={{
                                    width: "130px",
                                    padding: "4px 3px 4px 6px",
                                    ...(hsnNumberFieldStatus && invalidStyle),
                                }}
                                value={hsnNumber}
                                ref={hsnNumberRef}
                                onChange={(event) =>
                                    setHsnNumber(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedHsnNumberHandler(event, {
                                        productNameRef,
                                    });
                                }}
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
                                Name
                            </Typography.Text>
                            <Input
                                style={{
                                    width: "200px",
                                    padding: "4px 3px 4px 6px",
                                    ...(productNameFieldStatus && invalidStyle),
                                }}
                                value={productName}
                                ref={productNameRef}
                                onChange={(event) =>
                                    setProductName(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedProductNameHandler(event, {
                                        batchNumberRef,
                                    });
                                }}
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
                                Batch
                            </Typography.Text>
                            <Input
                                style={{
                                    width: "70px",
                                    padding: "4px 3px 4px 6px",
                                    ...(batchNumberFieldStatus && invalidStyle),
                                }}
                                value={batchNumber}
                                ref={batchNumberRef}
                                onChange={(event) =>
                                    setBatchNumber(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedBatchNumberHandler(event, {
                                        companyRef,
                                    });
                                }}
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
                                Company
                            </Typography.Text>
                            <Input
                                style={{
                                    width: "130px",
                                    padding: "4px 3px 4px 6px",
                                    ...(companyFieldStatus && invalidStyle),
                                }}
                                value={companyName}
                                ref={companyRef}
                                onChange={(event) =>
                                    setCompanyName(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedCompanyHandler(event, {
                                        packingTypeRef,
                                    });
                                }}
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
                                Pack
                            </Typography.Text>
                            <Input
                                style={{
                                    width: "50px",
                                    padding: "4px 3px 4px 6px",
                                    ...(packingTypeFieldStatus && invalidStyle),
                                }}
                                value={packingType}
                                ref={packingTypeRef}
                                onChange={(event) =>
                                    setPackingType(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedPackingTypeHandler(event, {
                                        quantityRef,
                                    });
                                }}
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
                                style={{
                                    width: "55px",
                                    padding: "4px",
                                    ...(quantityFieldStatus && invalidStyle),
                                }}
                                value={quantity}
                                ref={quantityRef}
                                onChange={handleNumericInputChange(setQuantity)}
                                onKeyUp={(event) => {
                                    onPressedQuantityHandler(event, {
                                        manufacturingDateRef,
                                    });
                                }}
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
                                Mf Date
                            </Typography.Text>
                            <Input
                                style={{
                                    width: "50px",
                                    padding: "4px 3px 4px 5px",
                                    ...(manufacturingDateFieldStatus &&
                                        invalidStyle),
                                }}
                                value={manufacturingDate}
                                ref={manufacturingDateRef}
                                onChange={handleDateInputChange(
                                    setManufacturingDate
                                )}
                                onKeyUp={(event) => {
                                    onPressedManufacturingDateHandler(event, {
                                        expiryDateRef,
                                    });
                                }}
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
                                style={{
                                    width: "50px",
                                    padding: "4px 3px 4px 5px",
                                    border:
                                        expiryDateFieldStatus &&
                                        "1.6px solid #C42B1C",
                                }}
                                value={expiryDate}
                                ref={expiryDateRef}
                                onChange={handleDateInputChange(setExpiryDate)}
                                onKeyUp={(event) => {
                                    onPressedExpiryDateHandler(event, {
                                        sGstRef,
                                    });
                                }}
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
                                style={{
                                    width: "30px",
                                    padding: "4px",
                                    border:
                                        sGstFieldStatus &&
                                        "1.6px solid #C42B1C",
                                }}
                                value={sGst}
                                ref={sGstRef}
                                onChange={handleNumericInputChange(setSGST)}
                                onKeyUp={(event) => {
                                    onPressedSGSTHandler(event, {
                                        cGstRef,
                                    });
                                }}
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
                                style={{
                                    width: "30px",
                                    padding: "4px",
                                    border:
                                        cGstFieldStatus &&
                                        "1.6px solid #C42B1C",
                                }}
                                value={cGst}
                                ref={cGstRef}
                                onChange={handleNumericInputChange(setCGST)}
                                onKeyUp={(event) => {
                                    onPressedCGSTHandler(event, {
                                        iGstRef,
                                    });
                                }}
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
                                style={{
                                    width: "30px",
                                    padding: "4px",
                                    border:
                                        iGstFieldStatus &&
                                        "1.6px solid #C42B1C",
                                }}
                                value={iGst}
                                ref={iGstRef}
                                onChange={handleNumericInputChange(setIGST)}
                                onKeyUp={(event) => {
                                    onPressedIGSTHandler(event, {
                                        rateRef,
                                    });
                                }}
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
                                Rate
                            </Typography.Text>
                            <Input
                                style={{
                                    width: "60px",
                                    padding: "4px",
                                    border:
                                        rateFieldStatus &&
                                        "1.6px solid #C42B1C",
                                }}
                                value={rate}
                                ref={rateRef}
                                onChange={(event) =>
                                    setRate(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedRateHandler(event, {
                                        mrpRef,
                                    });
                                }}
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
                                style={{
                                    width: "60px",
                                    padding: "4px",
                                    border:
                                        mrpFieldStatus && "1.6px solid #C42B1C",
                                }}
                                value={mrp}
                                ref={mrpRef}
                                onChange={(event) => setMrp(event.target.value)}
                                onKeyUp={(event) => {
                                    onPressedEnterMrpField(event);
                                }}
                            ></Input>
                        </Space>
                        <Space
                            direction="horizontal"
                            style={{
                                marginLeft: "20px",
                                paddingTop: "28px",
                            }}
                        >
                            <button
                                className="primary-save-button-style"
                                onClick={addProduct}
                            >
                                Add
                            </button>
                        </Space>
                    </Row>
                    <Table
                        style={{
                            marginTop: "20px",
                            marginLeft: "10px",
                        }}
                        bordered
                        columns={columns}
                        dataSource={items}
                    />
                    <Row
                        style={{
                            marginTop: "20px",
                        }}
                        justify={"end"}
                    >
                        <button
                            className="primary-save-button-style"
                            onClick={onClickSaveButton}
                        >
                            Save
                        </button>
                    </Row>
                </Col>
            </Card>
            <Modal
                title="Error"
                open={open}
                onOk={() => {
                    setOpen(false);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            >
                <Col span={24}>
                    <Space
                        direction="vertical"
                        size={"large"}
                        style={{ margin: "25px 0 0 10px" }}
                    >
                        <Space direction="vertical">
                            <Typography.Text className="primary-input-field-header-style">
                                {saveInvoiceWithItemsErrorReponseText}
                            </Typography.Text>
                        </Space>
                    </Space>
                </Col>
            </Modal>
        </>
    );
};
