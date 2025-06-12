import { CustomerFilters, CustomerFilterAction } from "@/types/filters";
import { useCallback, useReducer } from "react";

const initialState: CustomerFilters = {
    city: null,
    town: null,
    viewType: null,
    searchQuery: "",
};

// Reducer function for customer filters
function customerFilterReducer(state: CustomerFilters, action: CustomerFilterAction): CustomerFilters {
    switch (action.type) {
        case "SET_CITY":
            return { ...state, city: action.payload };
        case "SET_TOWN":
            return { ...state, town: action.payload };
        case "SET_VIEW_TYPE":
            return { ...state, viewType: action.payload };
        case "SET_SEARCH_QUERY":
            return { ...state, searchQuery: action.payload };
        case "RESET_FILTERS":
            return initialState;
        default:
            return state;
    };
}
    
function useCustomerFilters() {
    const [filters, dispatch] = useReducer(customerFilterReducer, initialState);
    
    const getApiFilters = useCallback((): CustomerFilters => {
        const apiFilters: CustomerFilters = {};

        if (filters.city !== null) {
            apiFilters.city = filters.city;
        }

        if (filters.town !== null) {
            apiFilters.town = filters.town;
        }

        if (filters.viewType !== null) {
            apiFilters.viewType = filters.viewType;
        }

        if (filters.searchQuery?.trim() !== "") {
            apiFilters.searchQuery = filters.searchQuery?.trim();
        }

        return apiFilters;
    }, [filters]);

    // Helper functions for dispatching actions
    const setCity = useCallback((city: string | null) => {
        dispatch({ type: "SET_CITY", payload: city });
    }, []);

    const setTown = useCallback((town: string | null) => {
        dispatch({ type: "SET_TOWN", payload: town });
    }, []);

    const setViewType = useCallback((viewType: string | null) => {
        dispatch({ type: "SET_VIEW_TYPE", payload: viewType });
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
        setCity,
        setTown,
        setViewType,
        setSearchQuery,
        resetFilters,
    };
}
    
export default useCustomerFilters;
