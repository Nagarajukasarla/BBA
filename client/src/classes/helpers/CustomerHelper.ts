import { Address } from "@/types/model";

type AddressKey = keyof Address;

// This interface is used for internal mapping
interface CustomerFormatted {
    id?: number;
    customerNumber?: string;
    customerName?: string;
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

        // if(include.length === 0) {
        //     details = address.area ?? "" + (address.town || address.city) + "," + address.pincode ?? "";
        // }
        console.log("Include: ", include);
        if (include.length === 0) {
            console.log("Area: ", address.area);
            console.log("City: ", address.city);
            console.log("Town: ", address.town);
            console.log("Pincode: ", address.pincode);
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

    /**CustomerFormatted
     * Generates a formatted string representing the customer's information including customer number, name, and city.
     *
     * @param {object} customer - the customer object
     * @return {string} formatted customer information
     */
    static customerNameHelper(customer: CustomerFormatted | null, concat: boolean): string {
        if (!customer) {
            return "";
        }
        return `${customer?.customerNumber ?? ""} - ${CustomerHelper.mapCustomerDetails({
            name: customer?.customerName ?? "",
            address: customer?.address,
            concat,
        })}`;
    }

    /**
     * Generates options for customers to be used as dropdown options.
     *
     * @param {Object} param0 - Object containing customers array and addAllOption boolean
     * @return {Array} Array of options for dropdown selection
     */
    static getCustomerAsOptions({
        customers,
        addAllOption,
    }: CustomerOptionsParams): {
        value: string;
        label: string;
        customValue: CustomerFormatted | null;
    }[] {
        if (!customers || customers.length === 0) return [];

        const options: Array<{
            value: string;
            label: string;
            customValue: CustomerFormatted | null;
        }> = customers.map(item => ({
            value: item.customerNumber ?? "",
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
