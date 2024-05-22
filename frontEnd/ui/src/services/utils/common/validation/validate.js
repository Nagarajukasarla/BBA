/**
 * Validates the given object to ensure that all fields are not empty, undefined, or null.
 *
 * @param {Object|Array} obj - the object or array to be validated
 * @return {boolean} true if all fields are not empty, undefined, or null; false otherwise
 */

export const validate = (obj) => {
    if (Array.isArray(obj)) {
        for (const field in obj) {
            if (field === "" || field === undefined || field === null) {
                return false;
            }
        }
        return true;
    }
    
    for (const value of Object.values(obj)) {
        if (value === "" || value === undefined || value === null) {
            return false;
        }
    }

    return true;
};