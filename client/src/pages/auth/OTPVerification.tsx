import React, { useState, useEffect, useRef } from "react";
import { Card, Button, Typography, Input, Flex, InputRef } from "antd";
import { primaryButtonColor } from "../../themes";

const { Title, Text, Link } = Typography;

interface OTPVerificationProps {
    email: string;
    onVerify: (otp: string) => void;
    resendOTP: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
    email,
    onVerify,
    resendOTP,
}) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(InputRef | null)[]>([null, null, null, null]);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleChange = (value: string, index: number) => {
        // Handle paste event
        if (value.length > 1) {
            const otpArray = value.slice(0, 4).split("");
            const newOtp = [...otp];
            otpArray.forEach((digit, idx) => {
                if (idx < 4) newOtp[idx] = digit;
            });
            setOtp(newOtp);
            // Focus last filled input or the next empty input
            const lastIndex = Math.min(otpArray.length, 3);
            if (inputRefs.current[lastIndex]) {
                inputRefs.current[lastIndex]?.focus();
            }
            return;
        }

        // Handle single digit input
        if (/^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < 3 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            // Move focus to previous input on backspace
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        const otpString = otp.join("");
        if (otpString.length === 4) {
            onVerify(otpString);
        }
    };

    const handleResend = () => {
        resendOTP();
        setTimer(30);
        setCanResend(false);
    };

    return (
        <Card
            style={{
                width: 400,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: 8,
                padding: "8px",
            }}
        >
            <Title
                level={3}
                style={{
                    marginBottom: 8,
                    textAlign: "left",
                    fontWeight: 800,
                }}
            >
                OTP Verification
            </Title>

            <Text
                style={{
                    color: "rgba(33, 33, 33, 0.85)",
                    marginBottom: 24,
                    display: "block",
                    textAlign: "left",
                }}
            >
                Please enter the verification code we sent {" "}
                <Text style={{ fontWeight: 600 }}>{email}</Text>
            </Text>

            <Flex gap={12} justify="center" style={{ margin: "32px 0" }}>
                {otp.map((digit, index) => (
                    <Input
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={(e) => {
                            e.preventDefault();
                            const pastedData = e.clipboardData.getData("text");
                            handleChange(pastedData, 0);
                        }}
                        maxLength={1}
                        autoFocus={index === 0}
                        style={{
                            width: 50,
                            height: 53,
                            fontSize: 24,
                            textAlign: "center",
                            borderRadius: 8,
                            border: "2px solid #d9d9d9",
                        }}
                    />
                ))}
            </Flex>

            <Text
                style={{
                    display: "block",
                    marginBottom: 24,
                    color: "rgba(33, 33, 33, 0.85)",
                    textAlign: "center",
                }}
            >
                {canResend ? (
                    <Link onClick={handleResend}>Resend verification code</Link>
                ) : (
                    <Text>
                        Next code available in <Text style={{ color: primaryButtonColor }}>{timer}s</Text>
                    </Text>
                )}
            </Text>

            <Button
                type="primary"
                onClick={handleVerify}
                disabled={otp.join("").length !== 4}
                style={{
                    width: "50%",
                    height: "auto",
                    padding: "14px 12px",
                    borderRadius: 50,
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
                    VERIFY
                </Text>
            </Button>
        </Card>
    );
};

export default OTPVerification;
