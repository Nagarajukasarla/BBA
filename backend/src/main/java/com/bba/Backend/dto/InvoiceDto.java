package com.bba.Backend.dto;

import com.bba.Backend.models.Customer;
import com.bba.Backend.models.Item;

import java.util.Date;
import java.util.List;

public class InvoiceDto {

    private String id;

    private Integer number;

    private Date generationDate;

    private List<Item> items;

    private Customer customer;
}