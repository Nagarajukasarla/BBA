package com.bba.Backend.utils;

import java.util.HashMap;
import java.util.Map;

public class CustomizedCalender {
    public static Map<String, Integer> monthNameToValueMap = new HashMap<>();
    public static Map<String, Integer> dayNameToValueMap = new HashMap<>();

    static {
        monthNameToValueMap.put("Jan", 1);
        monthNameToValueMap.put("Feb", 2);
        monthNameToValueMap.put("Mar", 3);
        monthNameToValueMap.put("Apr", 4);
        monthNameToValueMap.put("May", 5);
        monthNameToValueMap.put("Jun", 6);
        monthNameToValueMap.put("Jul", 7);
        monthNameToValueMap.put("Aug", 8);
        monthNameToValueMap.put("Sep", 9);
        monthNameToValueMap.put("Oct", 10);
        monthNameToValueMap.put("Nov", 11);
        monthNameToValueMap.put("Dec", 12);

        dayNameToValueMap.put("Sun", 1);
        dayNameToValueMap.put("Mon", 2);
        dayNameToValueMap.put("Tue", 3);
        dayNameToValueMap.put("Wed", 4);
        dayNameToValueMap.put("Thu", 5);
        dayNameToValueMap.put("Fri", 6);
        dayNameToValueMap.put("Sat", 7);
    }

    public static Integer getMonthValue (String month) {
        return monthNameToValueMap.getOrDefault(month, -1);
    }

    public static Integer getDayValue (String day) {
        return dayNameToValueMap.getOrDefault(day, -1);
    }
}
