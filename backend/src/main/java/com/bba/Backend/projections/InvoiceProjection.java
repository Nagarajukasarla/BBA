package com.bba.Backend.projections;

import com.bba.Backend.utils.BigDecimalDeserializer;

import java.math.BigDecimal;
import java.util.Date;

public interface InvoiceProjection {
     Long getId();

     String getInvoice_number();

     Integer getCustomer_number();

     String getCustomer_name();

     String getArea();

     String getCity();

     String getState();

     BigDecimal getAmount();

     Date getGeneration_date();

     String getPayment_mode();

     String getStatus();
}
