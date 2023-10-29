package com.bba.Backend.utils.enums;

import lombok.Getter;

@Getter
public enum Month {
    Jan(1),
    Feb(2),
    Mar(3),
    Apr(4),
    May(5),
    Jun(6),
    Jul(7),
    Aug(8),
    Sep(9),
    Oct(10),
    Nov(11),
    Dec(12);

    private final Integer month;

    Month(Integer month) {
        this.month = month;
    }
}
