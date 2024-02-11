
/**
 * Creates an invoice request object based on the customer number, payment mode value, invoice data, and current date time.
 *
 * @param {type} customerNumber - description of parameter
 * @param {type} paymentModeValue - description of parameter
 * @param {type} invoiceData - description of parameter
 * @param {type} currentDateTime - description of parameter
 * @return {type} the created invoice request object
 */
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


/**
 * Generate a new array of items based on the given invoice data.
 *
 * @param {Array} invoiceData - The array of invoice data containing items.
 * @return {Array} A new array of items with modified properties.
 */
const generateItems = (invoiceData) => {
    return invoiceData.map((item) => {
        return {
            id: item.serialNumber,
            itemName: item.product,
            itemBatchNumber: item.batchNumber,
            company: item.company,
            rate: item.rate,
            quantity: item.quantity,
            discount: item.discount,  // Need to be discussed whether to add discount for each item or depened on customer
            price: item.price
        };
    });
};


/**
 * Calculates the total amount based on the invoice data.
 *
 * @param {Array} invoiceData - Array of invoice items
 * @return {number} The total amount calculated from the invoice data
 */
const calculateAmount = (invoiceData) => {
    // Need to calculate properly futhur correction is required for gsts and discount
    let amount = 0;
    invoiceData.forEach((item) => {
        amount += parseInt(item.price);
    });
    return amount;
};