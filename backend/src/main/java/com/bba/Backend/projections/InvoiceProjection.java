package com.bba.Backend.projections;

import java.util.Date;

public interface InvoiceProjection {
     Integer getId();

     String getInvoice_number();

     Integer getCustomer_number();

     String getCustomer_name();

     String getArea();

     String getCity();

     String getState();

     Double getAmount();

     Date getGeneration_date();

     String getPayment_mode();

     String getStatus();
}
