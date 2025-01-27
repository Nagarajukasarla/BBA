export interface DashboardCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    style?: React.CSSProperties;
}

export type ChartData = {
    label: string;
    value: number;
};

export interface ChartDataProps {
    data: ChartData[];
}
