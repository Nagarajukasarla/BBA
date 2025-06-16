import { Customer, CustomersWithBasicSales, LiteCustomer } from "@/types/model";

export const dummyCustomers: any[] = [
    {
        id: 1,
        number: "59957",
        name: "Sri Venkateshwara Pharma",
        address: {
            street: "Road no 2",
            area: "Vivekananda Colony",
            city: "Kamareddy",
            pincode: "503111",
            state: "Telangana",
        },
        defaultDiscount: 10,
        email: "venkateshwara@example.com",
        mobile: "9876543210",
        gstin: "29ABCDE1234F1Z5",
        billPeriod: 30,
        defaultBillDiscount: 5,
        purchase: {
            totalAmount: 18000,
            paidAmount: 10000,
            totalInvoices: 10,
            pendingInvoices: 5
        },
        sold: {
            totalAmount: 64000,
            paidAmount: 50000,
            totalInvoices: 19,
            pendingInvoices: 10
        }
    },
    {
        id: 2,
        number: "59958",
        name: "Sri Rudra Pharmaceutecals",
        address: {
            street: "Road No 4",
            area: "Ashok Nagar Colony",
            city: "Kamareddy",
            town: "Kamareddy",  
            pincode: "503111",
            state: "Telangana",
        },
        defaultDiscount: 15,
        email: "rudrapharma@example.com",
        mobile: "9876543211",
        gstin: "29ABCDE1234F1Z6",
        billPeriod: 45,
        defaultBillDiscount: 7,
        purchase: {
            totalAmount: 16000,
            paidAmount: 10000,
            totalInvoices: 10,
            pendingInvoices: 5
        },
        sold: {
            totalAmount: 64000,
            paidAmount: 50000,
            totalInvoices: 19,
            pendingInvoices: 10
        }
    },
    {
        id: 3,
        number: "59959",
        name: "Sri Vaijanath Pharma",
        address: {
            area: "Shanmuka Nagar",
            city: "Kamareddy",
            town: "Banswada",
            pincode: "503111",
            state: "Telangana",
        },
        defaultDiscount: 12,
        email: "vaijanath@example.com",
        mobile: "9876543212",
        gstin: "29ABCDE1234F1Z7",
        billPeriod: 30,
        defaultBillDiscount: 5,
        purchase: {
            totalAmount: 19000,
            paidAmount: 8000,
            totalInvoices: 10,
            pendingInvoices: 7
        },
        sold: {
            totalAmount: 64000,
            paidAmount: 50000,
            totalInvoices: 22,
            pendingInvoices: 18
        }
    },
    {
        id: 4,
        number: "59960",
        name: "Sri Devi Pharma",
        address: {
            street: "Road No 8",
            area: "Subhas Road",
            city: "Kamareddy",
            pincode: "503111",
            state: "Telangana",
        },
        defaultDiscount: 8,
        email: "devipharma@example.com",
        mobile: "9876543213",
        gstin: "29ABCDE1234F1Z8",
        billPeriod: 15,
        defaultBillDiscount: 3,
        purchase: {
            totalAmount: 19000,
            paidAmount: 8000,
            totalInvoices: 9,
            pendingInvoices: 7
        },
        sold: {
            totalAmount: 64000,
            paidAmount: 50000,
            totalInvoices: 15,
            pendingInvoices: 9
        }
    },
    {
        id: 5,
        number: "59961",
        name: "Sri Druga Pharma",
        address: {
            street: "Road No 10",
            area: "Tilak Road",
            city: "Kamareddy",
            pincode: "503111",
            state: "Telangana",
        },
        defaultDiscount: 10,
        email: "drugapharma@example.com",
        mobile: "9876543214",
        gstin: "29ABCDE1234F1Z9",
        billPeriod: 30,
        defaultBillDiscount: 5,
        purchase: {
            totalAmount: 22000,
            paidAmount: 10000,
            totalInvoices: 12,
            pendingInvoices: 9
        },
        sold: {
            totalAmount: 64000,
            paidAmount: 50000,
            totalInvoices: 16,
            pendingInvoices: 10
        }
    },
    {
        id: 6,
        number: "59962",
        name: "Sri Vaishnavi Pharma",
        address: {
            street: "Road No 4",
            area: "Vasundara Nagar",
            town: "Kukatpally",
            city: "Hyderabad",
            pincode: "500001",
            state: "Telangana",
        },
        defaultDiscount: 10,
        email: "vaishnavipharma@example.com",
        mobile: "9876543215",
        gstin: "2DESI9E1234F1Z0",
        billPeriod: 30,
        defaultBillDiscount: 5,
        purchase: {
            totalAmount: 27000,
            paidAmount: 15000,
            totalInvoices: 17,
            pendingInvoices: 8
        },
        sold: {
            totalAmount: 82000,
            paidAmount: 60000,
            totalInvoices: 85,
            pendingInvoices: 52
        }
    },
    {
        id: 7,
        number: "59963",
        name: "Sri Govinda Pharma",
        address: {
            street: "Road No 6",
            area: "Vasanth Nagar",
            town: "Miyapur",
            city: "Hyderabad",
            pincode: "500001",
            state: "Telangana",
        },
        defaultDiscount: 8,
        email: "govindapharma@example.com",
        mobile: "9876543216",
        gstin: "2DESI9E1234F1Z1",
        billPeriod: 25,
        defaultBillDiscount: 3,
        purchase: {
            totalAmount: 56000,
            paidAmount: 12000,
            totalInvoices: 22,
            pendingInvoices: 10
        },
        sold: {
            totalAmount: 78000,
            paidAmount: 22000,
            totalInvoices: 40,
            pendingInvoices: 28
        }
    }
];

// Helper function to convert any to LiteCustomer
export const toLiteCustomer = (customer: any): LiteCustomer => {
    const { id, number, name, address } = customer;
    return { id, number, name, address };
};

// Helper function to convert any to CustomersWithBasicSales
export const toCustomerBasicSales = (customer: any): CustomersWithBasicSales => {
    const { id, number, name, address, purchase, sold } = customer;
    return { id, number, name, address, purchase, sold };
};
    
// Get all customers as LiteCustomer
export const getLiteCustomers = (): LiteCustomer[] => {
    return dummyCustomers.map(toLiteCustomer);
};

// Get all customers as CustomersWithBasicSales
export const getCustomersBasicSales = (): CustomersWithBasicSales[] => {
    return dummyCustomers.map(toCustomerBasicSales);
};

// Get a specific customer basic sales by ID
export const getCustomerBasicSalesById = (id: number): CustomersWithBasicSales | undefined => {
    const customer = dummyCustomers.find((customer) => customer.id === id);
    return customer ? toCustomerBasicSales(customer) : undefined;
}

// Get all customers as Customer
export const getCustomers = (): Customer[] => {
    return dummyCustomers.map(toCustomer);
};

// Get a specific lite customer by ID
export const getLiteCustomerById = (id: number): LiteCustomer | undefined => {
    const customer = dummyCustomers.find(customer => customer.id === id);
    return customer ? toLiteCustomer(customer) : undefined;
};

// Helper function to convert any to Customer
export const toCustomer = (customer: any): Customer => {
    return customer as Customer;
};

// Get a specific customer by ID
export const getCustomerById = (id: number): Customer | undefined => {
    return dummyCustomers.find(customer => customer.id === id);
};

// Example usage of type guards
export const isFullCustomer = (customer: LiteCustomer | Customer): customer is Customer => {
    return 'defaultDiscount' in customer;
};

// Get all CityTown records
export const getCityTownMap = (): Record<string, string[]> => {
    const result: Record<string, string[]> = {};
    
    for (const { address } of dummyCustomers) {
        const city = address.city;
        const town = address.town || address.city;
        if(!city) continue;

        if(!result[city]) {
            result[city] = [];
        }

        if(!result[city].includes(town)) {
            result[city].push(town);
        }
    }

    return result;
};

export const dummyLiteCustomers: LiteCustomer[] = getLiteCustomers();
export const dummyCustomersBasicSales: CustomersWithBasicSales[] = getCustomersBasicSales();
export const dummyCityTownMap: Record<string, string[]> = getCityTownMap();