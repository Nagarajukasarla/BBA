import APIResponse from "@/classes/APIResponse";
import API_ROUTES from "@/constants/apiRoutes";
import { RegisterRequest, VerifyOTPRequest } from "@/types/api";
import { LiteShop } from "@/types/model";
import BaseService from "@/services/api/baseService";

class AuthService extends BaseService {
    /**
     * Authenticates the user.
     * @returns A promise that resolves to an `APIResponse` containing a string.
     */
    async authenticate(): Promise<APIResponse<string>> {
        return this.get<string>(API_ROUTES.AUTHENTICATE);
    }

    async register(request: RegisterRequest): Promise<APIResponse<boolean>> {
        return this.post<boolean>(API_ROUTES.REGISTER, request);
    }

    async verifyOtp(request: VerifyOTPRequest): Promise<APIResponse<boolean>> {
        return this.post<boolean>(API_ROUTES.VERIFY_OTP, request);
    }

    /**
     * Logs in a user with email and password.
     * @param email The user's email address.
     * @param password The user's password.
     * @returns A promise that resolves to an `APIResponse` containing a `LiteShop` object.
     */
    async loginWithPassword(email: string, password: string): Promise<APIResponse<LiteShop>> {
        return this.post<LiteShop>(API_ROUTES.LOGIN, { email, password });
    }

    /**
     * Logs in a user with email and OTP.
     * @param email The user's email address.
     * @param otp The one-time password.
     * @returns A promise that resolves to an `APIResponse` containing a `LiteShop` object.
     */
    async loginWithOTP(email: string, otp: string): Promise<APIResponse<LiteShop>> {
        return this.post<LiteShop>(API_ROUTES.LOGIN, { email, otp });
    }



}

export const authService = new AuthService();