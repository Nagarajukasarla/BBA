import {
    getCustomDatesRange,
    getDayBeforeYestardayDateRange,
    getSpecificDateRange,
    getTodayDateRange,
    getYestardayDateRange,
} from "../../../../../services/utils/common/helpers/client/dateHelpers";

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

const checkWhetherOtherFiltersAreSet = (
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

// Below filter is incomplete
// This filter should be utilized when server is heavy with huge requests
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
    for (const item of Object.values(invoices)) {
        let canIncluceded = true;
        for (let idx = 0; idx < filterArray.length; idx++) {
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
        if (
            filterArray[idx].option.VALUE !==
            filterArray[idx].option.DEFAULT_VALUE
        ) {
            return true;
        }
    }
};

/**
 * Creates a filters object based on the provided customer, purchaseType, and invoiceStatus.
 *
 * @param {Object} options - An object containing the customer, purchaseType, and invoiceStatus.
 * @param {Object} options.customer - An object representing the customer.
 * @param {string} options.purchaseType - The purchase type.
 * @param {string} options.invoiceStatus - The invoice status.
 * @return {Object} - An object containing the customerNumber, paymentMode, and status filters.
 */
export const createFiltersObj = ({
    customer,
    purchaseType,
    invoiceStatus,
    dayWise,
    specificDate,
    dateRange
}) => {
    const getValidValue = (value, allValue) =>
        value === allValue || value === "" || value === undefined
            ? null
            : value.toLowerCase();

    const filters = {
        customerNumber: customer?.customerNumber ?? null,
        paymentMode: getValidValue(purchaseType, "--All--"),
        status: getValidValue(invoiceStatus, "--All--"),
       dateRange: getDateRange(dayWise, specificDate, dateRange)
    };
    return filters;
};

/**
 * Returns the date range based on the given day.
 *
 * @param {string} day - The day for which the date range is needed. Possible values are "today", "yestarday", and "daybeforeyestarday".
 * @return {Array} An array representing the date range. If the day is "today", it returns the today date range. If the day is "yestarday", it returns the date range for the previous day. If the day is "daybeforeyestarday", it returns the date range for the day before yesterday. If the day is any other value, it returns an empty array.
 */
const getDateRange = (dayWise, specificDate = Date, dateRange = []) => {
    const dateRangeFunctions = {
        "today": getTodayDateRange,
        "yestarday": getYestardayDateRange,
        "daybeforeyestarday": getDayBeforeYestardayDateRange,
        "specificdate": getSpecificDateRange,
        "range": getCustomDatesRange
    };

    if (dayWise !== "" && dayWise) {
        if (dayWise === "--All--") return null;
        dayWise = dayWise.replace(/\s+/g, "").trim().toLowerCase();
        return dateRangeFunctions[dayWise] ? dateRangeFunctions[dayWise]() : null;
    }

    if (specificDate) {
        console.log(`Specific Date: ${specificDate}`);
        return dateRangeFunctions["specificdate"](specificDate.$d);
    }

    if (dateRange[0] && dateRange[1]) {
        return dateRangeFunctions["range"](dateRange[0].$d, dateRange[1].$d);
    }

    return null;

};

/**
 * Creates a filter array based on the given filters.
 *
 * @param {Array} filters - An array of filters.
 * @return {Array} An array of filter objects with default and value properties.
 */
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

