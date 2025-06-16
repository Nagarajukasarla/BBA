class CustomerLocalManager {
    static setCustomers(value) {
        localStorage.setItem('fx_cst', JSON.stringify(value));
    }

    static getCustomers() {
        const customers = localStorage.getItem("fx_cst");
        if (customers && customers.length > 0) {
            return JSON.parse(customers);
        }
        return [];
    }
}

export default CustomerLocalManager;