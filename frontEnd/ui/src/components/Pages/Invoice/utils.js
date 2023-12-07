export const getInvoiceRequestObj = (
    customerNumber, 
    paymentModeValue, 
    discount,
    invoiceData
) => {
    return {
        customerNumber: customerNumber,
        paymentMode: paymentModeValue,
        discount: discount,
        items: generateItems(invoiceData)
    }
};

const generateItems = (invoiceData) => {
    return invoiceData.map((item) => {
        return {
            productName: item.product,
            companyName: item.company,
            batchNumber: item.batchNumber,
            quantity: item.quantity,
            discount: item.discount,  // Need to be discussed whether to add discount for each item or depened on customer
            rate: item.rate
        };
    });
};
