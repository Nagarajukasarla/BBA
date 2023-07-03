import React, { useState } from "react";
import { Col, Typography, Row, Space, Card, Input } from "antd";
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

    const onChangeNameValue = (event) => {
        setName(event.target.value);
    };

    const onChangeEmailValue = (event) => {
        setEmail(event.target.value);
    };

    const onChangePhoneValue = (event) => {
        setPhone(event.target.value);
    };

    const onChangeBlockNumberValue = (event) => {
        setBlockNumber(event.target.value);
    };

    const onChangeStreetValue = (event) => {
        setStreet(event.target.value);
    };

    const onChangeCityValue = (event) => {
        setCity(event.target.value);
    };

    const onChangeStateValue = (event) => {
        setState(event.target.value);
    };

    const onChangeZipcodeValue = (event) => {
        setZipcode(event.target.value);
    };

    const onPressedEnterZipcodeField = (event) => {
        if (event.keyCode === 13) {
        }
    };

    // Utils
    const saveNewCustomer = () => {
        // Create a json api in separete api's file
        // pass the values
        // save the object
        // Show the popoup
    };

    return (
        <div className="NewCustomerWarpper">
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
                                onChange={onChangeNameValue}
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
                                onChange={onChangeEmailValue}
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
                                onChange={onChangePhoneValue}
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
                                onChange={onChangeBlockNumberValue}
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
                                onChange={onChangeStreetValue}
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
                                onChange={onChangeCityValue}
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
                                onChange={onChangeStateValue}
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
                                onChange={onChangeZipcodeValue}
                                onKeyUp={(event) =>
                                    onPressedEnterZipcodeField(event)
                                }
                            ></Input>
                        </Space>
                    </Row>
                    <Row style={{ marginTop: "40px" }} justify="center">
                        <Space direction="horizontal">
                            <button className="primary-save-button-style">
                                Save
                            </button>
                        </Space>
                    </Row>
                </Card>
            </Col>
        </div>
    );
};
