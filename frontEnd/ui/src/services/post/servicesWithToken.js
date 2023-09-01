
export const getToken = () => {
    return localStorage.getItem("token");
};


// saving new company
export const createCompany = (token, companyName) => {
    fetch ("http://localhost:8080/api/v1/company/save", {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`,
        },
        body: JSON.stringify({
            name : companyName,
        }),
    })
        .then((response) => {
            if (response.ok) {
                console.log(response.json());
                // on successful response show a message(antd message component) at top of the page
            }
        })
        .catch((error) => {
            console.log(error);
            // on failed response show a message(antd message component) at top of the page
        })
};
