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
    saveProduct
} from "../../../services/api/post/authorizedPostService";
import { getToken } from "../../../services/load/loadBrowserContent";
import "../../coreComponents/Styles/primaryStyle.css";

import { validate } from "../../../services/validation/validate";
import {
    getFormattedDate,
} from "../../../services/utils/dateFormater";
import {
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

export const AddOrEditStock = () => {
    useEffect(() => {
        document.title = "Stocks";
    });

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
    const mrpField = document.getElementById("mrpField");
    const packingTypeField = document.getElementById("packingTypeField");

    const [productName, setProductName] = useState(
        obj != null ? obj.productName : ""
    );
    const [batchNumber, setBatchNumber] = useState(
        obj != null ? obj.batchNumber : ""
    );
    const [companyName, setCompanyName] = useState(
        obj != null ? obj.companyName : ""
    );
    const [packingType, setPackingType] = useState(
        obj != null ? obj.packingType : ""
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
    const [mrp, setMrp] = useState(obj != null ? obj.rate : "");

    const fields = [
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

    const [messageApi, contextHolder] = message.useMessage();

    const clearProduct = () => {
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

    const submitProduct = async (
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
        mrp
    ) => {
        const product = {
            name: productName,
            batchNumber: batchNumber,
            companyName: companyName,
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
        const response = await saveProduct(product, getToken());
        return response ? true : false;
    };

    const result = (type) => {
        messageApi.open({
            type: `${type}`,
            content:
                type === "success" ? "Saved successfully" : "Failed to Save",
        });
    };

    const onClickSaveButton = () => {
        if (validate(fields)) {
            submitProduct(
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
                mrp
            )
                .then(() => {
                    clearProduct();
                    result("success");
                    navigate("/app/stocks");
                })
                .catch(() => result("error"));
        }
    };

    const onClickSaveAndNew = () => {
        if (validate(fields)) {
            submitProduct(
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
                mrp
            )
                .then(() => {
                    setProductName("");
                    setBatchNumber("");
                    setCompanyName("");
                    setPackingType("");
                    setQuantity("");
                    setManufacturingDate("");
                    setExpiryDate("");
                    setSGST("");
                    setCGST("");
                    setIGST("");
                    setRate("");
                    setMrp("");
                    result("success");
                })
                .catch(() => result("error"));
        }
    };

    const onPressedEnterMrpField = (event) => {
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
                                style={{
                                    width: "200px",
                                    padding: "4px 3px 4px 6px",
                                }}
                                value={productName}
                                id="productNameField"
                                onChange={(event) =>
                                    setProductName(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedProductNameHandler(event, {
                                        batchNumberField,
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
                                    width: "60px",
                                    padding: "4px 3px 4px 6px",
                                }}
                                value={batchNumber}
                                id="batchNumberField"
                                onChange={(event) =>
                                    setBatchNumber(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedBatchNumberHandler(event, {
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
                                style={{
                                    width: "130px",
                                    padding: "4px 3px 4px 6px",
                                }}
                                value={companyName}
                                id="companyField"
                                onChange={(event) =>
                                    setCompanyName(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedCompanyHandler(event, {
                                        packingTypeField,
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
                                }}
                                value={packingType}
                                id="packingTypeField"
                                onChange={(event) =>
                                    setPackingType(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedPackingTypeHandler(event, {
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
                                style={{ width: "55px", padding: "4px" }}
                                value={quantity}
                                id="quantityField"
                                onChange={(event) =>
                                    setQuantity(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedQuantityHandler(event, {
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
                                style={{
                                    width: "50px",
                                    padding: "4px 3px 4px 5px",
                                }}
                                value={manufacturingDate}
                                id="manufacturingDateField"
                                onChange={(event) =>
                                    setManufacturingDate(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedManufacturingDateHandler(event, {
                                        expiryDateField,
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
                                }}
                                value={expiryDate}
                                id="expiryDateField"
                                onChange={(event) =>
                                    setExpiryDate(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedExpiryDateHandler(event, {
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
                                style={{ width: "30px", padding: "4px" }}
                                value={sGst}
                                id="sGstField"
                                onChange={(event) =>
                                    setSGST(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedSGSTHandler(event, {
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
                                style={{ width: "30px", padding: "4px" }}
                                value={cGst}
                                id="cGstField"
                                onChange={(event) =>
                                    setCGST(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedCGSTHandler(event, {
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
                                style={{ width: "30px", padding: "4px" }}
                                value={iGst}
                                id="iGstField"
                                onChange={(event) =>
                                    setIGST(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedIGSTHandler(event, {
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
                                style={{ width: "60px", padding: "4px" }}
                                value={rate}
                                id="rateField"
                                onChange={(event) =>
                                    setRate(event.target.value)
                                }
                                onKeyUp={(event) => {
                                    onPressedRateHandler(event, {
                                        mrpField,
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
                                style={{ width: "60px", padding: "4px" }}
                                value={mrp}
                                id="mrpField"
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
