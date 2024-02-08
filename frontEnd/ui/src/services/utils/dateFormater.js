/**
 *
 * @param void take no parameters
 * @returns current date in formatted date time string -> "YYYY-MM-DDThh:mm:ss"
 *
 **/
export const generateFormattedDateString = () => {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0, 19);
};

/**
 *
 * @param dateTimeString in format "YYYY-MM-DDThh:mm:ss"
 * @returns date string in format -> "MM/YY"
 *
 **/
export const getYearMonthFormat = (date) => {
    if (date === undefined || date === null) {
        return;
    }
    let year = date.split("T")[0].split("-")[0].substring(2, 4);
    let month = date.split("T")[0].split("-")[1];
    return month + "/" + year;
};

/**
 *
 * @param dateString in format MM/YY
 * @returns formatted date time string -> "YYYY-MM-DDThh:mm:ss"
 *
 **/
export const getFormattedDate = (date) => {
    const day = "01";
    const time = "00:00:00";
    let month = date.split("/")[0];
    let year = date.split("/")[1];
    return "20" + year + "-" + month + "-" + day + "T" + time;
};

/**
 * Converts a given date string to the day-month-year format.
 *
 * @param {string} date - The date string to be converted.
 * @return {string} The date in the format "dd-mm-yyyy".
 */
export const getDayMonthYearFormat = () => {
    const date = generateFormattedDateString();
    const values = date.substring(0, 9).split("-");
    return `${values[2] < 10 ? "0" + values[2] : values[2]}-${
        values[1] < 10 ? "0" + values[1] : values[1]
    }-${values[0]}`;
};
