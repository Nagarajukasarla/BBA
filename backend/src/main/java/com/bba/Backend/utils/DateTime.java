package com.bba.Backend.utils;

public class DateTime {
    private static int day;
    private static int month;
    private static int year;
    private static int hour;
    private static int minute;
    private static int seconds;

    private int yearFormat () {
        return year % 100;
    }
    public String getItemDateFormat () {
        String date = "";
        if (day < 10) {
            date += "0";
        }
        date += (day + "/" + yearFormat());
        return date;
    }
}