import { Dayjs } from "dayjs";

/**
 * Interface for invoice filters
 */
export interface InvoiceFilters {
    customerId?: number | null;
    paymentMode?: string | null;
    status?: string | null;
    dayWise?: string | null;
    specificDate?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    searchQuery?: string | null;
}

/**
 * Interface for invoice filter state in the component
 */
export interface InvoiceFilterState {
    customerId: number | null;
    paymentMode: string | null;
    status: string | null;
    dayWise: string | null;
    specificDate: Dayjs | null;
    dateRange: [Dayjs | null, Dayjs | null];
    searchQuery: string;
}

/**
 * Type for invoice filter actions
 */
export type InvoiceFilterAction =
    | { type: "SET_CUSTOMER"; payload: number | null }
    | { type: "SET_PAYMENT_MODE"; payload: string | null }
    | { type: "SET_STATUS"; payload: string | null }
    | { type: "SET_DAY_WISE"; payload: string | null }
    | { type: "SET_SPECIFIC_DATE"; payload: Dayjs | null }
    | { type: "SET_DATE_RANGE"; payload: [Dayjs | null, Dayjs | null] }
    | { type: "SET_SEARCH_QUERY"; payload: string }
    | { type: "RESET_FILTERS" };
