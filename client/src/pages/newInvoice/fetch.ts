import APIResponse from "@/classes/APIResponse";
import CustomerHelper from "@/classes/helpers/CustomerHelper";
import customerService from "@/services/api/customerService";
import productService from "@/services/api/productService";
import { getProductsAsOptions } from "./helpers";
import { newInvoiceStore } from "@/stores/newInvoiceStore";

export const fetchCustomers = async (): Promise<string> => {
    try {
        const response = await customerService.fetchLiteCustomers();
        if (response.code === APIResponse.SUCCESS && response.data) {
            if (response.data.length === 0) {
                return Promise.reject("No Customers found");
            }

            const customers = response.data.map(customer => ({
                id: customer.id,
                customerNumber: customer.number,
                customerName: customer.name,
                address: customer.address,
            }));

            newInvoiceStore.setCustomersAsOptions(
                CustomerHelper.getCustomerAsOptions({
                    customers,
                    addAllOption: false,
                })
            );
            return "Success";
        } else if (response.code === APIResponse.INTERNAL_SERVER_ERROR) {
            return Promise.reject("Internal Server Error");
        } else if (response.code === APIResponse.NOT_FOUND) {
            return Promise.reject("Content Not Found");
        }
        return Promise.reject("Unexpected response");
    } catch (error) {
        console.log("Type of error :", typeof error);
        return Promise.reject("Network Error or Something went wrong");
    }
};

export const fetchProducts = async (): Promise<string> => {

    try {
        const response = await productService.fetchProducts();
        if (response.code === APIResponse.SUCCESS && response.data) {
            if (response.data.length === 0) {
                return Promise.reject("No Products found");
            }

            newInvoiceStore.setProductsAsOptions(getProductsAsOptions(response.data));
            return "Success";
        } else if (response.code === APIResponse.INTERNAL_SERVER_ERROR) {
            return Promise.reject("Internal Server Error");
        } else if (response.code === APIResponse.NOT_FOUND) {
            return Promise.reject("Content Not Found");
        }
        return Promise.reject("Unexpected response");
    } catch (error) {
        console.log("Type of error :", typeof error);
        return Promise.reject("Network Error or Something went wrong");
    }
};

export const fetchSelectedCustomer = async (value: number): Promise<string> => {
    try {
        const response = await customerService.fetchCustomerById(value);
        if (response.code === APIResponse.SUCCESS && response.data) {
            newInvoiceStore.setInvoiceData({
                ...newInvoiceStore.invoiceData,
                customer: response.data
            });
            return "Success";
        } else if (response.code === APIResponse.INTERNAL_SERVER_ERROR) {
            return Promise.reject("Internal Server Error");
        } else if (response.code === APIResponse.NOT_FOUND) {
            return Promise.reject("Content Not Found");
        }
        return Promise.reject("Unexpected response");
    } catch (error) {
        console.log("Type of error :", typeof error);
        return Promise.reject("Network Error or Something went wrong");
    }
};
