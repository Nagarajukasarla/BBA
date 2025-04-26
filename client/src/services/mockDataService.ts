import APIResponse from "../classes/APIResponse";
import DATA_ROUTES from "../constants/dataRoutes";
import { mockData, MockDataType } from "../data";
import { Invoice } from "../types/model";
import { parseQueryString } from "../utils/queryUtils";
import dayjs from "dayjs";

/**
 * Service for handling mock data requests during development
 * This service mimics API calls but returns local data
 */
class MockDataService {
    private data: MockDataType;

    constructor() {
        this.data = mockData;
    }

    /**
     * Get data based on the route
     * @param route The data route to fetch from
     * @returns APIResponse with the requested data
     */
    async get<T>(route: string): Promise<APIResponse<T>> {
        // Simulate network delay
        await this.delay(1000);

        // Parse route to extract parameters if any
        const { basePath, params, queryParams } = this.parseRoute(route);

        switch (basePath) {
            case DATA_ROUTES.FETCH_CUSTOMERS:
                if (params.id) {
                    const customer = this.data.customers.find(
                        c => c.id === Number(params.id)
                    );
                    return new APIResponse<T>(
                        customer ? APIResponse.SUCCESS : APIResponse.NOT_FOUND,
                        customer as unknown as T
                    );
                }
                return new APIResponse<T>(
                    APIResponse.SUCCESS,
                    this.data.customers as unknown as T
                );

            case DATA_ROUTES.FETCH_LITE_CUSTOMERS:
                if (params.id) {
                    const customer = this.data.liteCustomers.find(
                        c => c.id === Number(params.id)
                    );
                    return new APIResponse<T>(
                        customer ? APIResponse.SUCCESS : APIResponse.NOT_FOUND,
                        customer as unknown as T
                    );
                }
                return new APIResponse<T>(
                    APIResponse.SUCCESS,
                    this.data.liteCustomers as unknown as T
                );

            case DATA_ROUTES.FETCH_INVOICES:
                // If we have query parameters, filter the invoices
                if (Object.keys(queryParams).length > 0) {
                    const filteredInvoices = this.filterInvoices(
                        this.data.invoices,
                        queryParams
                    );
                    return new APIResponse<T>(
                        APIResponse.SUCCESS,
                        filteredInvoices as unknown as T
                    );
                }
                return new APIResponse<T>(
                    APIResponse.SUCCESS,
                    this.data.invoices as unknown as T
                );

            case DATA_ROUTES.FETCH_LITE_SHOP:
            case DATA_ROUTES.FETCH_SHOP:
                return new APIResponse<T>(
                    APIResponse.SUCCESS,
                    this.data.shop as unknown as T
                );

            case DATA_ROUTES.FETCH_PRODUCTS:
                if (params.id) {
                    const product = this.data.products.find(
                        p => p.id === Number(params.id)
                    );
                    return new APIResponse<T>(
                        product ? APIResponse.SUCCESS : APIResponse.NOT_FOUND,
                        product as unknown as T
                    );
                }
                return new APIResponse<T>(
                    APIResponse.SUCCESS,
                    this.data.products as unknown as T
                );

            case DATA_ROUTES.AUTHENTICATE:
                return new APIResponse<T>(
                    APIResponse.SUCCESS,
                    "authenticated" as unknown as T
                );

            default:
                console.warn(`No mock data handler for route: ${route}`);
                return new APIResponse<T>(APIResponse.NOT_FOUND, null);
        }
    }

    /**
     * Post data based on the route
     * @param route The data route to post to
     * @param data The data to post
     * @returns APIResponse with the result
     */
    async post<T>(route: string, data: any): Promise<APIResponse<T>> {
        // Simulate network delay
        await this.delay(300);

        // Parse route to extract parameters if any
        const { basePath } = this.parseRoute(route);

        switch (basePath) {
            case DATA_ROUTES.LOGIN:
                // Simple mock login that always succeeds
                return new APIResponse<T>(
                    APIResponse.SUCCESS,
                    this.data.shop as unknown as T
                );

            case DATA_ROUTES.REGISTER:
            case DATA_ROUTES.VERIFY_OTP:
                // Simple mock registration/verification that always succeeds
                return new APIResponse<T>(
                    APIResponse.SUCCESS,
                    true as unknown as T
                );

            case DATA_ROUTES.UPDATE_SHOP:
                // Update shop data and return updated shop
                const updatedShop = { ...this.data.shop, ...data };
                return new APIResponse<T>(
                    APIResponse.SUCCESS,
                    updatedShop as unknown as T
                );

            default:
                console.warn(`No mock data handler for route: ${route}`);
                return new APIResponse<T>(APIResponse.NOT_FOUND, null);
        }
    }

    /**
     * Parse a route string to extract base path and parameters
     * @param route The route string (e.g., "/customers/1")
     * @returns Object with basePath and params
     */
    private parseRoute(route: string): {
        basePath: string;
        params: Record<string, string>;
        queryParams: Record<string, any>;
    } {
        const params: Record<string, string> = {};
        let queryParams: Record<string, any> = {};
        let basePath = route;

        // Extract query parameters if present
        if (route.includes("?")) {
            const [path, query] = route.split("?");
            basePath = path;
            queryParams = parseQueryString(`?${query}`);
        }

        // Handle routes with path parameters (e.g., "/customers/:id")
        if (basePath.includes(DATA_ROUTES.FETCH_CUSTOMER_BY_ID.split(":")[0])) {
            const parts = basePath.split("/");
            const id = parts[parts.length - 1];
            if (id && !isNaN(Number(id))) {
                params.id = id;
                return {
                    basePath: DATA_ROUTES.FETCH_CUSTOMERS,
                    params,
                    queryParams,
                };
            }
        }

        // Add handling for lite customers with ID
        if (basePath.includes("/lite-customers/")) {
            const parts = basePath.split("/");
            const id = parts[parts.length - 1];
            if (id && !isNaN(Number(id))) {
                params.id = id;
                return {
                    basePath: DATA_ROUTES.FETCH_LITE_CUSTOMERS,
                    params,
                    queryParams,
                };
            }
        }

        // Add handling for products with ID
        if (basePath.includes("/products/")) {
            const parts = basePath.split("/");
            const id = parts[parts.length - 1];
            if (id && !isNaN(Number(id))) {
                params.id = id;
                return {
                    basePath: DATA_ROUTES.FETCH_PRODUCTS,
                    params,
                    queryParams,
                };
            }
        }

        // For other routes, just return the route as is
        return { basePath, params, queryParams };
    }

    /**
     * Filter invoices based on query parameters
     * @param invoices The invoices to filter
     * @param filters The filters to apply
     * @returns Filtered invoices
     */
    private filterInvoices(
        invoices: Invoice[],
        filters: Record<string, any>
    ): Invoice[] {
        return invoices.filter(invoice => {
            // Filter by customer ID
            if (filters.customerId) {
                console.log("Filtering by customer ID:", filters.customerId);
                console.log("Invoice customer ID:", invoice.customerDetails.id);
                console.log(
                    "Match?",
                    invoice.customerDetails.id === Number(filters.customerId)
                );

                if (invoice.customerDetails.id !== Number(filters.customerId)) {
                    return false;
                }
            }

            // Filter by payment mode
            if (
                filters.paymentMode &&
                invoice.paymentMode.toLowerCase() !==
                    filters.paymentMode.toLowerCase()
            ) {
                return false;
            }

            // Filter by status
            if (
                filters.status &&
                invoice.status.toLowerCase() !== filters.status.toLowerCase()
            ) {
                return false;
            }

            // Filter by day wise
            if (filters.dayWise) {
                const today = dayjs();
                const invoiceDate = dayjs(invoice.generationDate);

                switch (filters.dayWise.toLowerCase()) {
                    case "today":
                        if (!invoiceDate.isSame(today, "day")) {
                            return false;
                        }
                        break;
                    case "yesterday":
                        if (
                            !invoiceDate.isSame(today.subtract(1, "day"), "day")
                        ) {
                            return false;
                        }
                        break;
                    case "day before yesterday":
                        if (
                            !invoiceDate.isSame(today.subtract(2, "day"), "day")
                        ) {
                            return false;
                        }
                        break;
                }
            }

            // Filter by specific date
            if (filters.specificDate) {
                const specificDate = dayjs(filters.specificDate);
                const invoiceDate = dayjs(invoice.generationDate);
                if (!invoiceDate.isSame(specificDate, "day")) {
                    return false;
                }
            }

            // Filter by date range
            if (filters.startDate && filters.endDate) {
                const startDate = dayjs(filters.startDate);
                const endDate = dayjs(filters.endDate);
                const invoiceDate = dayjs(invoice.generationDate);

                if (
                    !invoiceDate.isAfter(startDate, "day") &&
                    !invoiceDate.isSame(startDate, "day")
                ) {
                    return false;
                }

                if (
                    !invoiceDate.isBefore(endDate, "day") &&
                    !invoiceDate.isSame(endDate, "day")
                ) {
                    return false;
                }
            }

            // Filter by search query
            if (filters.searchQuery) {
                const query = filters.searchQuery.toLowerCase();
                const invoiceNumber = invoice.invoiceNumber.toLowerCase();
                const customerName = invoice.customerDetails.name.toLowerCase();
                const amount = invoice.amount.toString();

                if (
                    !invoiceNumber.includes(query) &&
                    !customerName.includes(query) &&
                    !amount.includes(query)
                ) {
                    return false;
                }
            }

            return true;
        });
    }

    /**
     * Helper method to simulate network delay
     * @param ms Milliseconds to delay
     * @returns Promise that resolves after the delay
     */
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Create a singleton instance
const mockDataService = new MockDataService();
export default mockDataService;
