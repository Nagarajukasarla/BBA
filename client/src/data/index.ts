import { dummyLiteCustomers, dummyCustomers } from "./customers";
import { dummyInvoices } from "./invoices";
import { dummyProducts } from "./products";
import {
    LiteCustomer,
    Invoice,
    LiteShop,
    Customer,
    Product,
} from "../types/model";

// Mock shop data
export const mockShop: LiteShop = {
    id: 1,
    email: "srivenkateshwara@gmail.com",
    name: "Sri Venkateshwara Pharmaceuticals",
    image: undefined,
};

// Export all mock data from a central location
export const mockData = {
    liteCustomers: dummyLiteCustomers,
    customers: dummyCustomers,
    invoices: dummyInvoices,
    products: dummyProducts,
    shop: mockShop,
    // Add more mock data as needed
};

// Type definitions for the mock data
export interface MockDataType {
    liteCustomers: LiteCustomer[];
    customers: Customer[];
    invoices: Invoice[];
    products: Product[];
    shop: LiteShop;
    // Add more types as needed
}

export { dummyCustomers, dummyInvoices };
