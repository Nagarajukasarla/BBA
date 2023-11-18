/**
 * 
 * @param dateTimeString in format "YYYY-MM-DDThh:mm:ss" 
 * @returns date string in format -> "MM/YY"
 * 
 **/
export const getYearMonthFormat = (date) => {
    console.log(date);
    if (date === undefined) {
        return;
    }
    let year = (date.split("T")[0].split("-")[0]).substring(2, 4);
    let month = (date.split("T")[0].split("-")[1]);
    console.log("Month: " + month);
    console.log("Year: " + year);
    return month + "/" + year;
};


/**
 * 
 * @param dateString in format MM/YY
 * @returns formatted date time string -> "YYYY-MM-DDThh:mm:ss"
 * 
 **/
export const setFormattedDate = (date) => {
    const day = "01";
    const time = "00:00:00";
    let month = date.split("/")[0];
    let year = date.split("/")[1];
    return "20" + year + "-" + month + "-" + day + "T" + time;
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

