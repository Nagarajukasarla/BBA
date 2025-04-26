import { useState } from "react";
import { InvoiceData, ProductData, ProductOption, InvoiceItem } from "@/types/component";
import { Customer, Product } from "@/types/model";
import customerService from "@/services/api/customerService";
import productService from "@/services/api/productService";
import APIResponse from "@/classes/APIResponse";
import CustomerHelper from "@/classes/helpers/CustomerHelper";
import { getProductsAsOptions } from "@/pages/newInvoice/uiHelpers";

export const useInvoiceState = () => {
    const [invoiceData, setInvoiceData] = useState<InvoiceData>({
        customer: null,
        paymentMode: "",
        items: [],
    });
    const [productData, setProductData] = useState<ProductData | null>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [customersAsOptions, setCustomersAsOptions] = useState<
        Array<{ value: string; label: string; customValue: any }>
    >([]);
    const [productsAsOptions, setProductsAsOptions] = useState<ProductOption[]>([]);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [discount, setDiscount] = useState<number>(0);

    // Data Fetching Methods
    const fetchCustomers = async (): Promise<string> => {
        try {
            const response = await customerService.fetchLiteCustomers();
            if (response.code === APIResponse.SUCCESS && response.data) {
                if (response.data.length === 0) {
                    return Promise.reject("No Customers found");
                }

                const customers = response.data.map(customer => ({
                    id: customer.id,
                    customerNumber: customer.number,
                    customerName: customer.name,
                    addressDto: { city: customer.address },
                }));
                const customerOptions = CustomerHelper.getCustomerAsOptions({
                    customers,
                    addAllOption: false,
                });
                setCustomersAsOptions(customerOptions);
                return "Success";
            } else if (response.code === APIResponse.INTERNAL_SERVER_ERROR) {
                // Call a separate service to log it on server console for maintaince
                return Promise.reject("Internal Server Error");
            } else if (response.code === APIResponse.NOT_FOUND) {
                // Call a separate service to log it on server console for maintaince
                return Promise.reject("Content Not Found");
            }
            return Promise.reject("Unexpected response");

        } catch (error) {
            // Call a separate service to log it on server console for maintaince
            console.log("Type of error :", typeof (error))
            return Promise.reject("Network Error or Something went wrong");
        }
    };

    const fetchProducts = async (): Promise<string> => {
        try {
            const response = await productService.fetchProducts();
            if (response.code === APIResponse.SUCCESS && response.data) {
                if (response.data.length === 0) {
                    return Promise.reject("No Products found");
                }

                const productOptions = getProductsAsOptions(response.data);
                setProductsAsOptions(productOptions);
                return "Success";
            } else if (response.code === APIResponse.INTERNAL_SERVER_ERROR) {
                // Call a separate service to log it on server console for maintaince
                return Promise.reject("Internal Server Error");
            } else if (response.code === APIResponse.NOT_FOUND) {
                // Call a separate service to log it on server console for maintaince
                return Promise.reject("Content Not Found");
            }
            return Promise.reject("Unexpected response");
        } catch (error) {
            // Call a separate service to log it on server console for maintaince
            console.log("Type of error :", typeof (error))
            return Promise.reject("Network Error or Something went wrong");
        }
    };

    const fetchSelectedCustomer = async (value: number): Promise<string> => {
        try {
            const response = await customerService.fetchCustomerById(value);
            if (response.code === APIResponse.SUCCESS && response.data) {
                setSelectedCustomer(response.data);
                return "Success";
            } else if (response.code === APIResponse.INTERNAL_SERVER_ERROR) {
                // Call a separate service to log it on server console for maintaince
                return Promise.reject("Internal Server Error");
            } else if (response.code === APIResponse.NOT_FOUND) {
                // Call a separate service to log it on server console for maintaince
                return Promise.reject("Content Not Found");
            }
            return Promise.reject("Unexpected response");
        } catch (error) {
            // Call a separate service to log it on server console for maintaince
            console.log("Type of error :", typeof (error));
            return Promise.reject("Network Error or Something went wrong");
        }
    };

    const checkDisability = () => {
        return invoiceData?.items?.length < 1;
    };

    return {
        // State
        invoiceData,
        setInvoiceData,
        productData,
        setProductData,
        selectedCustomer,
        setSelectedCustomer,
        customersAsOptions,
        setCustomersAsOptions,
        productsAsOptions,
        setProductsAsOptions,
        similarProducts,
        setSimilarProducts,
        discount,
        setDiscount,

        // Data Fetching Methods
        fetchCustomers,
        fetchSelectedCustomer,
        fetchProducts,

        // Utility Methods
        checkDisability
    };
};

export const setInvoiceDataToLocalStorage = (
    invoiceData: InvoiceData
): void => {
    if (
        invoiceData &&
        invoiceData.items.length > 0 &&
        invoiceData.customer &&
        invoiceData.paymentMode
    ) {
        const invoiceObjectInJson = JSON.stringify(invoiceData);
        localStorage.setItem("invoice", invoiceObjectInJson);
    }
};

/**
 * Adds an item to the invoice data.
 *
 * @param {InvoiceData} invoiceData - The current invoice data
 * @param {InvoiceItem} item - The item to add to the invoice
 * @returns {InvoiceData} The updated invoice data
 */
export const addItemToInvoice = (
    invoiceData: InvoiceData,
    item: InvoiceItem
): InvoiceData => {
    if (!item) return invoiceData;

    const updatedInvoiceData = {
        ...invoiceData,
        items: [...invoiceData.items, item],
    };

    // Save to local storage
    setInvoiceDataToLocalStorage(updatedInvoiceData);

    return updatedInvoiceData;
};

/**
 * Retrieves invoice data from local storage.
 *
 * @returns {InvoiceData | null} The retrieved invoice data or null if not found
 */
export const retrieveInvoiceDataFromLocalStorage = (): InvoiceData | null => {
    const invoiceInJSON = localStorage.getItem("invoice");
    if (!(invoiceInJSON === "null" || invoiceInJSON === null)) {
        try {
            const retrievedInvoice = JSON.parse(invoiceInJSON) as InvoiceData;
            return retrievedInvoice;
        } catch (error) {
            console.error(
                "Error parsing invoice data from localStorage:",
                error
            );
            return null;
        }
    }
    return null;
};

/**
 * Calculate amount with discount
 *
 * @param {number} quantity - The quantity of the product
 * @param {number} rate - The rate of the product
 * @param {number} discountPercent - The discount percentage
 * @returns {number} The calculated amount after discount
 */
export const calculateAmount = (
    quantity: number,
    rate: number,
    discountPercent: number
): number => {
    const subtotal = quantity * rate;
    const discountAmount = (subtotal * discountPercent) / 100;
    return subtotal - discountAmount;
};

/**
 * Generate invoice item with calculated amount
 *
 * @param {ProductData} productData - The product data
 * @param {number} discount - The discount percentage
 * @param {number} itemCount - The current count of items in the invoice
 * @returns {InvoiceItem} The generated invoice item
 */
export const generateInvoiceItem = (
    productData: ProductData,
    discount: number,
    itemCount: number
): InvoiceItem => {
    if (!productData) {
        throw new Error("Product data is required");
    }

    return {
        ...productData,
        serialNumber: itemCount + 1,
        discount: discount,
        amount: calculateAmount(
            productData.quantity,
            productData.rate,
            discount
        ),
    } as InvoiceItem;
};

/**
 * Validate customer selection
 *
 * @param {Customer | null} customer - The selected customer
 * @returns {{ isValid: boolean; errorMessage?: string }} Validation result
 */
export const validateCustomerSelection = (
    customer: Customer | null
): {
    isValid: boolean;
    errorMessage?: string;
} => {
    if (!customer) {
        return {
            isValid: false,
            errorMessage: "Please select a customer first",
        };
    }
    return { isValid: true };
};

/**
 * Validate payment mode selection
 *
 * @param {string} paymentMode - The selected payment mode
 * @returns {{ isValid: boolean; errorMessage?: string }} Validation result
 */
export const validatePaymentModeSelection = (
    paymentMode: string
): {
    isValid: boolean;
    errorMessage?: string;
} => {
    if (!paymentMode) {
        return {
            isValid: false,
            errorMessage: "Please select a payment mode first",
        };
    }
    return { isValid: true };
};

/**
 * Validate all product fields before adding to invoice
 *
 * @param {ProductData | null} productData - The product data to validate
 * @returns {{ isValid: boolean; errorMessage?: string }} Validation result
 */
export const validateProductFields = (
    productData: ProductData | null
): {
    isValid: boolean;
    errorMessage?: string;
} => {
    // Check if product is selected
    if (!productData) {
        return { isValid: false, errorMessage: "Please select a product" };
    }

    // Check quantity
    if (!productData.quantity || productData.quantity <= 0) {
        return {
            isValid: false,
            errorMessage: "Quantity must be greater than 0",
        };
    }

    // Check rate
    if (!productData.rate || productData.rate <= 0) {
        return {
            isValid: false,
            errorMessage: "Rate must be greater than 0",
        };
    }

    // Check MRP
    if (!productData.mrp || productData.mrp <= 0) {
        return {
            isValid: false,
            errorMessage: "MRP must be greater than 0",
        };
    }

    // All validations passed
    return { isValid: true };
};
