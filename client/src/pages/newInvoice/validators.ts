// Validate all fields before adding to invoice

import { useInvoiceState } from "@/states/invoiceState";

export const checkDisabilityForReset = () => {
    const { invoiceData } = useInvoiceState();

    return (
        invoiceData?.items?.length < 1 &&
        invoiceData?.customer === null &&
        (invoiceData?.paymentMode === undefined ||
            invoiceData?.paymentMode === "")
    );
};

export const validateCustomerSelection = () => {
    const { invoiceData } = useInvoiceState();

    if (!invoiceData.customer) {
        return {
            isValid: false,
            errorMessage: "Please select a customer"
        };
    }
    return { isValid: true };
};

export const validatePaymentModeSelection = () => {
    const { invoiceData } = useInvoiceState();

    if (!invoiceData.paymentMode) {
        return {
            isValid: false,
            errorMessage: "Please select a payment mode first"
        };
    }
    return { isValid: true };
};
