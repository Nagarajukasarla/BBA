const API_ROUTES = {
    AUTHENTICATE: "/authenticate",
    LOGIN: "/auth/login",
    VERIFY_OTP: "/auth/verify-otp",
    REGISTER: "/auth/register",
    FETCH_LITE_SHOP: "/lite-shop",
    FETCH_SHOP: "/shop/:shopId", // Verify the syntax
    UPDATE_SHOP: "/shop/:shopId/update", // Verify the syntax
    FETCH_DASHBOARD: "/dashboard-stats",
    FETCH_CUSTOMERS: "/customers",
    FETCH_LITE_CUSTOMERS: "/lite-customers",
    FETCH_CUSTOMERS_WITH_BASIC_SALES: "/customers-with-basic-sales",
    FETCH_CUSTOMER_BY_ID: "/customers/:id",
    FETCH_STOCKS: "/stocks",
    FETCH_PRODUCTS: "/products",
    FETCH_PRODUCT_BY_ID: "/products/:id",
};

export default API_ROUTES;
