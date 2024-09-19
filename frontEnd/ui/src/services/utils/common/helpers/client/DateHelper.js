class DateHelper {
    /**
     * Constructs a JavaScript Date object from a formatted date string.
     * @param {string} dateString - The formatted date string in the format "YYYY-MM-DDThh:mm:ss".
     * @return {Date} The JavaScript Date object.
     */
    static parseFormattedDateString(dateString) {
        const [datePart, timePart] = dateString.split("T");
        const [year, month, day] = datePart.split("-").map(Number);
        const [hour, minute, second] = timePart.split(":").map(Number);
        return new Date(year, month - 1, day, hour, minute, second);
    }

    /**
     * Generates the current date as a formatted string "YYYY-MM-DDThh:mm:ss".
     * @return {string} The current date as a formatted string.
     */
    static getCurrentFormattedDateString() {
        const currentDate = new Date();
        return currentDate.toISOString().substring(0, 19);
    }

    /**
     * Converts a formatted date string to "MM/YY" format.
     * @param {string} dateString - The formatted date string in "YYYY-MM-DDThh:mm:ss".
     * @return {string} The date in "MM/YY" format.
     */
    static formatToMonthYear(dateString) {
        if (!dateString) return null;
        const [year, month] = dateString.split("T")[0].split("-");
        return `${month}/${year.substring(2, 4)}`;
    }

    /**
     * Converts a "MM/YY" string to a formatted date string "YYYY-MM-DDThh:mm:ss".
     * @param {string} monthYear - The date string in "MM/YY" format.
     * @return {string} The formatted date string "YYYY-MM-DDThh:mm:ss".
     */
    static parseMonthYearToFormattedDate(monthYear) {
        const [month, year] = monthYear.split("/");
        const day = "01";
        const time = "00:00:00";
        return `20${year}-${month.length < 2 ? '0' + month : month}-${day}T${time}`;
    }

    /**
     * Returns a formatted string representing the given date in "YYYY-MM-DDThh:mm:ss".
     * @param {Date} date - The date object. Defaults to the current date if not provided.
     * @return {string} The formatted date string.
     */
    static formatDateToString(date = new Date()) {
        return `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date
            .getDate()
            .toString()
            .padStart(2, "0")}T${date
            .getHours()
            .toString()
            .padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${date
            .getSeconds()
            .toString()
            .padStart(2, "0")}`;
    }

    /**
     * Converts a formatted date string to "DD-MM-YYYY".
     * @param {string} dateString - The formatted date string "YYYY-MM-DDThh:mm:ss".
     * @return {string} The date in "DD-MM-YYYY" format.
     */
    static formatToDayMonthYear(dateString) {
        const [year, month, day] = dateString.split("T")[0].split("-");
        return `${day}-${month}-${year}`;
    }

    /**
     * Converts a date string to "DD-MM-YY hh:mm:ss".
     * @param {string} dateString - The formatted date string "YYYY-MM-DDThh:mm:ss".
     * @return {string} The date in "DD-MM-YY hh:mm:ss" format.
     */
    static formatToDayMonthYearWithTime(dateString) {
        const [datePart, timePart] = dateString.split("T");
        const [year, month, day] = datePart.split("-");
        return `${day}-${month}-${year.substring(2)} ${timePart}`;
    }

    /**
     * Checks if a date is within the day before yesterday.
     * @param {Date} date - The date to check.
     * @return {boolean} True if the date is within the day before yesterday, false otherwise.
     */
    static isInDayBeforeYesterday(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dayBeforeYesterday = new Date(today - 1000 * 60 * 60 * 48);
        return (
            date >= dayBeforeYesterday &&
            date < new Date(today - 1000 * 60 * 60 * 24)
        );
    }

    /**
     * Checks if a date is within yesterday.
     * @param {Date} date - The date to check.
     * @return {boolean} True if the date is within yesterday, false otherwise.
     */
    static isInYesterday(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today - 1000 * 60 * 60 * 24);
        return date >= yesterday && date < today;
    }

    /**
     * Checks if a date is within the current day.
     * @param {Date} date - The date to check.
     * @return {boolean} True if the date is within today, false otherwise.
     */
    static isInToday(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    }

    /**
     * Gets the date range for today as an object with start and end dates.
     * @return {Object} The start and end date strings in "YYYY-MM-DDThh:mm:ss" format.
     */
    static getTodayDateRange() {
        const startDate = new Date();
        const endDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        return {
            startDate: this.formatDateToString(startDate),
            endDate: this.formatDateToString(endDate),
        };
    }

    /**
     * Gets the date range for yesterday as an object with start and end dates.
     * @return {Object} The start and end date strings in "YYYY-MM-DDThh:mm:ss" format.
     */
    static getYesterdayDateRange() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const startDate = new Date(yesterday);
        const endDate = new Date(yesterday);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        return {
            startDate: this.formatDateToString(startDate),
            endDate: this.formatDateToString(endDate),
        };
    }

    /**
     * Gets the date range for the day before yesterday.
     * @return {Object} The start and end date strings in "YYYY-MM-DDThh:mm:ss" format.
     */
    static getDayBeforeYesterdayDateRange() {
        const dayBeforeYesterday = new Date();
        dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);
        const startDate = new Date(dayBeforeYesterday);
        const endDate = new Date(dayBeforeYesterday);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        return {
            startDate: this.formatDateToString(startDate),
            endDate: this.formatDateToString(endDate),
        };
    }

    /**
     * Gets the date range for a specific date.
     * @param {Date} date - The specific date.
     * @return {Object} The start and end date strings in "YYYY-MM-DDThh:mm:ss" format.
     */
    static getSpecificDateRange(date) {
        const startDate = new Date(date);
        const endDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        return {
            startDate: this.formatDateToString(startDate),
            endDate: this.formatDateToString(endDate),
        };
    }

    /**
     * Gets the date range for custom start and end dates.
     * @param {Date} startDate - The start date.
     * @param {Date} endDate - The end date.
     * @return {Object} The start and end date strings in "YYYY-MM-DDThh:mm:ss" format.
     */
    static getCustomDateRange(startDate, endDate) {
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        return {
            startDate: this.formatDateToString(startDate),
            endDate: this.formatDateToString(endDate),
        };
    }

    /**
     * Converts a date string from "DD-MM-YYYY" format to "YYYY-MM-DDThh:mm:ss" format.
     * @param {string} date - The date string in "DD-MM-YYYY" format.
     * @return {string} The date string in "YYYY-MM-DDThh:mm:ss" format.
     */
    static parseDayMonthYearToFormattedString(date) {
        if (date && date !== "") {
            const [year, month, day] = date.split("-");
            const time = "00:00:00";
            return `${year}-${month}-${day}T${time}`;
        }
        return "undefined";
    }

    /**
     * Checks if the start date is earlier than the end date.
     *
     * @param {string} startDate - The start date in "YYYY-MM-DDThh:mm:ss" format.
     * @param {string} endDate - The end date in "YYYY-MM-DDThh:mm:ss" format.
     * @returns {boolean} Returns true if the start date is earlier than the end date, false otherwise.
     */
    static isStartDateEarlierThanEndDate(startDate, endDate) {
        //startDate format YYYY-MM-DDThh:mm:ss
        //startDate format YYYY-MM-DDThh:mm:ss
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        return startDateObj < endDateObj;
    };
}

export default DateHelper;
