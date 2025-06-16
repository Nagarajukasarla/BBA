export type LiteShopRequest = {
    email: string;
    password?: string;
    otp?: string;
};

export type RegisterRequest = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type VerifyOTPRequest = {
    email: string;
    otp: string;
};