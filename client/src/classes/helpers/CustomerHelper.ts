import { CSelectOption } from "@/types/core";
import { Address } from "@/types/model";

type AddressKey = keyof Address;

// This interface is used for internal mapping
interface CustomerFormatted {
    id?: number;
    number?: string;
    name?: string;
    address: Address;
}

interface CustomerOptionsParams {
    customers: CustomerFormatted[];
    addAllOption?: boolean;
}

interface MapCustomerParams {
    name: string;
    address: Address;
    include?: string[];
    concat: boolean;
}

class CustomerHelper {
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
    static mapCustomerDetails({
        name,
        address,
        include = [],
        concat,
    }: MapCustomerParams): string | [string, string] {
        let details = "";
        if (include.length === 0) {
            const parts = [
                address.area,
                address.city || address.town,
                address.pincode
            ].filter(Boolean);

            details = parts.join(', ');
        }
        else {
            for (const field of include) {
                const value = address[field as AddressKey];
                if (value !== null && value !== undefined) {
                    details += `${value}, `;
                }
            }
        }

        details = details.replace(/,\s*$/, ""); // Remove trailing comma and spaces
        return concat ? `${name}, ${details}` : [name, details];
    }

    /**
     * Generates a formatted string representing the customer's information including
     * customer number, name, and address details.
     *
     * @static
     * @param {CustomerFormatted | null} customer - The customer object to format
     * @param {boolean} concat - Whether to concatenate the result into a single string
     * @return {string} Formatted customer information string
     * @example
     * // Returns 'CUST123 - Ram Chandran, Ayodhya Nagar, Ayodhya, 10001'
     * customerNameHelper(customer, true);
     */
    static customerNameHelper(customer: CustomerFormatted | null, concat: boolean): string {
        if (!customer) {
            return "";
        }
        return `${customer?.number ?? ""} - ${CustomerHelper.mapCustomerDetails({
            name: customer?.name ?? "",
            address: customer?.address,
            concat,
        })}`;
    }

    /**
     * Converts an array of customer objects into a format suitable for dropdown/select components.
     * @static
     * @param {CustomerOptionsParams} params - Configuration object
     * @param {CustomerFormatted[]} params.customers - Array of customer objects to convert
     * @param {boolean} [params.addAllOption=false] - Whether to include an 'All' option
     * @return {CSelectOption<CustomerFormatted | null>[]} Array of option objects with value, label, and original customer data
     * @example
     * getCustomerAsOptions({
     *   customers: customerList,
     *   addAllOption: true
     * });
     */
    static getCustomerAsOptions({
        customers,
        addAllOption,
    }: CustomerOptionsParams): CSelectOption<CustomerFormatted | null>[] {
        if (!customers || customers.length === 0) return [];

        const options: CSelectOption<CustomerFormatted | null>[] = customers.map(item => ({
            value: item.number ?? "",
            label: this.customerNameHelper(item, true),
            customValue: item,
        }));

        if (addAllOption) {
            options.unshift({
                value: "All",
                label: "--All--",
                customValue: null,
            });
        }

        return options;
    }
}

export default CustomerHelper;
