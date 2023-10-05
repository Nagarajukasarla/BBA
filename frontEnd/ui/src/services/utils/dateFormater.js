export const getYearMonthFormat = (date) => {
    console.log(date);
    if (date === undefined) {
        return;
    }
    let month = date.split("T")[0].split("-")[1];
    let year = date.split("T")[0].split("-")[0];
    console.log("Month: " + month);
    console.log("Year: " + year);
    return month + "/" + year;
};


export const setFormattedDate = (date) => {
    const day = "01";
    const time = "00:00:00";
    let month = date.split("/")[0];
    let year = date.split("/")[1];
    return year + "-" + month + "-" + day + "T" + time;
}