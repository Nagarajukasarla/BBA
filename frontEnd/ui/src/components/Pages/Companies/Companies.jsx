import React, { useState } from "react";
import { Col, Row, Typography, Space, Button, Modal, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

export const Companies = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [company, setCompany] = useState("");
    
    const showModal = () => {
        setOpen(true);
    };
    
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
        setCompany("");
    };
    
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setCompany("");
        setOpen(false);
    };
    
    const onClickAddNewCompany = () => {
        showModal();
    };

    const onNameChanges = (event) => {
        setCompany(event.target.value);
    };

    // const NewCompany = () => {
    //     return (
    //         <>
    //             <Col span={24}>
    //                 <Space direction="vertical" size={"large"} style={{margin: "25px 0 0 10px"}}>
    //                     <Space direction="vertical">
    //                         <Typography.Text 
    //                             className="primary-input-field-header-style">
    //                             Name
    //                         </Typography.Text>
    //                         <Input 
    //                             style={{ width: "250px" }}
    //                             value={company}
    //                             onKeyUp={onNameChanges}
    //                         >
    //                         </Input>
    //                     </Space>
    //                 </Space>
    //             </Col>
    //         </>
    //     );
    // }

    return (
        <div className="invoiceWrapper">
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
                    <Space direction="vertical" size={"large"} style={{margin: "25px 0 0 10px"}}>
                        <Space direction="vertical">
                            <Typography.Text 
                                className="primary-input-field-header-style">
                                Name
                            </Typography.Text>
                            <Input 
                                style={{ width: "250px" }}
                                value={company}
                                onChange={onNameChanges}
                            >
                            </Input>
                        </Space>
                    </Space>
                </Col>
            </Modal>
        </div>
    );
};
