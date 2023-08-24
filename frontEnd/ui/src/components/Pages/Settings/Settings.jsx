import  React from 'react';

import { Col, Row, Typography, Space, Button } from 'antd';
import { ToolFilled } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

export const Settings = () => {

    const navigate = useNavigate();

    const onClickMnageCompanies = () => {
        navigate('/app/settings/companies');
    }

    return (
        <div className="settingsWrapper">
            <Col span={24}>
                <Space direction="vertical" size={"large"}>
                    <Row style={{ padding: "0 20px" }}>
                        <Typography.Title level={4}>Settings</Typography.Title>
                    </Row>
                    <Row style={{ padding: "0 20px" }}>
                        <Space direction="horizontal" size={"large"}>
                            <Button onClick={onClickMnageCompanies} type="primary" shape="round" size="large" style={{paddingBottom: "8px"}}>
                                Manage Companies
                                <ToolFilled />
                            </Button>
                        </Space>
                    </Row>
                </Space>
            </Col>
        </div>
    );
}