/**
 * @Created \
 * Returns the corresponding status message based on the given status code.
 *
 * @param {number} status - The status code to determine the status message for.
 * @return {string} The status message corresponding to the given status code.
 */

export const getStatus = ( status ) => {
    if (status === 401) {
        return "Unauthorized";
    }
    else if (status === 403) {
        return "Forbidden";
    }
    else if (status === 500) {
        return "Server is not started";
    }
    else if (status === 404) {
        return "Not found";
    }
    else {
        return status.toString();
    }
};