
export const onPressedProductNameHandler = (event , { batchNumberField }) => {
    if (event.key === 'Enter') {
        batchNumberField.focus();
    }
};

export const onPressedBatchNumberHandler = (event, { companyField }) => {
    if (event.key === 'Enter') {
        companyField.focus();
    }
};

export const onPressedCompanyHandler = (event, { packingTypeField }) => {
    if (event.key === 'Enter') {
        packingTypeField.focus();
    }
};

export const onPressedPackingTypeHandler = (event, { quantityField }) => {
    if (event.key === 'Enter') {
        quantityField.focus();
    }
};

export const onPressedQuantityHandler = (event, { manufacturingDateField }) => {
    if (event.key === 'Enter') {
        manufacturingDateField.focus();
    }
};

export const onPressedManufacturingDateHandler = (event, { expiryDateField }) => {
    if (event.key === 'Enter') {
        expiryDateField.focus();
    }
};

export const onPressedExpiryDateHandler = (event, { sGstField }) => {
    if (event.key === 'Enter') {
        sGstField.focus();
    }
};

export const onPressedSGSTHandler = (event, { cGstField }) => {
    if (event.key === 'Enter') {
        cGstField.focus();
    }
};

export const onPressedCGSTHandler = (event, { iGstField }) => {
    if (event.key === 'Enter') {
        iGstField.focus();
    }
};

export const onPressedIGSTHandler = (event, { rateField }) => {
    if (event.key === 'Enter') {
        rateField.focus();
    }
};

export const onPressedRateHandler = (event, { mrpField }) => {
    if (event.key === "Enter") {
        mrpField.focus();
    }
};
