import { newInvoiceStore } from "@/stores/newInvoiceStore";
import { InvoiceData } from "@/types/component";

export const checkDisabilityForReset = () => {
    return (
        newInvoiceStore.invoiceData?.items?.length < 1 &&
        newInvoiceStore.invoiceData?.customer === null &&
        (newInvoiceStore.invoiceData?.paymentMode === undefined ||
            newInvoiceStore.invoiceData?.paymentMode === "")
    );
};

export const validateCustomerSelection = () => {
    return newInvoiceStore.invoiceData?.customer;
};

export const validatePaymentModeSelection = () => {
    return newInvoiceStore.invoiceData?.paymentMode;
};

export const checkDisability = () => {
    return newInvoiceStore.invoiceData?.items?.length < 1;
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
 * Validates the product fields before adding to invoice.
 *
 * @returns {boolean} True if all product fields are valid, false otherwise
 */
export const validateProductFields = (): boolean => {
    console.log("Validating Product Fields");
    const productData = newInvoiceStore.productData;
    
    // Clear previous errors
    newInvoiceStore.clearInvalidProductFieldError();
    
    // If no product is selected, don't show validation errors but return false
    if (!productData) {
        newInvoiceStore.setInvalidProductFieldError([
            "product",
            "quantity",
            "freeQuantity",
            "packingType",
            "manufacturingDate",
            "expiryDate",
            "sGst",
            "cGst",
            "iGst",
            "rate",
            "mrp",
        ]);
        return false;
    }

    // Now validate the selected product's fields
    let isValid = true;

    if (!productData.quantity || productData.quantity <= 0) {
        newInvoiceStore.addInvalidProductFieldError("quantity");
        isValid = false;
    }

    if (!productData.rate || productData.rate <= 0) {
        newInvoiceStore.addInvalidProductFieldError("rate");
        isValid = false;
    }

    if (!productData.mrp || productData.mrp <= 0) {
        newInvoiceStore.addInvalidProductFieldError("mrp");
        isValid = false;
    }
    
    return isValid;
};
