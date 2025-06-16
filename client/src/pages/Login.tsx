import React from "react";
import { Card, Form, Input, Button, Typography } from "antd";
import { loginWithPassword } from "@/services/api";
import useShopState from "@/states/useUserState";
import { authService } from "@/services/api/authService";
import logo from "@/assets/images/logo.jpg";

const { Title, Text, Link } = Typography;

const Login: React.FC = () => {
    const shop = useShopState();

    const onFinish = (values: { email: string; password: string }) => {
        console.log(`Values: ${values}`);
        handleLogin(values.email, values.password);
    };

    const handleLogin = (email: string, password: string) => {
        loginWithPassword(email, password)
            .then(res => {
                if (res.code === 200) {
                    shop.persistLiteShop(res.data!);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const authenticate = () => {
        authService.authenticate().then(res => {
            console.log(res);
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
                        padding: "20px 32px 20px 32px",
                    },
                }}
                style={{
                    width: 400,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: 8,
                    textAlign: "center",
                }}
            >
                <img
                    src={logo}
                    style={{
                        margin: "10px 0",
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        userSelect: "none",
                    }}
                />
                <Text
                    style={{
                        color: "rgba(33, 33, 33, 0.85)",
                        display: "block",
                        marginBottom: 24,
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
                        type="primary"
                        htmlType="submit"
                        block
                        style={{
                            padding: "17px 12px",
                            fontSize: 18,
                            borderRadius: 50,
                            width: "70%",
                        }}
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
                            Login
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
