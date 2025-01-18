// import API_ROUTES from "../../constants/apiRoutes";
// import axiosInstance from "./axiosInstance";

export const authenticate = async (): Promise<boolean> => {
    try {
        // For testing, using setTimeout with Promise
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true); // This will keep user authenticated
            }, 1000);
        });
    } catch (error) {
        console.error("Error authenticating:", error);
        return false;
    }
};
