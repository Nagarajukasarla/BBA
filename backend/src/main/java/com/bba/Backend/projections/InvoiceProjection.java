package com.bba.Backend.projections;

import com.bba.Backend.utils.DateTime;

import java.util.Date;

public interface InvoiceProjection {
     String getNumber();
     Integer getCustomer_number();
     String getName();
     Double getAmount();
     Date getGeneration_date();
     String getPayment_mode();
}
