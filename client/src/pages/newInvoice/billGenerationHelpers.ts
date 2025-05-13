import { newInvoiceStore } from "@/stores/newInvoiceStore";

export const calculateProductPrice = (): number => {
    const quantity = newInvoiceStore.productData?.quantity!;
    const rate = newInvoiceStore.productData?.rate!;
    const discountPercent = newInvoiceStore.invoiceData?.customer?.defaultDiscount!;
    const subtotal = quantity * rate;
    const discountAmount = (subtotal * discountPercent) / 100;

    return subtotal - discountAmount;
};


export const calculateTotalAmountOfInvoice = (): number => {
    if (!newInvoiceStore.invoiceData?.items) return 0;
    return newInvoiceStore.invoiceData?.items?.reduce((total, item) => total + item.price, 0);
}
