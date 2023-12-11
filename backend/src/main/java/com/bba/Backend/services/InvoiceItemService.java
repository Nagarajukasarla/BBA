package com.bba.Backend.services;

import com.bba.Backend.dto.InvoiceItemDto;

import java.util.List;

public interface InvoiceItemService {
    void saveInvoiceItem (String invoiceNumber, List<InvoiceItemDto> items);
}
