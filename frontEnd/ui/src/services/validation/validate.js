/**
 * 
 * @param fields validates all fields of an object
 * @returns True if all fields in object are not empty False otherwise
 */

export const validate = (fields) => {
    for (let key in fields) {
        if (fields[key] === "") {
            return false;
        }
    }
    return true;
};