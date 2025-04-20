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
    address: string;
};

export type Customer = LiteCustomer & {
    defaultDiscount: number;
    email?: string;
    mobile?: string;
    gstin?: string;
    billPeriod: number;
    defaultBillDiscount: number;
};

export type CustomerSales = Customer & {
    purchase: {
        amount: number;
        totalInvoices: number;
    };
    sold: {
        amount: number;
        totalInvoices: number;
    };
};

export type Product = {
    id: number;
    invoiceNumber?: string;
    batchNumber: string;
    name: string;
    company: string;
    quantity: number;
    freeQuantity?: number;
    rate: number;
    mrp: number;
    sgst: number;
    cgst: number;
    igst: number;
    manufacturingDate: Date;
    expiryDate: Date;
    packingType: string;
};

export type ProductSalesDetails = Product & {
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