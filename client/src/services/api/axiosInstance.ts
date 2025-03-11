import axios from "axios";
import { API_URL } from "../../config";

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            const { status } = error.response;

            if (status === 401) {
                console.warn("Unauthorized, Redirecting to login...");
                // Handle logout or redirection logic
                // window.location.href = "/login"; // Uncomment if needed
            } else if (status === 403) {
                console.warn("Forbidden: You don’t have permission to access this resource.");
            } else if (status >= 500) {
                console.error("Server error, please try again later.");
            }
        } else if (error.request) {
            console.error("No response from server. Check your network.");
        } else {
            console.error("Error setting up request:", error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;