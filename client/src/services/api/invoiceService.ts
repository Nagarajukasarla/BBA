import APIResponse from "@/classes/APIResponse";
import DATA_ROUTES from "@/constants/dataRoutes";
import { Invoice } from "@/types/model";
import { InvoiceFilters } from "@/types/filters";
import BaseService from "@/services/api/baseService";
import { buildQueryString } from "@/utils/queryUtils";

class InvoiceService extends BaseService {
    /**
     * Fetches a list of invoices from the API
     * @returns A promise that resolves to an `APIResponse` containing an array of `Invoice` objects.
     */
    async fetchInvoices(): Promise<APIResponse<Invoice[]>> {
        // In development, this will use MockDataService via BaseService
        // In production, this will use the real API
        return this.get<Invoice[]>(DATA_ROUTES.FETCH_INVOICES);
    }

    /**
     * Fetches a filtered list of invoices from the API
     * @param filters The filters to apply
     * @returns A promise that resolves to an `APIResponse` containing an array of filtered `Invoice` objects.
     */
    async fetchFilteredInvoices(
        filters: InvoiceFilters
    ): Promise<APIResponse<Invoice[]>> {
        const queryString = buildQueryString(filters);
        const url = `${DATA_ROUTES.FETCH_INVOICES}${queryString}`;
        return this.get<Invoice[]>(url);
    }

    /**
     * Fetches a specific invoice by ID
     * @param id The invoice ID
     * @returns A promise that resolves to an `APIResponse` containing an `Invoice` object.
     */
    async fetchInvoiceById(id: number): Promise<APIResponse<Invoice>> {
        return this.get<Invoice>(`${DATA_ROUTES.FETCH_INVOICES}/${id}`);
    }
}

// Create a singleton instance
const invoiceService = new InvoiceService();
export default invoiceService;
