package com.bba.Backend.implementation;

import com.bba.Backend.models.Invoice;
import com.bba.Backend.repositories.InvoiceRepository;
import com.bba.Backend.requestModels.InvoiceRequest;
import com.bba.Backend.services.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class InvoiceServiceImplements implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    @Override
    public ResponseEntity<?> saveInvoice(InvoiceRequest invoiceRequest) {
        var newInvoiceNumber = "INV" + invoiceRepository.getNextInvoiceNumber();
        var invoice = Invoice.builder()
                .customerNumber(invoiceRequest.customerNumber)
                .number(newInvoiceNumber)
                .paymentMode(invoiceRequest.paymentMode)
                .amount(invoiceRequest.amount)
                .
    }
}
