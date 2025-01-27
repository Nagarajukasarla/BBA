import React, { useState, useEffect } from "react";
import {
    Col,
    Row,
    Typography,
    Space,
    Button,
    Modal,
    Input,
    message,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { createCompany } from "../../../services/api/post/authorizedPostService";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../../../services/api/get/authorizedGetServices";
import TokenManager from "../../../services/cookies/TokenManager";
import APIResponse from "../../../services/api/statusUtils/APIResponse";

export const Companies = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [company, setCompany] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    let status = false;

    const checkAuthentication = async () => {
        if (!(await authenticate(TokenManager.getToken()))) {
            console.log("Not authenticated");
            navigate("/login");
        }
    };

    useEffect(() => {
        //checkAuthentication();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const result = (type) => {
        messageApi.open({
            type: `${type}`,
            content:
                type === "success" ? "Saved successfully" : "Failed to Save",
        });

    };

    const success = (type) => {
        messageApi.open({
            type: `${type}`,
            content: "Saved successfully"
        });
    };
    const showModal = () => {
        setOpen(true);
    };

    const onClickAddNewCompany = () => {
       showModal();
    };

    const handleOk = () => {
        let resultMessage = '';
        checkAuthentication();
        setConfirmLoading(true);
        // createCompany(company)
        //     .then((response) => {
        //         if (response.status === APIResponse.SUCCESS) {
        //             resultMessage = "success";
        //         }
        //         else if (response.status === APIResponse.CONFLICT) {
        //             resultMessage = "failed";
        //         }
        //         else {
        //             resultMessage = "failed";
        //         }
        //         setConfirmLoading(false);
        //     })
        setOpen(false);
        setConfirmLoading(false);
        setCompany("");
        success('success');
    };

    const handleCancel = () => {
        setCompany("");
        setOpen(false);
    };

    const onNameChanges = (event) => {
        setCompany(event.target.value);
    };

    return (
        <div className="invoiceWrapper">
            {contextHolder}
            <Col span={24} style={{ width: "80vw", height: "80vh" }}>
                <Space direction="vertical" size={"large"}>
                    <Row style={{ padding: "0 20px" }}>
                        <Typography.Title level={4}>Settings</Typography.Title>
                    </Row>
                    <Row style={{ padding: "0 20px" }}>
                        <Space direction="horizontal" size={"large"}>
                            <Button
                                onClick={onClickAddNewCompany}
                                type="primary"
                                shape="round"
                                size="large"
                                style={{ paddingBottom: "8px" }}
                            >
                                Add Company
                                <PlusCircleOutlined />
                            </Button>
                        </Space>
                    </Row>
                </Space>
            </Col>
            <Modal
                title="Add Company"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Col span={24}>
                    <Space
                        direction="vertical"
                        size={"large"}
                        style={{ margin: "25px 0 0 10px" }}
                    >
                        <Space direction="vertical">
                            <Typography.Text className="primary-input-field-header-style">
                                Name
                            </Typography.Text>
                            <Input
                                style={{ width: "250px" }}
                                value={company}
                                onChange={onNameChanges}
                                onKeyUp={(event) => {
                                    event.key === "Enter" && handleOk();
                                }}
                            ></Input>
                        </Space>
                    </Space>
                </Col>
            </Modal>
        </div>
    );
};
