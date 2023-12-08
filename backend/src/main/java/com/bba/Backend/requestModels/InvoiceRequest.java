package com.bba.Backend.requestModels;

import com.bba.Backend.models.InvoiceItem;

import java.util.List;

public class InvoiceRequest {

    public Integer customerNumber;

    public String paymentMode;

    public List<InvoiceItem> items;

    public Double discount;

    public Double amount;
}
