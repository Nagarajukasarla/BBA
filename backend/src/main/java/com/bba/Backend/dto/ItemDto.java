package com.bba.Backend.dto;

import jakarta.persistence.Column;
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

    public String company;

    public Integer quantity;

    public String batchNumber;

    public Integer rate;

    public Integer sGstInPercent;

    public Integer cGstInPercent;

    public Integer iGstInPercent;

    public Date manufacturingDate;

    public Date expiryDate;

    public Boolean isFastMoving;

}