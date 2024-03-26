package com.bba.Backend.projections;

public interface InvoiceItemProjection {

     Integer getId();

     String getItemName();

     String getCompany();

     String getInvoiceNumber();

     String getItemBatchNumber();

     Double getRate();

     Integer getQuantity();

     Double getDiscount();

     Double getPrice();

}
