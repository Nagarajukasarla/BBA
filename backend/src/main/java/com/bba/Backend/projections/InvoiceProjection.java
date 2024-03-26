package com.bba.Backend.dto;

import com.bba.Backend.utils.DateTime;

import java.util.Date;

public interface InvoiceProjection {
     String getNumber();
     String getName();
     Double getAmount();
     String getGeneration_date();
     String getPayment_mode();
}
