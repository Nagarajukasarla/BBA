
/**
 * Constructs a JavaScript Date object from a formatted date string.
 * 
 * @param {string} dateString - The formatted date string in the format "YYYY-MM-DDThh:mm:ss".
 * @return {Date} The JavaScript Date object constructed from the formatted date string.
 */
export const constructDateWithFormattedString = (dateString) => {
    const [datePart, timePart] = dateString.split("T");
    const [day, month, year] = datePart.split("-").map(Number);
    const [hour, minute, second] = timePart.split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute, second);
};


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
 * @param {string} date "YYYY-MM-DDThh:mm:ss"
 * @returns date string in format -> "MM/YY"
 *
 **/
export const getMonthYearFormat = (date) => {
    if (date === undefined || date === null) {
        return;
    }
    let year = date.split("T")[0].split("-")[0].substring(2, 4);
    let month = date.split("T")[0].split("-")[1];
    return month + "/" + year;
};

/**
 *
 * @param {string} date format MM/YY
 * @returns formatted date time string -> "YYYY-MM-DDThh:mm:ss"
 *
 **/
export const getFormattedDate = (date) => {
    const day = "01";
    const time = "00:00:00";
    let month = date.split("/")[0];
    let year = date.split("/")[1];
    return `20${year}-${month}-${day}T${time}`;
};

/**
 * Converts a given date string to the day-month-year format.
 *
 * @param {string} date - The date string to be converted.
 * @return {string} The date in the format "dd-mm-yyyy".
 */
export const getDayMonthYearFormat = (date) => {
    const values = date.substring(0, 9).split("-");
    const day = values[2] < 10 ? "0" + values[2] : values[2];
    const month = values[1] < 10 ? "0" + values[1] : values[1];
    return `${day}-${month}-${values[0]}`;
};

/**
 * Converts a given formatted date string to day-month-year time format
 * @param {string} inputDate - The date string to be converted  
 * @returns {string} The date in the format "dd-mm-yyyy hh:mm:ss"
 */

export const getDayMonthYearWithTimeFormat = (inputDate) => {
    console.log(inputDate);
    const values = inputDate.split("T");
    const dateValues = values[0].split("-");
    return (
        dateValues[2] +
        "-" +
        dateValues[1] +
        "-" +
        dateValues[0].substring(2) +
        " " +
        values[1]
    );
};

export const isInDayBeforeYestarday = (inputDate) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let dayBeforeYestarday = new Date(today - ((1000 * 60 * 60) * 48));
    return (inputDate - dayBeforeYestarday >= 0.0) && (inputDate - dayBeforeYestarday < 24.0);
};

export const isInYestarday = (inputDate) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let yestarday = today - ((1000 * 60 * 60) * 24);
    return ((inputDate - yestarday >= 0.0) && (inputDate - yestarday < 24.0));
};

export const isInToday = (inputDate) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    return (inputDate - today >= 0.0);
};
