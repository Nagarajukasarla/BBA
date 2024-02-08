import  React, { useEffect } from 'react';

import { Col, Row, Typography, Space, Button } from 'antd';
import { ToolFilled } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../../services/api/get/authorizedGetServices';
import { getToken } from '../../../services/cookies/tokenUtils';

export const Settings = () => {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Settings";
        const checkAuthentication = async () => {
            if (!(await authenticate(getToken()))) {
                console.log("Not authenticated");
                navigate("/login");
            }
        };
        checkAuthentication();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onClickMnageCompanies = () => {
        navigate('/app/companies');
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