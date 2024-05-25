import { getStatus } from "../statusUtils/responseStatus";
import { apiUrl } from "../../../config";

/**
 * Create a new company using the provided token and company name.
 *
 * @param {string} token - The authentication token.
 * @param {string} companyName - The name of the company to be created.
 * @return {Promise<boolean>} Returns true if the company is successfully created, otherwise false.
 */
export const createCompany = async (token, companyName) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/company/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: companyName,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(
                `Server responded with an error: ${errorData.message}`
            );
            return false;
        }

        const data = await response.json();
        console.log(data);
        return true;
    } catch (error) {
        if (error.name === "TypeError") {
            console.error(
                "Network error or resource unavailable. Please check your internet connection."
            );
        } else {
            console.error(
                `Unexpected error while saving new company: ${error}`
            );
        }
        return false;
    }
};

/**
 * Saves a product using the provided product data and authorization token.
 *
 * @param {object} product - The product data to be saved
 * @param {string} token - The authorization token
 * @return {boolean} Whether the product was successfully saved
 */
export const saveProduct = async (product, token) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/product/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: product.name,
                company: product.companyName,
                quantity: product.quantity,
                packingType: product.packingType,
                batchNumber: product.batchNumber,
                manufacturingDate: product.manufacturingDate,
                expiryDate: product.expiryDate,
                sGstInPercent: product.sGst,
                cGstInPercent: product.cGst,
                iGstInPercent: product.iGst,
                rate: product.rate,
                mrp: product.mrp,
                isFastMoving: false,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(
                `Server responded with an error: ${errorData.message}`
            );
            return false;
        }

        const data = await response.json();
        console.log(data);
        return true;
    } catch (error) {
        if (error.name === "TypeError") {
            console.error("Network error or request was blocked:", error);
        } else {
            console.error(`Error in saving product: ${error}`);
        }
        return false;
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
            const errorMessage = await getStatus(response.status);
            console.error(`Invoice not saved: ${errorMessage}`);
            return false;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        if (error.name === 'TypeError') {
            console.error('Network error or request was blocked:', error);
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
 * @param {Array} [filters.dateRange] - The date range to filter by.
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
        if (error.name === 'TypeError') {
            console.error('Network error or request was blocked:', error);
        } else {
            console.error(`Error occurred while filtering invoices: ${error.message}`);
        }
        return false;
    }
};
