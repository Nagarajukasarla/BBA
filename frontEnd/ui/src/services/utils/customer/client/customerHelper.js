
/**
 * Maps the customer with address details based on the provided parameters.
 *
 * @param {Object} param0 - Object containing customer details and options
 * @param {string} param0.name - The name of the customer
 * @param {Object} param0.address - The address object of the customer
 * @param {Array} [param0.include=[]] - Fields to include from the address
 * @param {boolean} param0.concat - Whether to concatenate the details or not
 * @return {string|Array} The mapped customer details based on the provided options
 */
export const mapCustomerDetails = ({ name, address, include=[], concat }) => {
    let details = "";

    for (let field of include) {
        const value = address[field];
        if (value !== null && value !== undefined) {
            details += `${value}, `;
        }
    }

    details = details.replace(/,\s*$/, ""); // Remove the last comma and any trailing spaces
    return concat ? `${name}, ${details}` : [name, details];
};


/**
 * Generates a formatted string representing the customer's information including customer number, name, and city.
 *
 * @param {object} customer - the customer object
 * @return {string} formatted customer information
 */
export const customerNameHelper = (customer) => {
    if (!customer) {
        return "";
    }
    return `${customer?.customerNumber ?? ""} - ${customer?.customerName ?? ""}, ${
        customer?.addressDto?.city ?? ""
    }`;
};

/**
 * Generates options from a list of customers.
 *
 * @param {array} customers - The list of customers to convert to options.
 * @return {array} An array of options with value, label, and customValue properties.
 */
export const getCustomerAsOptions = (customers) => {
    return customers.map((item) => ({
        value: item.customerNumber,
        label: customerNameHelper(item),
        customValue: item,
    }));
};