import logo from "@/assets/images/logo.jpg";
import {
    Button,
    Card,
    Form,
    FormInstance,
    Input,
    message,
    Typography,
} from "antd";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIResponse from "../classes/APIResponse";
import OTPVerification from "../components/features/OTPVerification";
import { authService } from "../services/api/authService";
import { RegisterRequest, VerifyOTPRequest } from "../types/api";

const { Text, Link } = Typography;

// Define interface for form values
interface RegisterFormValues {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register: React.FC = () => {
    const formRef = useRef<FormInstance>(null);
    const [form] = Form.useForm();
    const [showOTP, setShowOTP] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validatePassword = (_: any, value: string) => {
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);

        if (!value) {
            return Promise.reject("Please enter password");
        }
        if (value.length < 8) {
            return Promise.reject(
                "Password must be at least 8 characters long"
            );
        }
        if (!hasLowerCase) {
            return Promise.reject(
                "Password must contain at least one lowercase letter"
            );
        }
        if (!hasNumber) {
            return Promise.reject("Password must contain at least one number");
        }
        return Promise.resolve();
    };

    const validateConfirmPassword = (_: any, value: string) => {
        if (!value) {
            return Promise.reject("Please confirm your password");
        }
        if (value !== form.getFieldValue("password")) {
            return Promise.reject("Passwords do not match");
        }
        return Promise.resolve();
    };

    const validateEmail = (_: any, value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            return Promise.reject("Please enter email");
        }
        if (!emailRegex.test(value)) {
            return Promise.reject("Please enter a valid email address");
        }
        return Promise.resolve();
    };

    const onFinish = async (values: RegisterFormValues) => {
        try {
            setLoading(true);
            let loadingKey = "register";
            message.loading({
                content: "Registering...",
                key: loadingKey,
                duration: 0,
            });

            const registerData: RegisterRequest = {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                password: values.password,
            };

            const response = await authService.register(registerData);

            if (response.code === APIResponse.SUCCESS) {
                message.success({
                    content: "OTP sent successfully!",
                    key: "register",
                    duration: 2,
                });
            } else if (response.code === APIResponse.CONFLICT) {
                message.error({
                    content: "Email already exists, Please Login instead.",
                    key: "register",
                    duration: 2,
                });
            } else {
                message.error({
                    content: "Registration failed. Please try again.",
                    key: "register",
                    duration: 2,
                });
            }

            setEmail(values.email);
            setShowOTP(true);
        } catch (error) {
            message.error({
                content: "Registration failed. Please try again.",
                key: "register",
                duration: 2,
            });
            console.error("Registration error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (otp: string) => {
        try {
            setLoading(true);
            message.loading({
                content: "Verifying...",
                key: "verify",
                duration: 0,
            });

            const verifyOtpRequest: VerifyOTPRequest = {
                email: email,
                otp: otp,
            };

            const response = await authService.verifyOtp(verifyOtpRequest);

            if (response.code === APIResponse.SUCCESS) {
                message.success({
                    content: "Email verified successfully!",
                    key: "verify",
                    duration: 2,
                });
                setShowOTP(false);
                navigate("/login");
            } else {
                message.error({
                    content: "Verification failed. Please try again.",
                    key: "verify",
                    duration: 2,
                });
            }
        } catch (error) {
            message.error({
                content: "Verification failed. Please try again.",
                key: "verify",
                duration: 2,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            message.loading({ content: "Sending OTP...", key: "resend" });

            // TODO: Replace with actual resend OTP API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            message.success({
                content: "OTP sent successfully!",
                key: "resend",
                duration: 2,
            });
        } catch (error) {
            message.error({
                content: "Failed to resend OTP. Please try again.",
                key: "resend",
                duration: 2,
            });
        }
    };

    if (showOTP) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <OTPVerification
                    email={email}
                    onVerify={handleVerify}
                    resendOTP={handleResendOTP}
                    loading={loading}
                />
            </div>
        );
    }

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
                styles={{ body: { padding: "10px 32px 20px 32px" } }}
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
                <Form
                    form={form}
                    ref={formRef}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="firstname"
                        rules={[
                            {
                                required: true,
                                message: "First name is required",
                            },
                            {
                                min: 2,
                                message:
                                    "First name must be at least 2 characters",
                            },
                            {
                                max: 50,
                                message:
                                    "First name cannot exceed 50 characters",
                            },
                        ]}
                        style={{ textAlign: "left", marginBottom: 30 }}
                    >
                        <Input
                            style={{ padding: "8px 12px", fontSize: 16 }}
                            placeholder="First Name"
                            autoFocus={true}
                        />
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        rules={[
                            {
                                required: true,
                                message: "Last name is required",
                            },
                            {
                                min: 2,
                                message:
                                    "Last name must be at least 2 characters",
                            },
                            {
                                max: 50,
                                message:
                                    "Last name cannot exceed 50 characters",
                            },
                        ]}
                        style={{ textAlign: "left", marginBottom: 30 }}
                    >
                        <Input
                            style={{ padding: "8px 12px", fontSize: 16 }}
                            placeholder="Last Name"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{ validator: validateEmail }]}
                        style={{ textAlign: "left", marginBottom: 30 }}
                    >
                        <Input
                            style={{ padding: "8px 12px", fontSize: 16 }}
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ validator: validatePassword }]}
                        style={{ textAlign: "left", marginBottom: 30 }}
                    >
                        <Input.Password
                            style={{ padding: "8px 12px", fontSize: 16 }}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        rules={[{ validator: validateConfirmPassword }]}
                        style={{ textAlign: "left", marginBottom: 30 }}
                    >
                        <Input.Password
                            style={{ padding: "8px 12px", fontSize: 16 }}
                            placeholder="Confirm Password"
                        />
                    </Form.Item>

                    <Form.Item>
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
                            loading={loading}
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
                                Signup
                            </Text>
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: "center", marginTop: 16 }}>
                    <Text>Already have an account? </Text>
                    <Link href="/login">Login</Link>
                </div>
            </Card>
        </div>
    );
};

export default Register;
