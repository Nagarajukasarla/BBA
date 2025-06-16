export const onPressedCompanyHandler = (event, { quantityField }) => {
    if (event.keyCode === 13) {
        quantityField.focus();
    }
};

export const onPressedQuantityHandler = (event, { discountRef }) => {
    if (event.keyCode === 13) {
        discountRef.current.select();
    }
};

export const onPressedPackingTypeHandler = (
    event,
    { manufacturingDateField }
) => {
    if (event.keyCode === 13) {
        manufacturingDateField.focus();
    }
};

export const onPressedManufacturingDateHandler = (
    event,
    { expiryDateField }
) => {
    if (event.keyCode === 13) {
        expiryDateField.focus();
    }
};

export const onPressedExpiryDateHandler = (event, { sGstField }) => {
    if (event.keyCode === 13) {
        sGstField.focus();
    }
};

export const onPressedSGSTHandler = (event, { cGstField }) => {
    if (event.keyCode === 13) {
        cGstField.focus();
    }
};

export const onPressedCGSTHandler = (event, { iGstField }) => {
    if (event.keyCode === 13) {
        iGstField.focus();
    }
};

export const onPressedIGSTHandler = (event, { discountField }) => {
    if (event.keyCode === 13) {
        discountField.focus();
    }
};

export const onPressedDiscountHandler = (event, { mrpField }) => {
    if (event.keyCode === 13) {
        mrpField.focus();
    }
};

export const onPressedMrpHandler = (event, { rateField }) => {
    if (event.keyCode === 13) {
        rateField.focus();
    }
};
