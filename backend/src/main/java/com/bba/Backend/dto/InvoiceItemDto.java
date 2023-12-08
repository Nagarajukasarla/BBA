package com.bba.Backend.dto;


import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceItemDto {

    public Integer id;

    public String name;

    public Integer customerNumber;

    public Integer itemBatchNumber;

    public Double rate;

    public Integer quantity;

    public Double discount;

    public Double price;
}