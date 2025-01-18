import React from "react";
import { Card, Form, Input, Button, Typography } from "antd";
const { Title, Text } = Typography;

const ResetPassword: React.FC = () => {
    const onFinish = (values: { password: string; confirmPassword: string }) => {
        console.log(`Values: ${values}`);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card
                style={{
                    width: 400,
                    borderRadius: 8,
                }}
            >
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            backgroundColor: "#1677ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 16px",
                        }}
                    >
                        <span style={{ color: "white", fontSize: "20px" }}>→</span>
                    </div>
                    <Title level={4} style={{ margin: 0 }}>
                        Enter your new password
                    </Title>
                </div>

                <Text style={{ display: "block", marginBottom: 24, textAlign: "center" }}>
                    Your new password must be different to previous passwords.
                </Text>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your new password",
                            },
                        ]}
                        style={{ marginBottom: 24 }}
                    >
                        <Input.Password 
                            placeholder="Enter new password" 
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your new password",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match'));
                                },
                            }),
                        ]}
                        style={{ marginBottom: 24 }}
                    >
                        <Input.Password 
                            placeholder="Confirm new password" 
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            size="large" 
                            block
                        >
                            Reset password
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ResetPassword;