
// saving new company
export const createCompany = async (token, companyName) => {
    try {
        const response = await fetch("http://localhost:8080/api/v1/company/save", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
            body: JSON.stringify({
                name : companyName,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return true;
        }
        else {
            // HANDLE ERROR based response status, before fix GITHUB_ISSUE #12
            return false;
        }
    }
    catch (error) {
        console.error(error);
        return false;
    }
};

// Fectching product
export const getProduct = async (productName, token) => {
    try {
        const response = await fetch ("http://localhost:8080/api/v1/product/get", {
            method: "POST", 
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: productName
            }),
        });
        return (response.ok) ? await response.json() : null;
    }
    catch (error) {
        console.error(`Error while fetching product: ${error}`);
    }
};


// Saving new product

export const saveProduct = async (product, token) => {
    try {
        const response = await fetch("http://localhost:8080/api/v1/product/save", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: product.name,
                companyName: product.companyName,
                quantity: product.quantity,
                manufacturingDate: product.manufacturingDate,
                expiryDate: product.expiryDate,
                sGst: product.sGst,
                cGst: product.cGst,
                iGst: product.iGst,
                price: product.price,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return true;
        }
        else {
            // HANDLE ERROR based response status, before fix GITHUB_ISSUE #12
            return false;
        }
    }
    catch (error) {
        console.error(`Error in saving prouct: ${error}`);
        return false;
    }
};