
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
    }
    catch (error) {
        if (error.message.includes("ERR_CONNECTION_REFUSED")) {
            return false;
        }
    }
};
