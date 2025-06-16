import React from "react";
import { Card, Form, Input, Button, Typography, Space, Image } from "antd";
const { Title, Text } = Typography;
import logo from "../../assets/logo.webp";

const ForgotPassword: React.FC = () => {
    const onFinish = (values: { email: string }) => {
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
                    <Image src={logo} width={100} height={100} />
                    {/* <div
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
                        <span style={{ color: "white", fontSize: "20px" }}>
                            →
                        </span>
                    </div> */}
                    <Title level={4} style={{ margin: 0 }}>
                        Reset your password
                    </Title>
                </div>

                <Text style={{ display: "block", marginBottom: 24 }}>
                    Enter the email address you used to register with.
                </Text>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email",
                                type: "email",
                            },
                        ]}
                    >
                        <Input placeholder="Email address" size="large" />
                    </Form.Item>
                    <Space
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button size="large">Back to sign in</Button>
                        <Button type="primary" htmlType="submit" size="large">
                            Send instructions
                        </Button>
                    </Space>
                </Form>
            </Card>
        </div>
    );
};

export default ForgotPassword;
