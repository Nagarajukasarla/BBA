import { newInvoiceStore } from "@/stores/newInvoiceStore";

type PricedItem = {
    quantity: number;
    rate: number;
    discount?: number;
}

export const calculateProductPrice = (item: PricedItem): number => {
    const quantity = item.quantity;
    const rate = item.rate;
    const discountPercent = item.discount || 0;
    const subtotal = quantity * rate;
    const discountAmount = (subtotal * discountPercent) / 100;
    return subtotal - discountAmount;
};

export const calculateTotalAmountOfInvoice = (): number => {
    if (!newInvoiceStore.invoiceData?.items) return 0;
    return newInvoiceStore.invoiceData?.items?.reduce((total, item) => total + item.price, 0);
}
