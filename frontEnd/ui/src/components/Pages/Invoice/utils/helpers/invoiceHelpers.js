import { getFilteredInvoices } from "../../../../../services/api/post/authorizedPostService";
import { mapCustomerDetails } from "../../../../../services/utils/common/helpers/client/customerHelpers";
import { getDayMonthYearFormat, getDayMonthYearWithTimeFormat } from "../../../../../services/utils/common/helpers/client/dateHelpers";

const invoiceFilterOptions = ["customerNumber", "paymentMode", "status"];

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
    };
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
            discount: item.discount, // Need to be discussed whether to add discount for each item or depened on customer
            price: item.price,
        };
    });
};

export const checkWhetherOtherFiltersAreSet = (
    currentFilterOption,
    { customerNumber, purchaseType /* Other filters */ }
) => {
    switch (currentFilterOption) {
        case 0:
            return (
                purchaseType !== null &&
                purchaseType !== "" &&
                purchaseType !== undefined
            );
        case 1:
            return (
                customerNumber !== null &&
                customerNumber !== "" &&
                customerNumber !== undefined
            );
        default:
            return false;
    }
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

export const filterInvoices = (invoices = [], filterArray = []) => {
    let filteredInvoices = [];
    if (!doesAnyFilterExist(filterArray)) return invoices;
    for (let idx = 0; idx < filterArray.length; idx++) {
        if (
            filterArray[idx].option.VALUE ===
            filterArray[idx].option.DEFAULT_VALUE
        ) {
            filterArray[idx] = true;
        }
    }
    console.log(filterArray);
    // Iterate over the filterArray, add filter only if it is set
    for (const item of Object.values(invoices)) {
        let canIncluceded = true;
        for (let idx = 0; idx < filterArray.length; idx++) {
            //const temp = filterArray[idx].option.VALUE;
            if (filterArray[idx] === true) {
                canIncluceded = canIncluceded && filterArray[idx];
            } else if (
                filterArray[idx].option.VALUE ===
                item[`${invoiceFilterOptions[idx]}`]
            ) {
                canIncluceded = true;
            } else {
                canIncluceded = false;
            }
        }
        if (canIncluceded) {
            filteredInvoices.push(item);
        }
    }
    console.log("filtered Invoices: ", filteredInvoices);
    return filteredInvoices;
};

/**
 * Iterate over the filters array and check whether any single filter is set or not
 * @param {Array} filterArray
 * @returns
 */
const doesAnyFilterExist = (filterArray) => {
    for (let idx = 0; idx < filterArray.length; idx) {
        //  option.CREDIT  !== option.ALL
        if (filterArray[idx].option.VALUE !== filterArray[idx].option.DEFAULT_VALUE) {
            return true;
        }
    }
};

export const createFiltersObj = ({ customer, purchaseType, invoiceStatus }) => {
    console.log(customer?.customerNumber);
    const filters = {
        customerNumber: customer?.customerNumber??null,
        paymentMode: (purchaseType === "--All--" || purchaseType === "" || purchaseType === undefined) ? null : purchaseType.toLowerCase(),
        status: (invoiceStatus === "--All--" || invoiceStatus === "" || purchaseType === undefined) ? null : invoiceStatus.toLowerCase()
    };
    return filters;
};

export const createFilterArray = (filters = []) => {
    let filterArray = [
        {
            option: {
                DEFAULT_VALUE: "all",
                VALUE:
                    filters[0] === undefined || filters[0] === null
                        ? "all"
                        : filters[0],
            },
        },
        {
            option: {
                DEFAULT_VALUE: "all",
                VALUE: `${
                    filters[1] === undefined || filters[1] === null
                        ? "all"
                        : filters[1]
                }`,
            },
        },
        {
            option: {
                DEFAULT_VALUE: "all",
                VALUE: `${
                    filters[2] === undefined || filters[2] === null
                        ? "all"
                        : filters[2]
                }`,
            },
        },
    ];
    return filterArray;
};


export const fetchFilteredInvoices = async (token, filters) => {
    let mappedInvoices = [];
    try {
        await getFilteredInvoices(token, filters).then(
            (invoices) => {
                if (invoices && invoices.length > 0) {
                    console.log(JSON.stringify(invoices));
                    mappedInvoices = invoices.map((item) => ({
                        key: item.id,
                        invoiceNumber: item.invoiceNumber,
                        customerNumber: item.customerNumber,
                        generationDate: getDayMonthYearWithTimeFormat(item.generationDate),
                        amount: item.amount,
                        paymentMode: item.paymentMode,
                        customerDetails: mapCustomerDetails({
                            name: item.customerName,
                            address: item.customerAddressDto,
                            include: ["area", "city", "state"],
                            concat: false
                        }),
                        status: item.status
                    }));
                   // console.log(`Filterd invoices: ${JSON.stringify(mappedInvoices)}`);
                }
            }
        );
        return mappedInvoices;
    } 
    catch (error) {
        console.log(`Error while fetching filterd invoice: ${error}`);
        return false;
    }
};
