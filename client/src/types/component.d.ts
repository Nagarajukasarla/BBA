import { Customer, Product } from "./model";

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

export interface ProductData {
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
    discount: number;
};

export interface InvoiceItem extends ProductData {
    price: number;
    key: string;
};

export interface InvoiceData {
    invoiceNumber?: string;
    customer: Customer | null;
    paymentMode: string;
    items: InvoiceItem[];
};

export interface SiderItem {
    key: string;
    label: JSX.Element;
    icon: JSX.Element;
    onClick: () => void;
    styles?: React.CSSProperties;
}

export interface NewCustomerRef {
    submit: () => void;
    reset: () => void;
}