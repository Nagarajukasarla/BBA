package com.bba.Backend.dto;

import com.bba.Backend.models.Partner;

import java.util.List;

public class ShopDto {
    private String gstInNumber;
    private String name;
    private List<Partner> partners;
    private long budget;
    private long profit;
    private long loss;
}
