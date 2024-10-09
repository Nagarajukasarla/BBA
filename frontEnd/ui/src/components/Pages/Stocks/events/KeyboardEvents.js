export const onSelectedPaymentMode = (event, { datePickerRef }) => {
    if (event.key === 'Enter' && datePickerRef.current) {
        datePickerRef.current.focus();
    }
};

export const onSelectBilledDate = (event, { hsnNumberRef }) => {
    if (event.key === 'Enter' && hsnNumberRef.current) {
        hsnNumberRef.current.focus();
    } 
};

export const onPressedHsnNumberHandler = (event, { productNameRef }) => {
    if (event.key === 'Enter' && productNameRef.current) {
        productNameRef.current.focus();
    }
};

export const onPressedProductNameHandler = (event , { batchNumberRef }) => {
    if (event.key === 'Enter' && batchNumberRef.current) {
        batchNumberRef.current.focus();
    }
};

export const onPressedBatchNumberHandler = (event, { companyRef }) => {
    if (event.key === 'Enter' && companyRef.current) {
        companyRef.current.focus();
    }
};

export const onPressedCompanyHandler = (event, { packingTypeRef }) => {
    if (event.key === 'Enter' && packingTypeRef.current) {
        packingTypeRef.current.focus();
    }
};

export const onPressedPackingTypeHandler = (event, { quantityRef }) => {
    if (event.key === 'Enter' && quantityRef.current) {
        quantityRef.current.focus();
    }
};

export const onPressedQuantityHandler = (event, { manufacturingDateRef }) => {
    if (event.key === 'Enter' && manufacturingDateRef.current) {
        manufacturingDateRef.current.focus();
    }
};

export const onPressedManufacturingDateHandler = (event, { expiryDateRef }) => {
    if (event.key === 'Enter' && expiryDateRef.current) {
        expiryDateRef.current.focus();
    }
};

export const onPressedExpiryDateHandler = (event, { sGstRef }) => {
    if (event.key === 'Enter' && sGstRef.current) {
        sGstRef.current.focus();
    }
};

export const onPressedSGSTHandler = (event, { cGstRef }) => {
    if (event.key === 'Enter' && cGstRef.current) {
        cGstRef.current.focus();
    }
};

export const onPressedCGSTHandler = (event, { iGstRef }) => {
    if (event.key === 'Enter' && iGstRef.current) {
        iGstRef.current.focus();
    }
};

export const onPressedIGSTHandler = (event, { rateRef }) => {
    if (event.key === 'Enter' && rateRef.current) {
        rateRef.current.focus();
    }
};

export const onPressedRateHandler = (event, { mrpRef }) => {
    if (event.key === "Enter" && mrpRef.current) {
        mrpRef.current.focus();
    }
};