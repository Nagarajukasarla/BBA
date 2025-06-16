/**
 * Returns the status object based on the input status code.
 *
 * @param {number} status - The status code to be used for determining the status object.
 * @return {object} The status object containing code, type, and description properties.
 */
export const getStatus = (status) => {
    switch (status) {
        case 401:
            return {
                code: 401,
                type: "Unauthorized",
                description: "You have invalid access to request the server",
            }
        case 403:
            return {
                code: 403,
                type: "Forbidden",
                description:
                    "You have valid access to server but unauthorized to the source you are requesting",
            }
        case 500:
            return {
                code: 500,
                type: "Server is not started",
                description:
                    "Server encountered an unexpected condition that prevented it from fulfilling the request",
            }
        case 404:
            return {
                code: 404,
                type: "Not Found",
                description: "The end point you're requesting is not available",
            }
        default:
            return {
                code: status.toString(),
                type: "Unknown",
                description: "Unknown status coede",
            }
    }
};
