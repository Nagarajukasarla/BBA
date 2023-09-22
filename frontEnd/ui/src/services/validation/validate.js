export const validate = (values) => {
    for (let key in values) {
        if (values[key] === "") {
            return false;
        }
    }
    return true;
};