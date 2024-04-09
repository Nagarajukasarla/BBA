import { getAllCustomers } from "../../../api/get/authorizedGetServices";

export const fetchCustomers = async (token) => {
    try {
        const customers = await getAllCustomers(token);
        if (customers !== null && customers.length > 0) {
            return customers;
        }
        else {
            return [];
        }
    }
    catch (error) {
        // if token is invalid push to login
        // if any server issue occurs then generate mail -- Automation
        return false;
    }
};