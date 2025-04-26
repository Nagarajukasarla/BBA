 // Calculate amount with discount
 const calculateAmount = (
    quantity: number,
    rate: number,
    discountPercent: number
): number => {
    const subtotal = quantity * rate;
    const discountAmount = (subtotal * discountPercent) / 100;
    return subtotal - discountAmount;
};

// Generate invoice item with calculated amount
const generateInvoiceItem = (): InvoiceItem => {
    if (!productData) {
        throw new Error("Product data is required");
    }

    return {
        ...productData,
        serialNumber: invoiceData?.items?.length + 1,
        discount: discount,
        amount: calculateAmount(
            productData.quantity,
            productData.rate,
            discount
        ),
    } as InvoiceItem;
};