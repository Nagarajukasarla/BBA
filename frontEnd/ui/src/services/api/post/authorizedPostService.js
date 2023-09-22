
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



// Saving new product
export const saveProduct = async (product, token) => {
    try {
        const response = fetch("http://localhost:8080/api/v1/product/save", {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: product.name,
                company: product.companyName,
                quantity: product.quantity,
                batchNumber: product.batchNumber,
                manufacturingDate: product.manufacturingDate,
                expiryDate: product.expiryDate,
                SGSTInPercent: product.sGst,
                CGSTInPercent: product.cGst,
                IGSTInPercent: product.iGst,
                rate: product.rate,
                isFastMoving: false
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