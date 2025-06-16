package com.bba.Backend.services;

import com.bba.Backend.dto.InvoiceFilterRequest;
import com.bba.Backend.requestModels.InvoiceRequest;
import com.bba.Backend.requestModels.InvoiceWithItemsRequest;
import org.springframework.http.ResponseEntity;

public interface InvoiceService {

    ResponseEntity<?> saveInvoice(InvoiceRequest invoiceRequest);
    ResponseEntity<?> getAllInvoices();
    ResponseEntity<?> getFilteredInvoices(InvoiceFilterRequest invoiceFilterRequest);
    ResponseEntity<?> saveInvoiceWithItems(InvoiceWithItemsRequest invoiceWithItemsRequest);
}
