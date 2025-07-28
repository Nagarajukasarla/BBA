import { newInvoiceStore } from "@/stores/newInvoiceStore";
import { CSelectOption } from "@/types/core";
import { Product } from "@/types/model";
import { addItemToInvoice } from "./helpers";
import {
    validateCustomerSelection,
    validatePaymentModeSelection,
    validateProductFields,
} from "./validators";

export const findSimilarProducts = (
    productName: string,
    allProducts: Product[]
): Product[] => {
    if (!productName || !allProducts.length) return [];

    return allProducts.filter(
        product => product.name.toLowerCase() === productName.toLowerCase()
    );
};

// Handle product selection from dropdown
export const handleProductSelect = (selectedOption: CSelectOption<Product>) => {

    if (!selectedOption?.customValue) return;

    if (!validateCustomerSelection()) {
        // showMessage("warning", "Please select a customer first");
        return;
    }

    if (!validatePaymentModeSelection()) {
        // showMessage("warning", "Please select a payment mode first");
        return;
    }

    const selectedProduct = selectedOption.customValue;
    const allProducts = newInvoiceStore.productsAsOptions.map(option => option.customValue);
    const similar = findSimilarProducts(selectedProduct.name, allProducts);

    newInvoiceStore.setSimilarProducts(similar);
    newInvoiceStore.setModalVisible(true);
};

// Handle final product selection (from modal or direct)
export const handleFinalProductSelection = (product: Product) => {
    // First close the modal to prevent focus issues
    newInvoiceStore.setModalVisible(false);

    // Create a variable to track if we need to focus
    const needToFocus = !newInvoiceStore.productData || newInvoiceStore.productData.id !== product.id;

    // Then update the product data with cleared quantity
    newInvoiceStore.setProductData({
        ...product,
        discount: 0,
        quantity: 0,
    });

    // Only focus if this is a new product selection
    if (needToFocus) {
        // Use a longer timeout to ensure DOM updates are complete
        setTimeout(() => {
            const quantityField = document.getElementById("quantityField");
            if (quantityField) {
                // Focus and select the quantity field
                (quantityField as HTMLInputElement).focus();
                (quantityField as HTMLInputElement).select();

                // Create a more robust focus management approach
                // Set up multiple attempts to ensure focus stays on quantity field
                const focusAttempts = [100, 300, 600, 1000];

                focusAttempts.forEach(delay => {
                    setTimeout(() => {
                        if (document.activeElement !== quantityField) {
                            (quantityField as HTMLInputElement).focus();
                            (quantityField as HTMLInputElement).select();
                        }
                    }, delay);
                });
            }
        }, 200);
    }
};

/**
 * An onClick event handler for adding a new item to the invoice.
 *
 * @return {boolean}
 */
export const onClickAddButton = (): boolean => {
    console.log("Clicked Add Button");
    
    // Clear any previous errors
    newInvoiceStore.clearInvalidProductFieldError();
    
    // Check if a product is selected
    if (!newInvoiceStore.productData) {
        console.log("No product selected, cannot add to invoice");
        return false;
    }
    
    // Validate the product fields
    if (validateProductFields()) {
        addItemToInvoice();
        return true;
    } else {
        console.log("Product validation failed");
        return false;
    }
};
