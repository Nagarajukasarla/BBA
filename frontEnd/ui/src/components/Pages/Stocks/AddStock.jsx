import { Card, Col, Row, Space, Typography, Input } from "antd";
import React, { useState } from "react";
import { getProduct, saveProduct } from "../../../services/api/post/authorizedPostService";
import { getToken } from "../../../services/load/loadBrowserContent";

export const AddStock = () => {
    const [productName, setProductName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [manufacturingDate, setManufacturingDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [sGst, setSGST] = useState("");
    const [cGst, setCGST] = useState("");
    const [iGst, setIGST] = useState("");
    const [price, setPrice] = useState("");

    const fetchProduct = async (name) => {
        const response = await getProduct(name, getToken());
        return response;
    };

    const submitProduct = async (
        productName,
        companyName,
        quantity,
        manufacturingDate,
        expiryDate,
        sGst,
        cGst,
        iGst,
        price
    ) => {
        const product = {
            name: productName,
            companyName: companyName,
            quantity: quantity,
            manufacturingDate: manufacturingDate,
            expiryDate: expiryDate,
            sGst: sGst,
            cGst: cGst,
            iGst: iGst,
            price: price,
        };
        const response = await saveProduct(product, getToken());
        return response ? true : false;
    };

    const validate = () => {
        return productName !== "" &&
            companyName !== "" &&
            quantity !== "" &&
            manufacturingDate !== "" &&
            expiryDate !== "" &&
            sGst !== "" &&
            cGst !== "" &&
            iGst !== "" &&
            price !== ""
            ? true
            : false;
    };

    const onPressedEnterNameField = () => {
        // here productName should not be null
        const response = fetchProduct(productName);
        if (response) {
            console.log(response);
            setCompanyName(response.name);
            setQuantity(response.quantity);
            setManufacturingDate(response.manufacturingDate);
            setExpiryDate(response.expiryDate);
            setSGST(response.sGst);
            setCGST(response.cGst);
            setIGST(response.iGst);
            setPrice(response.price);
        }
    };

    const onClickSaveButton = () => {
        if (validate()) {
            if (
                submitProduct(
                    productName,
                    companyName,
                    quantity,
                    manufacturingDate,
                    expiryDate,
                    sGst,
                    cGst,
                    iGst,
                    price
                )
            ) {
                setProductName("");
                setCompanyName("");
                setQuantity("");
                setManufacturingDate("");
                setExpiryDate("");
                setSGST("");
                setCGST("");
                setIGST("");
                setPrice("");

                // show success popup
                // close the add stock block and show list of products
            }
            else {
                // show error popup
                // close the add stock block and show list of products
            }
        }
    };

    const onClickSaveAndNew = () => {
        if (validate()) {
            if (
                submitProduct(
                    productName,
                    companyName,
                    quantity,
                    manufacturingDate,
                    expiryDate,
                    sGst,
                    cGst,
                    iGst,
                    price
                )
            ) {
                setProductName("");
                setCompanyName("");
                setQuantity("");
                setManufacturingDate("");
                setExpiryDate("");
                setSGST("");
                setCGST("");
                setIGST("");
                setPrice("");

                // show success popup
            }
            else {
                // show error popup
            }
        }
    };

    return (
        <>
            <Card
                bodyStyle={{
                    padding: "10px",
                }}
            >
                <Col>
                    <Row>
                        <Typography.Title level={4}>Add Stock</Typography.Title>
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
                                style={{ width: "300px" }}
                                value={productName}
                                onChange={(event) =>
                                    setProductName(event.target.value)
                                }
                                className="customerInputFields"
                                // onKeyUp={(event) =>
                                //     // onPressedEnterNameField(event, {
                                //     //     emailField,
                                //     // })
                                // }
                            ></Input>
                        </Space>
                    </Row>
                </Col>
            </Card>
        </>
    );
};
