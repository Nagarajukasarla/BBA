import { InvoiceData, ProductData, ProductOption } from "@/types/component";

export const findSimilarProducts = (
    productName: string,
    allProducts: any[]
): ProductData[] => {
    if (!productName || !allProducts.length) return [];

    return allProducts.filter(
        product => product.name.toLowerCase() === productName.toLowerCase()
    );
};

// Handle product selection from dropdown
export const handleProductSelect = (
    selectedOption: ProductOption,
    invoiceData: InvoiceData,
    productsAsOptions: ProductOption[],
    setSimilarProducts: Dispatch<SetStateAction<ProductData[]>>,
    setModalVisible: Dispatch<SetStateAction<boolean>>,
    handleFinalProductSelection: (product: ProductData) => void
) => {
    if (!selectedOption?.customValue) return;

    // Validate customer selection first
    const customerValidation = validateCustomerSelection(invoiceData.customer);
    if (!customerValidation.isValid) {
        showMessage("warning", customerValidation.errorMessage || "");
        return;
    }

    // Validate payment mode selection
    const paymentValidation = validatePaymentModeSelection(
        invoiceData.paymentModeValue
    );
    if (!paymentValidation.isValid) {
        showMessage("warning", paymentValidation.errorMessage || "");
        return;
    }

    const selectedProduct = selectedOption.customValue;
    const allProducts = productsAsOptions.map(option => option.customValue);
    const similar = findSimilarProducts(selectedProduct.name, allProducts);

    // Always show modal, even for a single product
    if (similar.length >= 1) {
        setSimilarProducts(similar);
        setModalVisible(true);
    } else {
        // Fallback in case no similar products found (shouldn't happen)
        handleFinalProductSelection(selectedProduct);
    }
};

// Handle final product selection (from modal or direct)
export const handleFinalProductSelection = (
    product: ProductData,
    productData: ProductData | null,
    setProductData: Dispatch<SetStateAction<ProductData | null>>,
    setModalVisible: Dispatch<SetStateAction<boolean>>
) => {
    // First close the modal to prevent focus issues
    setModalVisible(false);

    // Create a variable to track if we need to focus
    const needToFocus = !productData || productData.id !== product.id;

    // Then update the product data with cleared quantity
    setProductData({
        ...product,
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
 * @return {void}
 */
export const onClickAddButton = (
    invoiceData: InvoiceData,
    productData: ProductData | null,
    discount: number,
    setInvoiceData: Dispatch<SetStateAction<InvoiceData>>,
    resetProduct: () => void
): void => {
    // Validate customer selection first
    const customerValidation = validateCustomerSelection(invoiceData.customer);
    if (!customerValidation.isValid) {
        showMessage("warning", customerValidation.errorMessage || "");
        return;
    }

    // Validate payment mode selection
    const paymentValidation = validatePaymentModeSelection(
        invoiceData.paymentModeValue
    );
    if (!paymentValidation.isValid) {
        showMessage("warning", paymentValidation.errorMessage || "");
        return;
    }

    // Validate product fields
    const productValidation = validateProductFields(productData);
    if (!productValidation.isValid) {
        showMessage("warning", productValidation.errorMessage || "");
        return;
    }

    try {
        // Generate the invoice item
        const newItem = generateInvoiceItem(
            productData!,
            discount,
            invoiceData.items.length
        );

        // Add the item to the invoice
        setInvoiceData({
            ...invoiceData,
            items: [...invoiceData.items, newItem],
        });

        // Reset product data and focus on product search
        resetProduct();

        // Focus the product search dropdown
        const productSearchDropdown = document.getElementById("productSearch");
        productSearchDropdown?.focus();
    } catch (error) {
        showMessage(
            "error",
            error instanceof Error
                ? error.message
                : "Failed to generate invoice item"
        );
    }
};
