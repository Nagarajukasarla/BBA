export type Address = {
    street?: string;
    area?: string;
    town?: string;
    city?: string;
    state: string;
    pincode?: string;
}

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

export type LiteCustomer = {
    id: number;
    number: string;
    name: string;
    address: Address;
};

export type Customer = LiteCustomer & {
    defaultDiscount: number;
    email?: string;
    mobile?: string;
    gstin?: string;
    billPeriod: number;
    defaultBillDiscount: number;
};

export type CustomersWithBasicSales = LiteCustomer & {
    purchase: {
        totalAmount: number;
        paidAmount: number;
        totalInvoices: number;
        pendingInvoices: number;
    };
    sold: {
        totalAmount: number;
        paidAmount: number;
        totalInvoices: number;
        pendingInvoices: number;
    };
};

export type Product = {
    id: number;
    invoiceNumber?: string;
    batchNumber: string;
    name: string;
    company: string;
    quantity: number;
    freeQuantity: number;
    packingType: string;
    manufacturingDate: Date;
    expiryDate: Date;
    sGst: number;
    cGst: number;
    iGst: number;
    rate: number;
    mrp: number;
};

export type ProductSales = Product & {
    margin: number;
    grossIncome: number;
    netIncome: number;
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

export type InvoiceItem = Product & {
    serialNumber: number | undefined;
    amount: number;
};

export type Company =  {
    id: number;
    name: string;
    shortName: string;
    establishementYear?: number;
};

export type CompanySales = Company & { 
    /** Sales details */
};