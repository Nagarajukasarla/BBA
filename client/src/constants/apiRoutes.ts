const API_ROUTES = {
    AUTHENTICATE: "/auth/authenticate",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FETCH_LITE_SHOP: "/lite-shop",
    FETCH_SHOP: "/shop/:shopId",    // Verify the syntax
    UPDATE_SHOP: "/shop/:shopId/update",   // Verify the syntax
    FETCH_DASHBOARD: "/dashboard-stats",
    FETCH_CUSTOMERS: "/customers",
    FETCH_STOCKS: "/stocks",
};

export default API_ROUTES;