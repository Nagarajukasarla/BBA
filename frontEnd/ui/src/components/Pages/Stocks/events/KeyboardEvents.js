
export const onPressedEnterBatchNumberField = (event, { companyField }) => {
    if (event.key === 'Enter') {
        companyField.focus();
    }
}

export const onPressedEnterCompanyField = (event, { quantityField }) => {
    if (event.key === 'Enter') {
        quantityField.focus();
    }
}

export const onPressedEnterQuantityField = (event, { manufacturingDateField }) => {
    if (event.key === 'Enter') {
        manufacturingDateField.focus();
    }
}

export const onPressedEnterManufacturingDateField = (event, { expiryDateField }) => {
    if (event.key === 'Enter') {
        expiryDateField.focus();
    }
}

export const onPressedEnterExpiryDateField = (event, { sGstField }) => {
    if (event.key === 'Enter') {
        sGstField.focus();
    }
}

export const onPressedEnterSGSTField = (event, { cGstField }) => {
    if (event.key === 'Enter') {
        cGstField.focus();
    }
}

export const onPressedEnterCGSTField = (event, { iGstField }) => {
    if (event.key === 'Enter') {
        iGstField.focus();
    }
}

export const onPressedEnterIGSTField = (event, { rateField }) => {
    if (event.key === 'Enter') {
        rateField.focus();
    }
}