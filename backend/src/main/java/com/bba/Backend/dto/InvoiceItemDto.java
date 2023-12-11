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

    public String itemName;

    public String company;

    public String invoiceNumber;

    public String itemBatchNumber;

    public Double rate;

    public Integer quantity;

    public Double discount;

    public Double price;
}