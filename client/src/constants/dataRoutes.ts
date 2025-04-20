/**
 * Routes for accessing mock data during development
 * These mirror the API_ROUTES structure for easy replacement later
 */
const DATA_ROUTES = {
    AUTHENTICATE: "/authenticate",
    LOGIN: "/auth/login",
    VERIFY_OTP: "/auth/verify-otp",
    REGISTER: "/auth/register",
    FETCH_LITE_SHOP: "/lite-shop",
    FETCH_SHOP: "/shop/:shopId",
    UPDATE_SHOP: "/shop/:shopId/update",
    FETCH_DASHBOARD: "/dashboard-stats",
    FETCH_CUSTOMERS: "/customers",
    FETCH_LITE_CUSTOMERS: "/lite-customers",
    FETCH_CUSTOMER_BY_ID: "/customers/:id",
    FETCH_STOCKS: "/stocks",
    FETCH_INVOICES: "/invoices",
    FETCH_INVOICE_BY_ID: "/invoices/:id",
    FETCH_PRODUCTS: "/products",
    FETCH_PRODUCT_BY_ID: "/products/:id",
};

export default DATA_ROUTES;
