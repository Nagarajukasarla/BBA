import { Dayjs } from "dayjs";
import { useCallback, useReducer } from "react";
import {
    InvoiceFilterAction,
    InvoiceFilters,
    InvoiceFilterState,
} from "../types/filters";

// Initial state for invoice filters
const initialState: InvoiceFilterState = {
    customerId: null,
    paymentMode: null,
    status: null,
    dayWise: null,
    specificDate: null,
    dateRange: [null, null],
    searchQuery: "",
};

// Reducer function for invoice filters
function invoiceFilterReducer(
    state: InvoiceFilterState,
    action: InvoiceFilterAction
): InvoiceFilterState {
    switch (action.type) {
        case "SET_CUSTOMER":
            return { ...state, customerId: action.payload };
        case "SET_PAYMENT_MODE":
            return { ...state, paymentMode: action.payload };
        case "SET_STATUS":
            return { ...state, status: action.payload };
        case "SET_DAY_WISE":
            return {
                ...state,
                dayWise: action.payload,
                // Reset other date filters when day wise is set
                specificDate: null,
                dateRange: [null, null],
            };
        case "SET_SPECIFIC_DATE":
            return {
                ...state,
                specificDate: action.payload,
                // Reset other date filters when specific date is set
                dayWise: null,
                dateRange: [null, null],
            };
        case "SET_DATE_RANGE":
            return {
                ...state,
                dateRange: action.payload,
                // Reset other date filters when date range is set
                dayWise: null,
                specificDate: null,
            };
        case "SET_SEARCH_QUERY":
            return { ...state, searchQuery: action.payload };
        case "RESET_FILTERS":
            return initialState;
        default:
            return state;
    }
}

/**
 * Custom hook for managing invoice filters
 * @returns Filter state and dispatch functions
 */
function useInvoiceFilters() {
    const [filters, dispatch] = useReducer(invoiceFilterReducer, initialState);

    // Convert filter state to API filter format
    const getApiFilters = useCallback((): InvoiceFilters => {
        const apiFilters: InvoiceFilters = {};

        if (filters.customerId !== null) {
            apiFilters.customerId = filters.customerId;
        }

        if (filters.paymentMode !== null && filters.paymentMode !== "--All--") {
            apiFilters.paymentMode = filters.paymentMode;
        }

        if (filters.status !== null && filters.status !== "--All--") {
            apiFilters.status = filters.status;
        }

        if (filters.dayWise !== null && filters.dayWise !== "--All--") {
            apiFilters.dayWise = filters.dayWise;
        }

        if (filters.specificDate !== null) {
            apiFilters.specificDate = filters.specificDate.format("YYYY-MM-DD");
        }

        if (filters.dateRange[0] !== null && filters.dateRange[1] !== null) {
            apiFilters.startDate = filters.dateRange[0].format("YYYY-MM-DD");
            apiFilters.endDate = filters.dateRange[1].format("YYYY-MM-DD");
        }

        if (filters.searchQuery.trim() !== "") {
            apiFilters.searchQuery = filters.searchQuery.trim();
        }

        return apiFilters;
    }, [filters]);

    // Helper functions for dispatching actions
    const setCustomer = useCallback((id: number | null) => {
        dispatch({ type: "SET_CUSTOMER", payload: id });
    }, []);

    const setPaymentMode = useCallback((mode: string | null) => {
        dispatch({ type: "SET_PAYMENT_MODE", payload: mode });
    }, []);

    const setStatus = useCallback((status: string | null) => {
        dispatch({ type: "SET_STATUS", payload: status });
    }, []);

    const setDayWise = useCallback((dayWise: string | null) => {
        dispatch({ type: "SET_DAY_WISE", payload: dayWise });
    }, []);

    const setSpecificDate = useCallback((date: Dayjs | null) => {
        dispatch({ type: "SET_SPECIFIC_DATE", payload: date });
    }, []);

    const setDateRange = useCallback((range: [Dayjs | null, Dayjs | null]) => {
        dispatch({ type: "SET_DATE_RANGE", payload: range });
    }, []);

    const setSearchQuery = useCallback((query: string) => {
        dispatch({ type: "SET_SEARCH_QUERY", payload: query });
    }, []);

    const resetFilters = useCallback(() => {
        dispatch({ type: "RESET_FILTERS" });
    }, []);

    // Check if any filters are active
    const hasActiveFilters = useCallback((): boolean => {
        return Object.keys(getApiFilters()).length > 0;
    }, [getApiFilters]);

    return {
        filters,
        getApiFilters,
        hasActiveFilters,
        setCustomer,
        setPaymentMode,
        setStatus,
        setDayWise,
        setSpecificDate,
        setDateRange,
        setSearchQuery,
        resetFilters,
    };
}

export default useInvoiceFilters;
