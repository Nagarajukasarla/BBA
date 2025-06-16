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
        next: "quantityField",
        type: "select",
    },
    companyField: {
        id: "companyField",
        next: "quantityField",
        type: "input",
    },
    quantityField: {
        id: "quantityField",
        next: "rateField",
        type: "input",
        validation: value => !isNaN(value) && value > 0,
    },
    packingTypeField: {
        id: "packingTypeField",
        next: "quantityField",
        type: "input",
    },
    manufacturingDateField: {
        id: "manufacturingDateField",
        next: "quantityField",
        type: "date",
    },
    expiryDateField: {
        id: "expiryDateField",
        next: "quantityField",
        type: "date",
    },
    sGstField: {
        id: "sGstField",
        next: "quantityField",
        type: "input",
        validation: value => !isNaN(value) && value >= 0,
    },
    cGstField: {
        id: "cGstField",
        next: "quantityField",
        type: "input",
        validation: value => !isNaN(value) && value >= 0,
    },
    iGstField: {
        id: "iGstField",
        next: "quantityField",
        type: "input",
        validation: value => !isNaN(value) && value >= 0,
    },
    rateField: {
        id: "rateField",
        next: "mrpField",
        type: "input",
        validation: value => !isNaN(value) && value > 0,
    },
    mrpField: {
        id: "mrpField",
        next: "discountField",
        type: "input",
        validation: value => !isNaN(value) && value > 0,
    },
    discountField: {
        id: "discountField",
        next: "addButton",
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
        if(onClickAddButton()) {
            const productField = INVOICE_FIELD_CONFIG.productSearch;
            const productFieldElement = document.getElementById(productField.id);
            if(productFieldElement) {
                (productFieldElement as HTMLInputElement).focus();
            }
        }
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

export const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    fieldId: string
) => {
    handleFieldNavigation(e, fieldId);
};