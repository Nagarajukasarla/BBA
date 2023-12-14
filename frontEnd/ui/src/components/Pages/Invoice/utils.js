export const getInvoiceRequestObj = (
    customerNumber, 
    paymentModeValue,
    invoiceData,
    currentDateTime
) => {
    return {
        customerNumber: customerNumber,
        paymentMode: paymentModeValue,
        currentDateTime: currentDateTime,
        items: generateItems(invoiceData),
        amount: calculateAmount(invoiceData),
    }
};

const generateItems = (invoiceData) => {
    return invoiceData.map((item) => {
        return {
            id: item.serialNumber,
            productName: item.product,
            batchNumber: item.batchNumber,
            companyName: item.company,
            rate: item.rate,
            quantity: item.quantity,
            discount: item.discount,  // Need to be discussed whether to add discount for each item or depened on customer
            price: item.price
        };
    });
};

const calculateAmount = (invoiceData) => {
    // Need to calculate properly futhur correction is required for gsts and discount
    let amount = 0;
    invoiceData.forEach((item) => {
        amount += item.price;
    });
    return amount;
}

