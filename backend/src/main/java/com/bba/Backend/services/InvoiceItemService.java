package com.bba.Backend.services;

import com.bba.Backend.dto.InvoiceItemDto;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface InvoiceItemService {
    void saveInvoiceItems (String invoiceNumber, List<InvoiceItemDto> items);

    ResponseEntity<?> getInvoiceItems(String invoiceNumber);
}
