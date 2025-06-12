import APIResponse from "@/classes/APIResponse";
import DATA_ROUTES from "@/constants/dataRoutes";
import { Customer, LiteCustomer, CustomersWithBasicSales } from "@/types/model";
import BaseService from "@/services/api/baseService";

class CustomerService extends BaseService {
    /**
     * Fetches a list of customers from the API
     * @returns A promise that resolves to an `APIResponse` containing an array of `LiteCustomer` objects.
     */
    async fetchCustomers(): Promise<APIResponse<LiteCustomer[]>> {
        // In development, this will use MockDataService via BaseService
        // In production, this will use the real API
        return this.get<LiteCustomer[]>(DATA_ROUTES.FETCH_CUSTOMERS);
    }

    async fetchLiteCustomers(): Promise<APIResponse<LiteCustomer[]>> {
        // In development, this will use MockDataService via BaseService
        // In production, this will use the real API
        return this.get<LiteCustomer[]>(DATA_ROUTES.FETCH_LITE_CUSTOMERS);
    }

    async fetchCustomersWithBasicSales(): Promise<APIResponse<CustomersWithBasicSales[]>> {
        // In development, this will use MockDataService via BaseService
        // In production, this will use the real API
        return this.get<CustomersWithBasicSales[]>(DATA_ROUTES.FETCH_CUSTOMERS_WITH_BASIC_SALES);
    }

    /**
     * Fetches a specific customer by ID
     * @param id The customer ID
     * @returns A promise that resolves to an `APIResponse` containing a `LiteCustomer` object.
     */
    async fetchCustomerById(id: number): Promise<APIResponse<Customer>> {
        // In development, this will use MockDataService via BaseService
        // In production, this will use the real API
        return this.get<Customer>(`${DATA_ROUTES.FETCH_CUSTOMERS}/${id}`);
    }

    async fetchLiteCustomerById(id: number): Promise<APIResponse<LiteCustomer>> {
        // In development, this will use MockDataService via BaseService
        // In production, this will use the real API
        return this.get<LiteCustomer>(`${DATA_ROUTES.FETCH_LITE_CUSTOMERS}/${id}`);
    }
}

// Create a singleton instance
const customerService = new CustomerService();
export default customerService;
