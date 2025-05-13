import { newInvoiceStore } from "@/stores/newInvoiceStore";
import { ProductOption } from "@/types/component";
import { InvoiceItem } from "@/types/component";
import { Product } from "@/types/model";
import { calculateProductPrice } from "./billGenerationHelpers";

const productNameHelper = (product: any) => {
    if (!product) {
        return "";
    }
    // Format the expiry date to show month and year
    const expiryDate = product.expiryDate
        ? new Date(product.expiryDate)
        : null;
    const expiryDateStr = expiryDate
        ? `${expiryDate.getMonth() + 1}/${expiryDate.getFullYear()}`
        : "";

    return `${product.name} - ${expiryDateStr}`;
};

export const getProductsAsOptions = (products: Product[]): ProductOption[] => {
    return products.map(product => ({
        value: product.id.toString(),
        label: productNameHelper(product),
        customValue: product,
    }));
};

export const generateInvoiceItem = (): InvoiceItem => {
    return {
        ...newInvoiceStore.productData!,
        price: calculateProductPrice(),
    };
};

export const addItemToInvoice = () => {
    const newItem = generateInvoiceItem();
    newInvoiceStore.setInvoiceData({
        ...newInvoiceStore.invoiceData,
        items: [...newInvoiceStore.invoiceData.items, newItem],
    });
    newInvoiceStore.setProductData(null);
};

export const removeItemFromInvoice = (item: InvoiceItem) => {
    newInvoiceStore.setInvoiceData({
        ...newInvoiceStore.invoiceData,
        items: newInvoiceStore.invoiceData.items.filter(
            invoiceItem => invoiceItem.id !== item.id
        ),
    });
};
