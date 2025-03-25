import APIResponse from "../../classes/APIResponse";
import API_ROUTES from "../../constants/apiRoutes";
// import axiosInstance from "./axiosInstance";

// Every api here should be wrapped in APIResponse
// Every api should have not more than two lines of code

import { LiteShop } from "../../types/model";
import axiosInstance from "./axiosInstance";

/**
 * Unimplemented authentication method.
 * @returns Always returns false
 */
export const authenticate = async (): Promise<string> => {
    // TODO: Replace with actual authentication API call
    // Wrap in APIResponse
    try {
        // For testing, using setTimeout with Promise
        const response = await axiosInstance.get<string>(
            API_ROUTES.AUTHENTICATE
        );
        return Promise.resolve(response.data);
    } catch (error) {
        console.error("Error authenticating:", error);
        return Promise.reject(error);
    }
};

/**
 * Unimplemented login method
 * @param email
 * @param otp
 * @returns true for now
 */
export const loginWithOtp = async (
    email: string,
    otp: string
): Promise<boolean> => {
    // TODO: Replace with actual login API call
    // Wrap in APIResponse
    console.log("email, otp: ", email, otp);
    try {
        // For testing, using setTimeout with Promise
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true); // This will keep user authenticated
            }, 1000);
        });
    } catch (error) {
        console.error("Error logging in:", error);
        return false;
    }
};

/**
 * Validate login credentials
 * @param email
 * @param password
 * @returns `APIResponse` containing LiteShop object on success
 */
export const loginWithPassword = async (
    email: string,
    password: string
): Promise<APIResponse<LiteShop>> => {
    console.log("email, password: ", email, password);
    const response = await axiosInstance.post<LiteShop>(API_ROUTES.LOGIN, {
        email,
        password,
    });
    return new APIResponse<LiteShop>(response.status, response.data);
};

/**
 * Unimplemented method to fetch lite shop details
 * @returns LiteShop
 */
export const fetchLiteShop = async (): Promise<LiteShop> => {
    // TODO: Replace with actual API call
    // Wrap in APIResponse
    try {
        // Unimplemented
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: 1,
                    email: "srivenkateshwara@gmail.com",
                    name: "Sri Venkateshwara Pharmaceuticals",
                });
            });
        });
    } catch (error) {
        console.error("Error fetching lite shop:", error);
        throw error;
    }

    // try {
    //     const response = await axiosInstance.get<LiteShop>(
    //         API_ROUTES.FETCH_LITE_SHOP
    //     );
    //     if (!response.data) {
    //         // return new APIResponse<LiteShop>(response.status, null);
    //     }
    //     // return new APIResponse<LiteShop>(response.status, response.data);
    // } catch (error) {
    //     console.error("Error fetching lite shop:", error);
    //     throw error;
    // }
};

/**
 * Unimplemented method to update lite shop details
 * @param shop Partial<LiteShop> object containing fields to update
 * @returns Promise<LiteShop> Updated LiteShop object
 */
export const updateShop = async (
    shop: Partial<LiteShop>
): Promise<LiteShop> => {
    // TODO: Replace with actual API call
    // Wrap in APIResponse
    try {
        // Simulate API call with a delay
        return new Promise((resolve) => {
            setTimeout(() => {
                const updatedShop: LiteShop = {
                    id: 1,
                    email: shop.email || "srivenkateshwara@gmail.com",
                    name: shop.name || "Sri Venkateshwara Medicals",
                    image: shop.image,
                };
                resolve(updatedShop);
            }, 1000);
        });
    } catch (error) {
        console.error("Error updating shop:", error);
        throw error;
    }
};
