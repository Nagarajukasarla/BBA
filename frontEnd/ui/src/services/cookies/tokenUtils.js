export const getToken = () => {
    return localStorage.getItem("token");
};

export const setToken = (value) => {
    localStorage.setItem("token", value);
};
