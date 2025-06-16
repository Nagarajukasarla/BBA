package com.bba.Backend.utils.enums;

import lombok.Getter;

@Getter
public enum Days {
    MON("Mon"),
    TUE("Tue"),
    WED("Wed"),
    THU("Thu"),
    FRI("Fri"),
    SAT("Sat"),
    SUN("Sun");

    private final String day;

    Days(String val) {
        this.day = val;
    }
}
