import { Customer } from "./model";

/** Dashboard Types */
export interface DashboardCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    style?: React.CSSProperties;
};

export type ChartData = {
    label: string;
    value: number;
};

export interface ChartDataProps {
    data: ChartData[];
};

/** Invoice Types */
export interface Filters {
    customer: string;
    purchaseType: string;
    invoiceStatus: string;
    dayWise: string;
    specificDate: string | null;
    dateRange: [string | null, string | null];
};

// Used for addOrEdit invoice
export interface InvoiceData {
    invoiceNumber?: string;
    customer: Customer | null;
    paymentModeValue: string;
    items: InvoiceItem[];
    serialNumber?: number;
};

export interface ProductData {
    id: number;
    batchNumber: string;
    invoiceNumber?: string;
    name: string;
    company: string;
    quantity: number;
    freeQuantity: number;
    packingType: string;
    manufacturingDate: Date | null;
    expiryDate: Date | null;
    sGst: number;
    cGst: number;
    iGst: number;
    rate: number;
    mrp: number;
    discount: number;
    price: number;
};