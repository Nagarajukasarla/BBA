import { AxiosError, AxiosResponse } from "axios";
import APIResponse from "../../classes/APIResponse";
import mockDataService from "../../services/mockDataService";
import axiosInstance from "./axiosInstance";

// Flag to determine whether to use mock data or real API
// This should be set based on environment or configuration
const USE_MOCK_DATA = true;

class BaseService {
    protected async get<T>(url: string): Promise<APIResponse<T>> {
        if (USE_MOCK_DATA) {
            // Use mock data service when in development mode
            return mockDataService.get<T>(url);
        }

        // Use real API when in production mode
        try {
            const response = await axiosInstance.get<T>(url);
            return this.handleResponse(response);
        } catch (error) {
            console.error("Error fetching data: ", error);
            return this.handleError(error);
        }
    }

    protected async post<T>(url: string, data?: any): Promise<APIResponse<T>> {
        if (USE_MOCK_DATA) {
            // Use mock data service when in development mode
            return mockDataService.post<T>(url, data);
        }

        // Use real API when in production mode
        try {
            const response = await axiosInstance.post<T>(url, data);
            return this.handleResponse(response);
        } catch (error) {
            console.error("Error fetching data: ", error);
            return this.handleError(error);
        }
    }

    private handleResponse<T>(response: AxiosResponse<T>): APIResponse<T> {
        return new APIResponse<T>(response.status, response.data);
    }

    private handleError<T>(error: unknown): APIResponse<T> {
        const axiosError = error as AxiosError;
        console.log(axiosError);
        return new APIResponse<T>(axiosError.response?.status || -1, null);
    }
}

export default BaseService;
