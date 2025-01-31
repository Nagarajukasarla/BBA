import React from "react";
import { Card, Form, Input, Button, Typography } from "antd";
import { loginWithPassword } from "../services/api";
import useShopState from "../states/useUserState";
const { Title, Text, Link } = Typography;

const Login: React.FC = () => {
    const shop = useShopState();

    const onFinish = (values: { email: string; password: string }) => {
        console.log(`Values: ${values}`);
        handleLogin(values.email, values.password);
    };

    const handleLogin = (email: string, password: string) => {
        loginWithPassword(email, password)
            .then((res) => {
                if (res.code === 200) {
                    shop.persistLiteShop(res.data!);
                }
            })
            .catch((error) => {
                console.log(error);
            });
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
                styles={{
                    body: {
                        padding: "10px 32px 20px 32px",
                    },
                }}
                style={{
                    width: 400,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: 8,
                }}
            >
                <Title
                    level={3}
                    style={{
                        marginBottom: 8,
                        textAlign: "left",
                        fontWeight: "800",
                    }}
                >
                    Sign In
                </Title>
                <Text
                    style={{
                        color: "rgba(33, 33, 33, 0.85)",
                        display: "block",
                        marginBottom: 24,
                        textAlign: "left",
                    }}
                >
                    Stay updated on your business world
                </Text>
                <Form layout="vertical" onFinish={onFinish} autoComplete="off">
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Email is required",
                            },
                        ]}
                        style={{
                            textAlign: "left",
                            marginBottom: 30,
                        }}
                    >
                        <Input
                            style={{ padding: "8px 12px", fontSize: 16 }}
                            placeholder="Enter Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Password is required",
                            },
                        ]}
                        style={{
                            textAlign: "left",
                            marginBottom: 30,
                        }}
                    >
                        <Input
                            style={{ padding: "8px 12px", fontSize: 16 }}
                            placeholder="Enter Password"
                        />
                    </Form.Item>

                    <Button
                        style={{ padding: "10px 12px", fontSize: 18 }}
                        type="primary"
                        htmlType="submit"
                        block
                    >
                        <Text
                            style={{
                                letterSpacing: "1px",
                                fontFamily: "Nunito Sans",
                                fontSize: 17,
                                color: "#fff",
                                fontWeight: "bold",
                            }}
                        >
                            SUBMIT
                        </Text>
                    </Button>
                </Form>

                <div style={{ textAlign: "center", marginTop: 16 }}>
                    <Text>New to BBA? </Text>
                    <Link href="/register">Register Account</Link>
                </div>
            </Card>
        </div>
    );
};

export default Login;
