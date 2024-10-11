import { getStatus } from "../statusUtils/responseStatus";
import { apiUrl } from "../../../config";
import APIResponse from "../statusUtils/APIResponse";
import TokenManager from "../../cookies/TokenManager";

/**
 * Create a new company using the provided token and company name.
 *
 * @param {string} token - The authentication token.
 * @param {string} companyName - The name of the company to be created.
 * @return {Promise<boolean>} Returns true if the company is successfully created, otherwise false.
 */
export const createCompany = async (companyName) => {
    const token = TokenManager.getToken();
    const shopId = TokenManager.getShopId();
    try {
        const response = await fetch(`${apiUrl}/api/v1/company/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: companyName,
                shopId: shopId,
            }),
        });

        if (!response.ok) {
            return new APIResponse(response.status, null);
        }

        const data = await response.json();
        return new APIResponse(response.status, data);
    } catch (error) {
        if (error.name === 'TypeError') {
            return new APIResponse(-1, null);
        } else {
            return new APIResponse(APIResponse.INTERNAL_SERVER_ERROR, null);
        }
    }
};


/**
 * Retrieves a product from the API using the provided product name and token.
 *
 * @param {string} productName - The name of the product to retrieve
 * @param {string} token - The authentication token
 * @return {Promise} The product data retrieved from the API
 */
export const getProduct = async (productName, token) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/product/get`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: productName,
            }),
        });

        if (!response.ok) {
            const errorMessage = await getStatus(response.status);
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        if (error.name === "TypeError") {
            console.error("Network error or request was blocked:", error);
        } else {
            console.error(`Error while fetching product: ${error.message}`);
        }
        throw error; // rethrow the error to propagate it to the caller
    }
};

/**
 * Save customer data to the server.
 *
 * @param {Object} customer - The customer object containing name, email, phone, createdDate, and addressDto
 * @param {string} token - The authentication token
 * @return {boolean|Error} - Returns true if the customer data is saved successfully, otherwise returns an Error object
 */
export const saveCustomer = async (customer, token) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/customer/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                createdDate: customer.createdDate,
                addressDto: customer.address,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error("Error in saving customer ", errorData);
        }

        const data = await response.json();
        console.log(data);
        return true;
    } catch (error) {
        if (error.name === "TypeError") {
            console.error("Network error or request was blocked:", error);
        } else {
            console.error(`Error while saving new customer: ${error}`);
        }
        return error;
    }
};

/**
 * Function to create an invoice using the provided data and authorization token.
 *
 * @param {Object} invoice - The invoice object containing customer number, payment mode, generation date, items, and amount.
 * @param {string} token - The authorization token for the API request.
 * @return {Object|boolean} - The saved invoice data if successful, or false if there was an error.
 */
export const createInvoice = async (invoice, token) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/invoice/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                customerNumber: invoice.customerNumber,
                paymentMode: invoice.paymentMode,
                generationDate: invoice.currentDateTime,
                items: invoice.items,
                amount: invoice.amount,
            }),
        });

        if (!response.ok) {
            return await getStatus(response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error.name === "TypeError") {
            console.error("Network error or request was blocked:", error);
        } else {
            console.error(`Error in saving new invoice: ${error.message}`);
        }
        return false;
    }
};

/**
 * Retrieves filtered invoices from the API based on the provided filters and authentication token.
 *
 * @param {string} token - The authentication token.
 * @param {Object} filters - The filters to apply to the invoice search.
 * @param {string} [filters.customerNumber] - The customer number to filter by.
 * @param {string} [filters.paymentMode] - The payment mode to filter by.
 * @param {string} [filters.status] - The status to filter by.
 * @param {Object} [filters.dateRange] - The date range to filter by.
 * @return {Promise<Object|boolean>} - The filtered invoice data if successful, or false if there was an error.
 */
export const getFilteredInvoices = async (token, filters) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/invoice/get-filtered`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                customerNumber: filters?.customerNumber ?? null,
                paymentMode: filters?.paymentMode ?? null,
                status: filters?.status ?? null,
                startDate: filters?.dateRange?.startDate ?? null,
                endDate: filters?.dateRange?.endDate ?? null,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
            // const errorMessage = await getStatus(response.status);
            // console.error(`No filtered invoices found: ${errorMessage}`);
            // return false;
        }
    } catch (error) {
        if (error.name === "TypeError") {
            console.error(`Network error or request was blocked:`, error);
        } else {
            console.error(`Error occurred while filtering invoices: ${error.message}`);
        }
        return false;
    }
};


export const saveInvoiceWithItems = async (shopId, token, {
    invoiceNumber,
    customer,
    paymentMode,
    billedDate,
    dueDate,
    generationDate,
    items
}) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/invoice/save-invoice-with-items`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                shopId: shopId,
                invoiceNumber: invoiceNumber,
                customerNumber: customer.customerNumber,
                paymentMode: paymentMode,
                billedDate: billedDate,
                dueDate: dueDate,
                generationDate: generationDate,
                items: items
            })
        });

        if (!response.ok) {
            return new APIResponse(response.status, null);
        }
        
        const data = response.json();
        return new APIResponse(response.status, data);

    } catch (error) {
        if (error.name === 'TypeError') {
            return new APIResponse(-1, null);
        } else {
            return new APIResponse(APIResponse.INTERNAL_SERVER_ERROR, null);
        }
    }
};
