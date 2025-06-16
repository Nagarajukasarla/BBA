package com.bba.Backend.utils.enums;

import lombok.Getter;

@Getter
public enum DateFormat {
    YEAR_MONTH_DAY("yyyy-MM-dd'T'HH:mm:ss"),
    MONTH_YEAR("mm-dd"),
    DAY_MONTH_YEAR("dd-MM-yy"),
    YEAR_MONTH_DAY_HH_MM_SS("yyyy-MM-dd'T'HH:mm:ss");

    private final String format;

    DateFormat (String format) {
        this.format = format;
    }

    /*
    public String getFormat() {     Replaced by Lombok getter
        return format;
    }
    */

}
