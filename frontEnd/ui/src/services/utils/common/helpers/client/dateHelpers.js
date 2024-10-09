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
    const currentDate = new Date().toLocaleString();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

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
 * @param {string} date format MM/YY or M/YY
 * @returns formatted date time string -> "YYYY-MM-DDThh:mm:ss"
 *
 **/
export const getFormattedDate = (date) => {
    if (date.length < 5) date = `0${date}`;
    const day = "01";
    const time = "00:00:00";
    let month = date.split("/")[0];
    let year = date.split("/")[1];
    return `20${year}-${month}-${day}T${time}`;
};

/**
 * Returns a formatted string representing the given date in the format "YYYY-MM-DDThh:mm:ss".
 *
 * @param {Date} date - The date to format. Defaults to the current date if not provided.
 * @return {string} The formatted date string.
 */
const getFormattedStringWithDate = (date) => {
    const value =  `${date.getFullYear()}-${
        (date.getMonth() + 1).toString().padStart(2, "0")
    }-${date.getDate().toString().padStart(2, "0")}T${date
        .getHours().toString()
        .padStart(2, "0")
    }:${date.getMinutes().toString().padStart(2, "0")}:${date
        .getSeconds().toString()
        .padStart(2, "0")}`;

    return value;
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

/**
 * Checks if the given input date is within the day before yesterday.
 *
 * @param {Date} inputDate - The date to be checked.
 * @return {boolean} Returns true if the input date is within the day before yesterday, false otherwise.
 */
export const isInDayBeforeYestarday = (inputDate) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let dayBeforeYestarday = new Date(today - 1000 * 60 * 60 * 48);
    console.log(dayBeforeYestarday);
    return (
        inputDate - dayBeforeYestarday >= 0.0 &&
        inputDate - dayBeforeYestarday < 24.0
    );
};

/**
 * Checks if the given input date is within the last 24 hours.
 *
 * @param {Date} inputDate - The date to be checked.
 * @return {boolean} Returns true if the input date is within the last 24 hours, false otherwise.
 */
export const isInYestarday = (inputDate) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let yestarday = today - 1000 * 60 * 60 * 24;
    return inputDate - yestarday >= 0.0 && inputDate - yestarday < 24.0;
};

/**
 * Checks if the given input date is within the current day.
 *
 * @param {Date} inputDate - The date to be checked.
 * @return {boolean} Returns true if the input date is within the current day, false otherwise.
 */
export const isInToday = (inputDate) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate - today >= 0.0;
};

/**
 * Returns an array of two formatted strings representing the start and end dates of today.
 * The start date is set to the beginning of the day (00:00:00) and the end date is set to the end of the day (23:59:59).
 *
 * @return {Array<string>} An array containing two formatted strings representing the start and end dates of today.
 */
export const getTodayDateRange = () => {
    let startDate = new Date();
    let endDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 59);
    return {
        "startDate": getFormattedStringWithDate(startDate), 
        "endDate": getFormattedStringWithDate(endDate)
    };
};

/**
 * Returns an array of two formatted strings representing the start and end dates of the previous day.
 * The start date is set to the beginning of the day (00:00:00) and the end date is set to the end of the day (23:59:59).
 *
 * @return {Array<string>} An array containing two formatted strings representing the start and end dates of the previous day.
 */
export const getYestardayDateRange = () => {
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const today = new Date();
    let yestardayStartDate = new Date(today - millisecondsInDay);
    let yestardayEndDate = new Date(today - millisecondsInDay);
    yestardayStartDate.setHours(0, 0, 0, 0);
    yestardayEndDate.setHours(23, 59, 59, 59);
    return {
        "startDate": getFormattedStringWithDate(yestardayStartDate), 
        "endDate": getFormattedStringWithDate(yestardayStartDate)
    };
};

/**
 * Returns an array of two formatted strings representing the start and end dates of the day before yesterday.
 * The start date is set to the beginning of the day (00:00:00) and the end date is set to the end of the day (23:59:59).
 *
 * @return {Array<string>} An array containing two formatted strings representing the start and end dates of the day before yesterday.
 */
export const getDayBeforeYestardayDateRange = () => {
    const millisecondsInTwoDays = 1000 * 60 * 60 * 48;
    const today = new Date();
    let dayBeforeYestardayStartDate = new Date(today - millisecondsInTwoDays);
    let dayBeforeYestardayEndDate = new Date(today - millisecondsInTwoDays);
    dayBeforeYestardayStartDate.setHours(0, 0, 0, 0);
    dayBeforeYestardayEndDate.setHours(23, 59, 59, 59);
    return {
        "startDate": getFormattedStringWithDate(dayBeforeYestardayStartDate), 
        "endDate": getFormattedStringWithDate(dayBeforeYestardayEndDate)
    };
};

export const getSpecificDateRange = (date) => {
    let specificDayStartDate = new Date(date);
    let specificDayEndDate = new Date(date);
    specificDayStartDate.setHours(0, 0, 0, 0);
    specificDayEndDate.setHours(23, 59, 59, 59);
    return {
        "startDate": getFormattedStringWithDate(specificDayStartDate),
        "endDate": getFormattedStringWithDate(specificDayEndDate)
    };
};

export const getCustomDatesRange = (startDate, endDate) => {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 59);
    return {
        "startDate": getFormattedStringWithDate(startDate),
        "endDate": getFormattedStringWithDate(endDate)
    };
};


/**
 * Checks if the start date is earlier than the end date.
 * 
 * @param {string} startDate - The start date in "YYYY-MM-DDThh:mm:ss" format.
 * @param {string} endDate - The end date in "YYYY-MM-DDThh:mm:ss" format.
 * @returns {boolean} Returns true if the start date is earlier than the end date, false otherwise.
 */
export const isStartEarlierThanEndDate = (startDate, endDate) => {
    //startDate format YYYY-MM-DDThh:mm:ss
    //startDate format YYYY-MM-DDThh:mm:ss
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    return startDateObj < endDateObj;
};


// ===================================================================================



