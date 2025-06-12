import { dummyLiteCustomers, dummyCustomers, dummyCustomersBasicSales, dummyCityTownMap } from "./customers";
import { dummyInvoices } from "./invoices";
import { dummyProducts } from "./products";
import {
    LiteCustomer,
    Invoice,
    LiteShop,
    Customer,
    Product,
    CustomersWithBasicSales,
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
    customersBasicSales: dummyCustomersBasicSales,
    invoices: dummyInvoices,
    products: dummyProducts,
    shop: mockShop,
    cityTownMap: dummyCityTownMap,
    // Add more mock data as needed
};

// Type definitions for the mock data
export interface MockDataType {
    liteCustomers: LiteCustomer[];
    customers: Customer[];
    customersBasicSales: CustomersWithBasicSales[];
    invoices: Invoice[];
    products: Product[];
    shop: LiteShop;
    cityTownMap: Record<string, string[]>;
    // Add more types as needed
}

export { dummyCustomers, dummyInvoices, dummyCustomersBasicSales, dummyCityTownMap };
