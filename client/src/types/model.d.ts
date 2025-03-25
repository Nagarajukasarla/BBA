export type LiteShop = {
    id: number;
    email: string;
    name: string;
    image?: string;
};

export type Shop = {
    id: number;
    email: string;
    mobile: string;
    name: string;
    image?: string;
    drugLicenseNumber: string;
    gstin: string;
};

export type Invoice = {
    id: number;
    invoiceNumber: string;
    generationDate: Date;
    amount: number;
    paymentMode: string;
    customerDetails: LiteCustomer;
    status: string;
    type: string;
    dueDate: Date;
};

export type LiteCustomer = {
    id: number;
    number: string;
    name: string;
    address: string;
};

