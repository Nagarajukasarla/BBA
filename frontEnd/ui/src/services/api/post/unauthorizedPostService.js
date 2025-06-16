import { apiUrl } from "../../../config";


export const login = async (email, password) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/auth/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(
                `Server responded with an error: ${errorData.message}`
            );
            return false;
        }

        const data = await response.json();
        return data;        
    }
    catch (error) {
        if (error.name === "TypeError") {
            console.log("Network error or resource unavailable. Please check your internet connection.");
        }
        else {
            console.log(`Unexpected error occured while login: ${error}`);
        }
        return false;
    }
};