package com.bba.Backend.services;

import com.bba.Backend.requestModels.InvoiceRequest;
import org.springframework.http.ResponseEntity;

public interface InvoiceService {

    ResponseEntity<?> saveInvoice(InvoiceRequest invoiceRequest);
}
