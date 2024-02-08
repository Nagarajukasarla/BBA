import { getStatus } from "../statusUtils/responseStatus";

/* Saving new company */
export const createCompany = async (token, companyName) => {
    try {
        const response = await fetch(
            "https://noble-airport-411617.uw.r.appspot.com/api/v1/company/save",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: companyName,
                }),
            }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return true;
        } else {
            // HANDLE ERROR based response status, before fix GITHUB_ISSUE #12
            return false;
        }
    } catch (error) {
        console.error(`Error while saving new company ${error}`);
        return false;
    }
};

/* Saving new product */
export const saveProduct = async (product, token) => {
    try {
        const response = fetch(
            "https://noble-airport-411617.uw.r.appspot.com/api/v1/product/save",
            {
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
            }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return true;
        } else {
            // HANDLE ERROR based response status, before fix GITHUB_ISSUE #12
            return false;
        }
    } catch (error) {
        throw new Error(`Error in saving prouct: ${error}`);
    }
};

/* Fetching product */

export const getProduct = async (productName, token) => {
    try {
        const response = await fetch(
            "https://noble-airport-411617.uw.r.appspot.com/api/v1/product/get",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: productName,
                }),
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            throw new Error(getStatus(response.status));
        }
    } catch (error) {
        throw new Error(`Error while fetching product: ${error}`);
    }
};

// Saving new Customer
export const saveCustomer = async (customer, token) => {
    try {
        const response = await fetch(
            "https://noble-airport-411617.uw.r.appspot.com/api/v1/customer/save",
            {
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
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return true;
        } else {
            throw new Error(getStatus(response.status));
        }
    } catch (error) {
        console.error(`Error while saving new customer: ${error}`);
        return error;
    }
};

/**
 * Saves a new invoice.
 *
 * @return {Promise<void>} Returns a promise that resolves when the new invoice is saved.
 */
export const createInvoice = async (invoice, token) => {
    try {
        const response = await fetch(
            "https://noble-airport-411617.uw.r.appspot.com/api/v1/invoice/save",
            {
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
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return true;
        } else {
            return new Error(getStatus(response.status));
        }
    } catch (error) {
        throw new Error(`Error in saving new invoice ${error}`);
    }
};
