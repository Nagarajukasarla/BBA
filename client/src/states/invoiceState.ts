
/**
     * Sets the invoice data to local storage.
     *
     */
const setInvoiceDataToLocalStorage = () => {
    if (
        invoiceData &&
        invoiceData.length > 0 &&
        customer &&
        paymentModeValue
    ) {
        let invoiceObject = {
            customer: customer,
            paymentModeValue: paymentModeValue,
            items: invoiceData,
        };

        console.log(invoiceObject);

        let invoiceObjectInJson = JSON.stringify(invoiceObject);
        console.log(invoiceObjectInJson);

        localStorage.setItem("invoice", invoiceObjectInJson);
    }
};

/**
 * Adds an item to the invoice table.
 *
 * @param {Object} itemObj - The item object to be added to the invoice table.
 * @returns {void}
 */
const addToInvoiceTable = (itemObj) => {
    if (
        itemObj !== null &&
        itemObj !== undefined &&
        itemObj.product !== undefined
    ) {
        setInvoiceData([...invoiceData, itemObj]);
        setInvoiceDataToLocalStorage();
    }
};

 /**
     * Retrieves invoice data from local storage and sets the customer, payment mode value, invoice data, and serial number.
     */
 const retriveInvoiceDataFromLocalStorage = () => {
    const invoiceInJSON = localStorage.getItem("invoice");
    if (!(invoiceInJSON === "null" || invoiceInJSON === null)) {
        let retrivedInvoice = JSON.parse(invoiceInJSON);
        setCustomer(retrivedInvoice.customer);
        setPaymentModeValue(retrivedInvoice.paymentModeValue);
        if (retrivedInvoice && retrivedInvoice.items.length > 0) {
            setInvoiceData(retrivedInvoice.items);
            setSerialNumber(
                retrivedInvoice.items[retrivedInvoice.items.length - 1]
                    .serialNumber
            );
        }
    }
    console.log(`Selected customer: ${customer}`);
};
