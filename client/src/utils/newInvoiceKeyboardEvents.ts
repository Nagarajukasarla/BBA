import { onClickAddButton } from "@/pages/newInvoice/handlers";

interface FieldConfig {
    id: string;
    next: string;
    type: "input" | "select" | "date";
    validation?: (value: any) => boolean;
}

export const INVOICE_FIELD_CONFIG: Record<string, FieldConfig> = {
    productSearch: {
        id: "productSearch",
        next: "quantityField", // Now directly goes to quantity after product selection
        type: "select",
    },
    companyField: {
        id: "companyField",
        next: "quantityField",
        type: "input",
    },
    quantityField: {
        id: "quantityField",
        next: "rateField", // Changed to go to rate field next
        type: "input",
        validation: value => !isNaN(value) && value > 0,
    },
    packingTypeField: {
        id: "packingTypeField",
        next: "quantityField", // Redirected but should be disabled
        type: "input",
    },
    manufacturingDateField: {
        id: "manufacturingDateField",
        next: "quantityField", // Redirected but should be disabled
        type: "date",
    },
    expiryDateField: {
        id: "expiryDateField",
        next: "quantityField", // Redirected but should be disabled
        type: "date",
    },
    sGstField: {
        id: "sGstField",
        next: "quantityField", // Redirected but should be disabled
        type: "input",
        validation: value => !isNaN(value) && value >= 0,
    },
    cGstField: {
        id: "cGstField",
        next: "quantityField", // Redirected but should be disabled
        type: "input",
        validation: value => !isNaN(value) && value >= 0,
    },
    iGstField: {
        id: "iGstField",
        next: "quantityField", // Redirected but should be disabled
        type: "input",
        validation: value => !isNaN(value) && value >= 0,
    },
    rateField: {
        id: "rateField",
        next: "mrpField", // Changed order: rate -> mrp -> discount
        type: "input",
        validation: value => !isNaN(value) && value > 0,
    },
    mrpField: {
        id: "mrpField",
        next: "discountField", // Changed order
        type: "input",
        validation: value => !isNaN(value) && value > 0,
    },
    discountField: {
        id: "discountField",
        next: "addButton", // Final field before adding
        type: "input",
        validation: value => !isNaN(value) && value >= 0,
    },
};

export const handleFieldNavigation = (
    event: React.KeyboardEvent,
    currentFieldId: string
) => {
    if (event.key !== "Enter") return;

    // Prevent default to stop form submission
    event.preventDefault();
    event.stopPropagation();

    const currentField = INVOICE_FIELD_CONFIG[currentFieldId];
    if (!currentField) return;

    // Get the value for validation
    const value = (event.target as HTMLInputElement).value;

    // Check validation if exists
    if (currentField.validation && !currentField.validation(value)) {
        // Optionally show error or handle invalid input
        return;
    }

    // Special case for the discount field leading to add button
    if (currentField.next === "addButton") {
        // Call onClickAddButton directly once and return
        onClickAddButton();
        return;
    }

    // For other fields, focus the next element
    const nextElement = document.getElementById(currentField.next);
    if (nextElement) {
        if (currentField.type === "select") {
            (nextElement as HTMLSelectElement).focus();
        } else {
            (nextElement as HTMLInputElement).select();
        }
    }
};
