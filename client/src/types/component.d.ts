
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

