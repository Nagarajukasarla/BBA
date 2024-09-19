/**
 * Validates the given object to ensure that all fields are not empty, undefined, or null.
 *
 * @param {Object|Array} obj - the object or array to be validated
 * @return {boolean} true if all fields are not empty, undefined, or null; false otherwise
 */

import DateHelper from "../helpers/client/DateHelper";

export const validate = (obj) => {
    if (Array.isArray(obj)) {
        for (const field of obj) {
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

export const vaidateMonthYearDateFields = (dateFields) => {
    for (const date of dateFields) {
        if (date.length < 5 && date[0] === "0") {
            return false;
        } else if (date[0] === "0" && date[1] === "0") {
            return false;
        }
    }
    return validateDatesRanges(dateFields) && true;
};

export const validateDatesRanges = (dateFields = []) => {
    const valideState = dateFields.every((item) => item && item !== '');
    if (!valideState) return false;
    if (dateFields && dateFields.length > 1) {
        if (dateFields[0].length <= 5) {
            const startDate = DateHelper.parseMonthYearToFormattedDate(dateFields[0]);
            const endDate = DateHelper.parseMonthYearToFormattedDate(dateFields[1]);
            return DateHelper.isStartDateEarlierThanEndDate(startDate, endDate);
        }

        // When formatted date(YYYY-MM-DDThh:mm:ss) is passed
        else {
            return DateHelper.isStartDateEarlierThanEndDate(dateFields[0], dateFields[1]);
        }
    }
};

