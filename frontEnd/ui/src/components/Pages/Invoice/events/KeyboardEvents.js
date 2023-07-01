export const onPressedEnterOnCompanyField = (event, { quantityField }) => {
    if (event.keyCode === 13) {
        quantityField.focus();
    }
}

export const onPressedEnterQuantityField = (event, { manufacturingDateField }) => {
    if (event.keyCode === 13) {
        manufacturingDateField.focus();
    }
}

export const onPressedEnterManufacturingDateField = (event, { expiryDateField }) => {
    if (event.keyCode === 13) {
        expiryDateField.focus();
    }
}

export const onPressedEnterExpiryDateField = (event, { sGstField }) => {
    if (event.keyCode === 13) {
        sGstField.focus();
    }
}

export const onPressedEnterSGSTField = (event, { cGstField }) => {
    if (event.keyCode === 13) {
        cGstField.focus();
    }
}

export const onPressedEnterCGSTField = (event, { iGstField }) => {
    if (event.keyCode === 13) {
        iGstField.focus();
    }
}

export const onPressedEnterIGSTField = (event, { discountField }) => {
    if (event.keyCode === 13) {
        discountField.focus();
    }
}

export const onPressedEnterDiscountField = (event, { priceField }) => {
    if (event.keyCode === 13) {
        priceField.focus();
    }
}
