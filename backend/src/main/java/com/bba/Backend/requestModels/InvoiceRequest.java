package com.bba.Backend.requestModels;

public class InvoiceRequest {
    public Integer customerNumber;
    public String paymentMode;
    public List<InvoiceItem> items;
    public Double discount;
}
