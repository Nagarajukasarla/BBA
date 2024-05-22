import { getStatus } from "../statusUtils/responseStatus";
import { apiUrl } from "../../../config";

// Validating user
export const authenticate = async (token) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/demo-controller`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return true;
        }
        else {
            console.log(`Authentication response status ${response.status}`);
            if (response.status === 500) {
                alert("Internal Server Error");
                return false;
            }
        }
    }
    catch (error) {
        if (error.message.includes("ERR_CONNECTION_REFUSED")) {
            return false;
        }
    }
};

export const getAllProducts = async (token) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/product/get-items`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw new Error(getStatus(response.status));
        }
    }
    catch (error) {
        throw error;
    }
};


export const getAllCustomers  = async (token) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/customer/get-all`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw new Error(getStatus(response.status));
        }
    }
    catch (error) {
        throw error;
    }
};

/**
 * Each invoice item contains
 * - id
 * - invoiceNumber
 * - customerNumber
 * - customerName
 * - area
 * - city
 * - state
 * - generationDate
 * - amount
 * - paymentMode
 * - status
 * - CustomerAddress :
 *      - customerNumber
 *      - area
 *      - city
 *      - state
 * @param {String} token 
 * @returns {Array}
 */

export const getAllInvoices = async (token) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/invoice/get-all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw new Error(getStatus(response.status));
        }
    }
    catch (error) {
        throw error;
    }
};