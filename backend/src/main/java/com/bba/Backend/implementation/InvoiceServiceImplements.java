package com.bba.Backend.implementation;

import com.bba.Backend.dto.InvoiceFilterRequest;
import com.bba.Backend.models.Invoice;
import com.bba.Backend.repositories.InvoiceRepository;
import com.bba.Backend.requestModels.InvoiceRequest;
import com.bba.Backend.requestModels.InvoiceWithItemsRequest;
import com.bba.Backend.services.InvoiceService;
import com.bba.Backend.utils.DateTime;
import com.bba.Backend.utils.Mapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;


@Service
@RequiredArgsConstructor
public class InvoiceServiceImplements implements InvoiceService {

    private final EntityManager entityManager;
    private final InvoiceRepository invoiceRepository;
    private final InvoiceItemImplements invoiceItemImplements;
    private final Mapper mapper;
    private final Logger logger = Logger.getLogger(InvoiceServiceImplements.class.getName());

    @Deprecated
    /*
     * About to remove while working on invoices and invoice generation
     * To be modified as `generateInvoice`
     */
    @Override
    public ResponseEntity<?> saveInvoice(@NonNull InvoiceRequest invoiceRequest) {
        var newInvoiceNumber = invoiceRepository.getNextInvoiceNumber() + "";
        var invoice = Invoice.builder()
                .customerNumber(invoiceRequest.customerNumber)
                .number(newInvoiceNumber)
                .paymentMode(invoiceRequest.paymentMode)
                .amount(invoiceRequest.amount)
                .status(invoiceRequest.status)
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

    @Deprecated
    /*
    * Should be removed when working on invoices and invoice generation
    *
    */
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

    @Override
    public ResponseEntity<?> saveInvoiceWithItems(@NonNull InvoiceWithItemsRequest invoiceWithItemsRequest) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonStr = objectMapper.writeValueAsString(invoiceWithItemsRequest.getItems());

            logger.info("InvoiceItems: " + jsonStr);
            invoiceRepository.saveInvoiceWithItems(
                    invoiceWithItemsRequest.getInvoiceNumber(),
                    DateTime.formatDate(invoiceWithItemsRequest.getGenerationDate()),
                    DateTime.formatDate(invoiceWithItemsRequest.getBilledDate()),
                    DateTime.formatDate(invoiceWithItemsRequest.getDueDate()),
                    invoiceWithItemsRequest.getCustomerNumber(),
                    invoiceWithItemsRequest.getPaymentMode(),
                    invoiceWithItemsRequest.getShopId(),
                    invoiceWithItemsRequest.getInvoiceType(),
                    jsonStr
            );

            return ResponseEntity.ok("Invoice saved successfully");
        }
        catch (JsonProcessingException e) {
            logger.info("Unable to process the object into JSON string");
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unable to process data");
        }
        catch (JpaSystemException exception) {
            if (exception.getMessage().contains("already exists")) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body("Invoice already exists");
            }
        }
        catch (Exception exception) {
            Throwable rootCause = exception.getCause();
            logger.info(exception.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error in saving");
        }
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Unknown Error");
    }
}








