import { Customer, LiteCustomer } from "@/types/model";

export const dummyCustomers: Customer[] = [
    {
        id: 1,
        number: "59957",
        name: "Sri Venkateshwara Pharma",
        address: "Vivekananda Colony, Kamareddy, 503111",
        defaultDiscount: 10,
        email: "venkateshwara@example.com",
        mobile: "9876543210",
        gstin: "29ABCDE1234F1Z5",
        billPeriod: 30,
        defaultBillDiscount: 5
    },
    {
        id: 2,
        number: "59958",
        name: "Sri Rudra Pharmaceutecals",
        address: "Ashok Nagar Colony, Kamareddy, 503111",
        defaultDiscount: 15,
        email: "rudrapharma@example.com",
        mobile: "9876543211",
        gstin: "29ABCDE1234F1Z6",
        billPeriod: 45,
        defaultBillDiscount: 7
    },
    {
        id: 3,
        number: "59959",
        name: "Sri Vaijanath Pharma",
        address: "Vidya Nagar Colony, Kamareddy, 503111",
        defaultDiscount: 12,
        email: "vaijanath@example.com",
        mobile: "9876543212",
        gstin: "29ABCDE1234F1Z7",
        billPeriod: 30,
        defaultBillDiscount: 5
    },
    {
        id: 4,
        number: "59960",
        name: "Sri Devi Pharma",
        address: "Subhas Road, Kamareddy, 503111",
        defaultDiscount: 8,
        email: "devipharma@example.com",
        mobile: "9876543213",
        gstin: "29ABCDE1234F1Z8",
        billPeriod: 15,
        defaultBillDiscount: 3
    },
    {
        id: 5,
        number: "59961",
        name: "Sri Druga Pharma",
        address: "Tilak Road, Kamareddy, 503111",
        defaultDiscount: 10,
        email: "drugapharma@example.com",
        mobile: "9876543214",
        gstin: "29ABCDE1234F1Z9",
        billPeriod: 30,
        defaultBillDiscount: 5
    }
];

// Helper function to convert Customer to LiteCustomer
export const toLiteCustomer = (customer: Customer): LiteCustomer => {
    const { id, number, name, address } = customer;
    return { id, number, name, address };
};

// Get all customers as LiteCustomer
export const getLiteCustomers = (): LiteCustomer[] => {
    return dummyCustomers.map(toLiteCustomer);
};

// Get a specific customer by ID
export const getCustomerById = (id: number): Customer | undefined => {
    return dummyCustomers.find(customer => customer.id === id);
};

// Get a specific lite customer by ID
export const getLiteCustomerById = (id: number): LiteCustomer | undefined => {
    const customer = dummyCustomers.find(customer => customer.id === id);
    return customer ? toLiteCustomer(customer) : undefined;
};

// Example usage of type guards
export const isFullCustomer = (customer: LiteCustomer | Customer): customer is Customer => {
    return 'defaultDiscount' in customer;
};

export const dummyLiteCustomers: LiteCustomer[] = getLiteCustomers();