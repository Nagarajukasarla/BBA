package com.bba.Backend.implementation;

import com.bba.Backend.dto.InvoiceFilterRequest;
import com.bba.Backend.models.Invoice;
import com.bba.Backend.repositories.InvoiceRepository;
import com.bba.Backend.requestModels.InvoiceRequest;
import com.bba.Backend.services.InvoiceService;
import com.bba.Backend.utils.DateTime;
import com.bba.Backend.utils.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;


@Service
@RequiredArgsConstructor
public class InvoiceServiceImplements implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final InvoiceItemImplements invoiceItemImplements;
    private final Mapper mapper;
    private final Logger logger = Logger.getLogger(InvoiceServiceImplements.class.getName());

    @Override
    public ResponseEntity<?> saveInvoice(@NonNull InvoiceRequest invoiceRequest) {
        var newInvoiceNumber = invoiceRepository.getNextInvoiceNumber() + "";
        var invoice = Invoice.builder()
                .customerNumber(invoiceRequest.customerNumber)
                .number(newInvoiceNumber)
                .paymentMode(invoiceRequest.paymentMode)
                .amount(invoiceRequest.amount)
                .generationDate(DateTime.formatDate(invoiceRequest.getGenerationDate()))
                .build();

        var result = invoiceRepository.save(invoice);
        invoiceItemImplements.saveInvoiceItems(result.getNumber(), invoiceRequest.items);
        logger.info(result.getNumber() + " - is successfully saved");
        return ResponseEntity.ok(result.getNumber());
    }

    @Override
    public ResponseEntity<?> getAllInvoices() {
        var invoices = invoiceRepository.getInvoices();
        return ResponseEntity.ok(invoices
                .parallelStream()
                .map(mapper::mapInvoiceProjectionToInvoiceDto));
    }

    @Override
    public ResponseEntity<?> getFilteredInvoices(InvoiceFilterRequest invoiceFilterRequest) {
        var filteredInvoices = invoiceRepository.getFilteredInvoices(
                invoiceFilterRequest.getCustomerNumber(),
                invoiceFilterRequest.getPaymentMode(),
                invoiceFilterRequest.getStatus(),
                invoiceFilterRequest.getStartDate(),
                invoiceFilterRequest.getEndDate());

        return ResponseEntity.ok(filteredInvoices
                .parallelStream()
                .map(mapper::mapInvoiceProjectionToInvoiceDto));
    }
}