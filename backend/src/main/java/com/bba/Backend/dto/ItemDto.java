package com.bba.Backend.dto;

import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ItemDto {

    public Integer id;

    public String name;

    public String description;

    public Integer price;

    public Integer SGSTInPercent;

    public Integer CGSTInPercent;

    public Integer GSTInPercent;

    public Date manufacturingDate;

    public Date expiryDate;

    public Boolean isFastMoving;

}