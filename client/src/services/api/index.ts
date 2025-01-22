// import API_ROUTES from "../../constants/apiRoutes";
// import axiosInstance from "./axiosInstance";

import { LiteShop } from "../../types/model";

/**
 * Unimplemented authentication method.
 * @returns Always returns false
 */
export const authenticate = async (): Promise<boolean> => {
    // TODO: Replace with actual authentication API call
    // Wrap in APIResponse
    try {
        // For testing, using setTimeout with Promise
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(false); // This will always return false
            }, 1000);
        });
    } catch (error) {
        console.error("Error authenticating:", error);
        return false;
    }
};

/**
 * Unimplemented login method
 * @param email 
 * @param otp 
 * @returns true for now
 */
export const loginWithOtp = async (email: string, otp: string): Promise<boolean> => {
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
 * Unimplemented login method
 * @param email 
 * @param password 
 * @returns true for now
 */
export const loginWithPassword = async (email: string, password: string): Promise<boolean> => {
    // TODO: Replace with actual login API call
    // Wrap in APIResponse
    console.log("email, password: ", email, password);
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
                    name: "Sri Venkateshwara Medicals"
                });
            });
        });
    }
    catch (error) {
        console.error("Error fetching lite shop:", error);
        throw error;
    }
};

/**
 * Unimplemented method to update lite shop details
 * @param shop Partial<LiteShop> object containing fields to update
 * @returns Promise<LiteShop> Updated LiteShop object
 */
export const updateShop = async (shop: Partial<LiteShop>): Promise<LiteShop> => {
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
                    image: shop.image
                };
                resolve(updatedShop);
            }, 1000);
        });
    } catch (error) {
        console.error("Error updating shop:", error);
        throw error;
    }
};