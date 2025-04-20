interface FieldConfig {
    id: string;
    next: string;
    type: 'input' | 'select' | 'date';
    validation?: (value: any) => boolean;
}

export const INVOICE_FIELD_CONFIG: Record<string, FieldConfig> = {
    productSearch: {
        id: 'productSearch',
        next: 'companyField',
        type: 'select'
    },
    companyField: {
        id: 'companyField',
        next: 'quantityField',
        type: 'input'
    },
    quantityField: {
        id: 'quantityField',
        next: 'packingTypeField',
        type: 'input',
        validation: (value) => !isNaN(value) && value > 0
    },
    packingTypeField: {
        id: 'packingTypeField',
        next: 'manufacturingDateField',
        type: 'input'
    },
    manufacturingDateField: {
        id: 'manufacturingDateField',
        next: 'expiryDateField',
        type: 'date'
    },
    expiryDateField: {
        id: 'expiryDateField',
        next: 'sGstField',
        type: 'date'
    },
    sGstField: {
        id: 'sGstField',
        next: 'cGstField',
        type: 'input',
        validation: (value) => !isNaN(value) && value >= 0
    },
    cGstField: {
        id: 'cGstField',
        next: 'iGstField',
        type: 'input',
        validation: (value) => !isNaN(value) && value >= 0
    },
    iGstField: {
        id: 'iGstField',
        next: 'discountField',
        type: 'input',
        validation: (value) => !isNaN(value) && value >= 0
    },
    discountField: {
        id: 'discountField',
        next: 'mrpField',
        type: 'input',
        validation: (value) => !isNaN(value) && value >= 0
    },
    mrpField: {
        id: 'mrpField',
        next: 'rateField',
        type: 'input',
        validation: (value) => !isNaN(value) && value > 0
    },
    rateField: {
        id: 'rateField',
        next: 'addButton',
        type: 'input',
        validation: (value) => !isNaN(value) && value > 0
    }
};

export const handleFieldNavigation = (event: React.KeyboardEvent, currentFieldId: string) => {
    if (event.key !== 'Enter') return;

    const currentField = INVOICE_FIELD_CONFIG[currentFieldId];
    if (!currentField) return;

    // Get the value for validation
    const value = (event.target as HTMLInputElement).value;
    
    // Check validation if exists
    if (currentField.validation && !currentField.validation(value)) {
        // Optionally show error or handle invalid input
        return;
    }

    // Focus next field
    const nextElement = document.getElementById(currentField.next);
    if (nextElement) {
        if (currentField.type === 'select') {
            (nextElement as HTMLSelectElement).focus();
        } else {
            (nextElement as HTMLInputElement).select();
        }
    }
};
