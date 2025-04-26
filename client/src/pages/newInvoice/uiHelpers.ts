import { ProductOption } from "@/types/component";
import { Product } from "@/types/model";

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