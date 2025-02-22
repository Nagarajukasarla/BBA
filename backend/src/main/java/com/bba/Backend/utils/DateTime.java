package com.bba.Backend.utils;

import com.bba.Backend.utils.enums.DateFormat;
import lombok.*;
import org.springframework.lang.NonNull;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Logger;

@Getter
@Setter
@Builder
@RequiredArgsConstructor
public class DateTime {
    private Integer year;
    private Integer month;
    private Integer day;
    private Integer hours;
    private Integer minutes;
    private Integer seconds;

    /**
     * This constructor creates DateTime by taking formattedDate.
     * Expected format : 2023-10-15T05:30:00
     * @param formattedDate should be NotNull
     *
     */

    public DateTime(String formattedDate) {
        if (formattedDate == null) return;
        String[] value = formattedDate.split("T");
        String date = value[0];
        String time = value[1];
        setYear(Integer.parseInt(date.split("-")[0]));
        setMonth(Integer.parseInt(date.split("-")[1]));
        setDay(Integer.parseInt(date.split("-")[2]));
        setHours(Integer.parseInt(time.split(":")[0]));
        setMinutes(Integer.parseInt(time.split(":")[1]));
        setSeconds(Integer.parseInt(time.split(":")[2]));
    }

    /**
     * This constructor creates DateTime all Integer values of Date
     * @param year should be an Integer
     * @param month should be an Integer
     * @param day should be an Integer
     * @param hours should be an Integer
     * @param minutes should be an Integer
     * @param seconds should be an Integer
     */

    public DateTime(Integer year, Integer month, Integer day, Integer hours, Integer minutes, Integer seconds) {
        setYear(year);
        setMonth(month);
        setDay(day);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
    }

    /**
     * This constructor creates DateTime all Integer values of Date
     * @param year should be an Integer
     * @param month should be an Integer
     * @param day should be an Integer
     */
    public DateTime(Integer year, Integer month, Integer day) {
        setYear(year);
        setMonth(month);
        setSeconds(day);
    }

    /**
     * This constructor create DateTime by taking Date, it works for two different date formats, Ex:
     * Format 1 -> Sun Oct 29 23:09:35 IST 2023
     * Format 2 -> 2023-10-15 05:30:00
     * @param date should be NotNull
     *
     */

    public DateTime (@NonNull Date date) {
        //  Date Format: Sun Oct 29 23:09:35 IST 2023
        String dateStr = date.toString();
        String[] values = dateStr.split(" ");
        if (values.length > 2) {
            setDate(values[5] + "-" + CustomizedCalender.getMonthValue(values[1]) + "-" + values[2]);
            setTime(values[3]);
        }
        else {
            setDate(values[0]);
            setTime(values[1]);
        }
    }

    /**
     * This method creates Date using formatted String. Example: 2023-10-15T05:30:00
     * @param formattedDate should be a valid-formatted Date string
     * @return Date
     */
    public static Date formatDate (String formattedDate) {
        if (formattedDate == null) return null;
        Logger logger = Logger.getLogger(DateTime.class.getName());
        SimpleDateFormat formatter = new SimpleDateFormat(DateFormat.YEAR_MONTH_DAY_HH_MM_SS.getFormat());
        try {
            return formatter.parse(formattedDate);
        }
        catch (ParseException e) {
            logger.info("Error while parsing date using formatDate()");
            return null;
        }
    }


    public String generateItemDateWith (DateFormat regex, char delimiter) {
        return switch (regex) {
            case YEAR_MONTH_DAY -> {
                String value = getFormat1();
                yield delimiter == '-' ? value : value.replaceAll("-", "/");
            }
            case MONTH_YEAR -> {
                String value = getFormat2();
                yield delimiter == '-' ? value : value.replaceAll("-", "/");
            }
            case DAY_MONTH_YEAR -> {
                String value = getFormat3();
                yield delimiter == '-' ? value : value.replaceAll("-", "/");
            }
            default -> "";
        };
    }

    private String getFormat1() {
        /*
            Format  : yyyy-MM-dd
            Example : 2023-10-15
        */
        return year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day);
    }

    private String getFormat2() {
        /*
            Format  : MM-yy
            Example : 10-23
        */
        return (month < 10 ? ("0" + month) : month) + "-" + (year % 100);
    }

    private String getFormat3() {
        /*
            Format  : dd-MM-yyyy
            Example : 15-10-2023
        */
        return ((day < 10) ? ("0" + day) : day) + "-" + ((month < 10) ? ("0" + month) : month) + "-" + (year % 100);
    }

    /**
     * This method creates a formatted date string. Format
     * @return formatted
     */

    public String getFormattedStringForDateGeneration() {
        /*
            Format : yyyy-MM-ddTHH:mm:ss
            Example : 2023-10-15T16:38:10
        */
        return  (
                year
                        + "-"
                        + ((month < 10) ? ("0" + month) : String.valueOf(month))
                        + "-"
                        + ((day < 10) ? ("0" + day) : day)
                        + 'T'
                        + ((hours < 10) ? ("0" + hours) : hours)
                        + ":"
                        + ((minutes < 10) ? ("0" + minutes) : minutes)
                        + ":"
                        + ((seconds < 10) ? ("0" + seconds) : seconds)
        );
    }

    private void setDate(String date) {
        String[] chunks = date.split("-");
        setYear(Integer.parseInt(chunks[0]));
        setMonth(Integer.parseInt(chunks[1]));
        setDay(Integer.parseInt(chunks[2]));
    }

    private void setTime(String time) {
        String[] chunks = time.split(":");
        setHours(Integer.parseInt(chunks[0]));
        setMinutes(Integer.parseInt(chunks[1]));
        setSeconds(Integer.parseInt((chunks[2].split("\\.")[0])));
    }

    @Override
    public String toString() {
        return getYear().toString()
                + "-"
                + getMonth()
                + "-"
                + getDay()
                + "T"
                + ((getHours() < 10) ? "0" + getHours() : getHours())
                + ":"
                + ((getMinutes() < 10) ? "0" + getMinutes() : getMinutes())
                + ":"
                + ((getSeconds() < 10) ? "0" + getSeconds() : getSeconds());
    }
}