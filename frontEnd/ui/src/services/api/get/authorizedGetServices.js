import { getStatus } from "../statusUtils/responseStatus";


// Validating user
export const authenticate = async (token) => {
    try {
        const response = await fetch("http://localhost:8080/api/v1/demo-controller", {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return true;
        }
        else {
            if (response.status === 500) {
                alert("Internal Server Error");
                return false;
            }
        }
    }
    catch (error) {
        if (error.message.includes("ERR_CONNECTION_REFUSED")) {
            return false;
        }
    }
};

export const getAllProducts = async (token) => {
    try {
        const response = await fetch("http://localhost:8080/api/v1/product/get-items", {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw new Error(getStatus(response.status));
        }
    }
    catch (error) {
        throw error;
    }
};


export const getAllCustomers  = async (token) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/customer/get-all', {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw new Error(getStatus(response.status));
        }
    }
    catch (error) {
        throw error;
    }
};