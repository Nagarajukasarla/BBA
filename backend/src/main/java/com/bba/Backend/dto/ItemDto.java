package com.bba.Backend.dto;

import java.util.Date;

public class ItemDto {

    private Integer id;

    private String name;

    private String description;

    private Integer price;

    private Integer SGSTInPercent;

    private Integer CGSTInPercent;

    private Integer GSTInPercent;

    private Date manufacturingDate;

    private Date expiryDate;

    private boolean isFastMoving;

}