import React, { useState } from "react";
import { Col, Typography, Row, Space, Card, Input, message } from "antd";
import {
    onPressedEnterNameField,
    onPressedEnterEmailField,
    onPressedEnterPhoneField,
    onPressedEnterBlockNumberField,
    onPressedEnterStreetField,
    onPressedEnterCityField,
    onPressedEnterStateField,
} from "./events/KeyboardEvents";

import "./css/newCustomer.css";
import "../../coreComponents/Styles/primaryStyle.css";
import { saveCustomer } from "../../../services/api/post/authorizedPostService";
import { getToken } from "../../../services/cookies/tokenUtils";
import { useNavigate } from "react-router-dom";
import { generateFormattedDateString } from "../../../services/utils/dateFormater";

export const NewCustomer = () => {
    const emailField = document.getElementById("emailField");
    const phoneField = document.getElementById("phoneField");
    const blockNumberField = document.getElementById("blockNumberField");
    const streetField = document.getElementById("streetField");
    const cityField = document.getElementById("cityField");
    const stateField = document.getElementById("stateField");
    const zipcodeField = document.getElementById("zipcodeField");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [blockNumber, setBlockNumber] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");

    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    
    const result = (type) => {
        messageApi.open({
            type: `${type}`,
            content: (type === "success") ? 'Saved successfully' : "Failed to save",
        });
    };

    const getAddress = () => {
        return {
            blockNumber: blockNumber,
            street: street,
            city: city,
            state: state,
            zipcode: zipcode
        };
    };

    const getCustomer = () => {
        return {
            name: name,
            email: email,
            phone: phone,
            createdDate: generateFormattedDateString(),
            address: getAddress()
        };
    }; 
    
    const onPressedEnterZipcodeField = (event) => {
        if (event.keyCode === 13) {
            saveNewCustomer()
                .then(() => {
                    setName("");
                    setEmail("");
                    setPhone("");
                    setBlockNumber("");
                    setStreet("");
                    setCity("");
                    setState("");
                    setZipcode("");
                    result("success");
                    navigate('/app/customers');
                })
                .catch((error) => {
                    console.log("Saving failed: " + error);
                    result("failed");
                });
        }
    };

    const saveNewCustomer = async () => {
        const response = await saveCustomer(getCustomer(), getToken());
        return response ? true : false;
    };


    const onClickSaveButton = () => {
        saveNewCustomer()
            .then(() => {
                setName("");
                setEmail("");
                setPhone("");
                setBlockNumber("");
                setStreet("");
                setCity("");
                setState("");
                setZipcode("");
                result("success");
                navigate('/app/customers');
            })
            .catch((error) => {
                console.log("Saving falied: " + error);
                result("failed")
            });
     };

    return (
        <div className="NewCustomerWarpper">
            {contextHolder}
            <Col span={24} style={{ width: "84vw" }}>
                <Row>
                    <Typography.Title
                        level={4}
                        className="customerDropdownTitle"
                    >
                        New Customer
                    </Typography.Title>
                </Row>
                <Card
                    bodyStyle={{
                        margin: "0px",
                        padding: "8px",
                        height: "60vh",
                    }}
                >
                    <Row style={{ marginTop: "20px" }}>
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
                                value={name}
                                onChange={(event) =>{
                                    setName(event.target.value);
                                }}
                                className="customerInputFields"
                                onKeyUp={(event) =>
                                    onPressedEnterNameField(event, {
                                        emailField,
                                    })
                                }
                            ></Input>
                        </Space>
                        <Space
                            direction="vertical"
                            style={{
                                textAlign: "start",
                                marginLeft: "80px",
                            }}
                        >
                            <Typography.Text className="primary-input-field-header-style">
                                Email
                            </Typography.Text>
                            <Input
                                style={{ width: "250px" }}
                                value={email}
                                className="customerInputFields"
                                id="emailField"
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                                onKeyUp={(event) =>
                                    onPressedEnterEmailField(event, {
                                        phoneField,
                                    })
                                }
                            />
                        </Space>
                        <Space
                            direction="vertical"
                            style={{
                                textAlign: "start",
                                marginLeft: "80px",
                            }}
                        >
                            <Typography.Text className="primary-input-field-header-style">
                                Phone
                            </Typography.Text>
                            <Input
                                style={{ width: "160px" }}
                                value={phone}
                                className="customerInputFields"
                                id="phoneField"
                                onChange={(event) => {
                                    setPhone(event.target.value);
                                }}
                                onKeyUp={(event) =>
                                    onPressedEnterPhoneField(event, {
                                        blockNumberField,
                                    })
                                }
                            ></Input>
                        </Space>
                    </Row>
                    <Row style={{ marginTop: "50px" }}>
                        <Space
                            direction="vertical"
                            style={{
                                textAlign: "start",
                                marginLeft: "20px",
                            }}
                        >
                            <Typography.Text className="primary-input-field-header-style">
                                Block Number/House Number
                            </Typography.Text>
                            <Input
                                style={{ width: "160px" }}
                                value={blockNumber}
                                className="customerInputFields"
                                id="blockNumberField"
                                onChange={(event) => {
                                    setBlockNumber(event.target.value);
                                }}
                                onKeyUp={(event) =>
                                    onPressedEnterBlockNumberField(event, {
                                        streetField,
                                    })
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
                                Street
                            </Typography.Text>
                            <Input
                                style={{ width: "220px" }}
                                value={street}
                                className="customerInputFields"
                                id="streetField"
                                onChange={(event) => {
                                    setStreet(event.target.value);
                                }}
                                onKeyUp={(event) =>
                                    onPressedEnterStreetField(event, {
                                        cityField,
                                    })
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
                                City
                            </Typography.Text>
                            <Input
                                style={{ width: "160px" }}
                                value={city}
                                className="customerInputFields"
                                id="cityField"
                                onChange={(event) => {
                                    setCity(event.target.value);
                                }}
                                onKeyUp={(event) =>
                                    onPressedEnterCityField(event, {
                                        stateField,
                                    })
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
                                State
                            </Typography.Text>
                            <Input
                                style={{ width: "160px" }}
                                value={state}
                                className="customerInputFields"
                                id="stateField"
                                onChange={(event) => {
                                    setState(event.target.value);
                                }}
                                onKeyUp={(event) =>
                                    onPressedEnterStateField(event, {
                                        zipcodeField,
                                    })
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
                                Zipcode
                            </Typography.Text>
                            <Input
                                style={{ width: "100px" }}
                                value={zipcode}
                                className="customerInputFields"
                                id="zipcodeField"
                                onChange={(event) => {
                                    setZipcode(event.target.value);
                                }}
                                onKeyUp={(event) =>
                                    onPressedEnterZipcodeField(event)
                                }
                            ></Input>
                        </Space>
                    </Row>
                    <Row style={{ marginTop: "40px" }} justify="center">
                        <Space direction="horizontal">
                            <button 
                                className="primary-save-button-style"
                                onClick={onClickSaveButton}
                            >
                                Save
                            </button>
                        </Space>
                    </Row>
                </Card>
            </Col>
        </div>
    );
};
