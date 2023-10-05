import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Card,
    Col,
    Row,
    Space,
    Typography,
    Input,
    message,
    Tooltip,
} from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
    saveProduct,
    getProduct,
} from "../../../services/api/post/authorizedPostService";
import { getToken } from "../../../services/load/loadBrowserContent";
import "../../coreComponents/Styles/primaryStyle.css";
import {
    onPressedEnterCompanyField,
    onPressedEnterBatchNumberField,
    onPressedEnterQuantityField,
    onPressedEnterManufacturingDateField,
    onPressedEnterExpiryDateField,
    onPressedEnterSGSTField,
    onPressedEnterCGSTField,
    onPressedEnterIGSTField,
} from "./events/KeyboardEvents";
import { validate } from "../../../services/validation/validate";

export const AddOrEditStock = () => {

    useEffect(() => {
        document.title = "Stocks";
    })

    const location = useLocation();
    const navigate = useNavigate();
    const obj = location.state?.obj;
    const isEditable = location.state?.isEditable;

    const productNameField = document.getElementById("productNameField");
    const batchNumberField = document.getElementById("batchNumberField");
    const companyField = document.getElementById("companyField");
    const quantityField = document.getElementById("quantityField");
    const manufacturingDateField = document.getElementById(
        "manufacturingDateField"
    );
    const expiryDateField = document.getElementById("expiryDateField");
    const sGstField = document.getElementById("sGstField");
    const cGstField = document.getElementById("cGstField");
    const iGstField = document.getElementById("iGstField");
    const rateField = document.getElementById("rateField");

    const [productName, setProductName] = useState(
        obj != null ? obj.productName : ""
    );
    const [batchNumber, setBatchNumber] = useState(
        obj != null ? obj.batchNumber : ""
    );
    const [companyName, setCompanyName] = useState(
        obj != null ? obj.companyName : ""
    );
    const [quantity, setQuantity] = useState(obj != null ? obj.quantity : "");
    const [manufacturingDate, setManufacturingDate] = useState(
        obj != null ? obj.manufacturingDate : ""
    );
    const [expiryDate, setExpiryDate] = useState(
        obj != null ? obj.expiryDate : ""
    );
    const [sGst, setSGST] = useState(obj != null ? obj.sGst : "");
    const [cGst, setCGST] = useState(obj != null ? obj.cGst : "");
    const [iGst, setIGST] = useState(obj != null ? obj.iGst : "");
    const [rate, setRate] = useState(obj != null ? obj.rate : "");

    const fields = [
        productName,
        batchNumber,
        companyName,
        quantity,
        manufacturingDate,
        expiryDate,
        sGst,
        cGst,
        iGst,
        rate,
    ];

    const [messageApi, contextHolder] = message.useMessage();

    const clearProduct = () => {
        setBatchNumber("");
        setCompanyName("");
        setQuantity("");
        setManufacturingDate("");
        setExpiryDate("");
        setSGST("");
        setCGST("");
        setIGST("");
        setRate("");
    };

    const submitProduct = async (
        productName,
        batchNumber,
        companyName,
        quantity,
        manufacturingDate,
        expiryDate,
        sGst,
        cGst,
        iGst,
        rate
    ) => {
        const product = {
            name: productName,
            batchNumber: batchNumber,
            companyName: companyName,
            quantity: quantity,
            manufacturingDate: manufacturingDate,
            expiryDate: expiryDate,
            sGst: sGst,
            cGst: cGst,
            iGst: iGst,
            rate: rate,
        };
        const response = await saveProduct(product, getToken());
        return response ? true : false;
    };

    const success = () => {
        messageApi.open({
            type: "success",
            content: "Saved successfully",
        });
    };

    const onPressedEnterProductNameField = async (event) => {
        // TODO : Check where productName should not be null or empty
        if (event.target.value !== "") {
            if (event.key === "Enter") {
                try {
                    const response = await getProduct(productName, getToken());
                    console.log(response);
                    if (response !== null) {
                        setBatchNumber(response.batchNumber || "");
                        setCompanyName(response.company || "");
                        setQuantity(response.quantity || "");
                        setManufacturingDate(response.manufacturingDate || "");
                        setExpiryDate(response.expiryDate || "");
                        setSGST(response.sGstInPercent || "");
                        setCGST(response.cGstInPercent || "");
                        setIGST(response.iGstInPercent || "");
                        setRate(response.rate || "");
                    } else {
                        clearProduct();
                    }
                } catch (error) {
                    if (error.message === "Not found") {
                        clearProduct();
                        console.log("Item your searching is not found");
                    } else if (error.message === "Unauthorized") {
                        alert("Unauthorized");
                    } else if (error.message === "Forbidden") {
                        navigate("/login");
                    } else if (error.message === "Server is not started") {
                        alert("Server is not started");
                    } else {
                        console.error(error);
                    }
                } finally {
                    batchNumberField.focus();
                }
            }
        }
    };

    const onClickSaveButton = () => {
        if (validate(fields)) {
            if (
                submitProduct(
                    productName,
                    batchNumber,
                    companyName,
                    quantity,
                    manufacturingDate,
                    expiryDate,
                    sGst,
                    cGst,
                    iGst,
                    rate
                )
            ) {
                setProductName("");
                setBatchNumber("");
                setCompanyName("");
                setQuantity("");
                setManufacturingDate("");
                setExpiryDate("");
                setSGST("");
                setCGST("");
                setIGST("");
                setRate("");

                success();
                navigate("/app/stocks");
                // show success popup
                // close the add stock block and show list of products
            } else {
                // show error popup
                // close the add stock block and show list of products
            }
        }
    };

    const onClickSaveAndNew = () => {
        if (validate(fields)) {
            if (
                submitProduct(
                    productName,
                    batchNumber,
                    companyName,
                    quantity,
                    manufacturingDate,
                    expiryDate,
                    sGst,
                    cGst,
                    iGst,
                    rate
                )
            ) {
                setProductName("");
                setBatchNumber("");
                setCompanyName("");
                setQuantity("");
                setManufacturingDate("");
                setExpiryDate("");
                setSGST("");
                setCGST("");
                setIGST("");
                setRate("");
                success();
            } else {
                // show error popup
            }
        }
    };

    const onPressedEnterRateField = (event) => {
        if (event.key === "Enter") {
            onClickSaveAndNew();
            productNameField.focus();
        }
    };

    return (
        <>
            {contextHolder}
            <Card
                bodyStyle={{
                    paddingTop: "10px",
                    paddingLeft: "5px",
                    paddingBottom: "15px",
                    paddingRight: "10px",
                }}
            >
                <Col>
                    <Row justify={"space-between"}>
                        <Typography.Title
                            style={{ marginLeft: "10px" }}
                            level={4}
                        >
                            {obj != null ? "Edit Stock" : "Add Stock"}
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
                                textAlign: "start",
                                marginLeft: "20px",
                            }}
                        >
                            <Typography.Text className="primary-input-field-header-style">
                                Name
                            </Typography.Text>
                            <Input
                                style={{ width: "220px" }}
                                value={productName}
                                id="productNameField"
                                onChange={(event) =>
                                    setProductName(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedEnterProductNameField(event);
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
                                style={{ width: "80px" }}
                                value={batchNumber}
                                id="batchNumberField"
                                onChange={(event) =>
                                    setBatchNumber(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedEnterBatchNumberField(event, {
                                        companyField,
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
                                style={{ width: "140px" }}
                                value={companyName}
                                id="companyField"
                                onChange={(event) =>
                                    setCompanyName(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedEnterCompanyField(event, {
                                        quantityField,
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
                                style={{ width: "60px" }}
                                value={quantity}
                                id="quantityField"
                                onChange={(event) =>
                                    setQuantity(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedEnterQuantityField(event, {
                                        manufacturingDateField,
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
                                style={{ width: "60px" }}
                                value={manufacturingDate}
                                id="manufacturingDateField"
                                onChange={(event) =>
                                    setManufacturingDate(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedEnterManufacturingDateField(
                                        event,
                                        { expiryDateField }
                                    );
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
                                style={{ width: "60px" }}
                                value={expiryDate}
                                id="expiryDateField"
                                onChange={(event) =>
                                    setExpiryDate(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedEnterExpiryDateField(event, {
                                        sGstField,
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
                                style={{ width: "60px" }}
                                value={sGst}
                                id="sGstField"
                                onChange={(event) =>
                                    setSGST(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedEnterSGSTField(event, {
                                        cGstField,
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
                                style={{ width: "60px" }}
                                value={cGst}
                                id="cGstField"
                                onChange={(event) =>
                                    setCGST(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedEnterCGSTField(event, {
                                        iGstField,
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
                                style={{ width: "60px" }}
                                value={iGst}
                                id="iGstField"
                                onChange={(event) =>
                                    setIGST(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedEnterIGSTField(event, {
                                        rateField,
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
                                style={{ width: "70px" }}
                                value={rate}
                                id="rateField"
                                onChange={(event) =>
                                    setRate(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedEnterRateField(event);
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
                            {!isEditable && (
                                <button
                                    className="primary-save-button-style"
                                    onClick={onClickSaveAndNew}
                                >
                                    Save & New
                                </button>
                            )}
                            <button
                                className="primary-save-button-style"
                                onClick={onClickSaveButton}
                            >
                                Save
                            </button>
                        </Space>
                    </Row>
                </Col>
            </Card>
        </>
    );
};
