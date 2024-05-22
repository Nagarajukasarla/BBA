package com.bba.Backend.controllers;


import com.bba.Backend.dto.InvoiceFilterRequest;
import com.bba.Backend.requestModels.InvoiceRequest;
import com.bba.Backend.services.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@CrossOrigin
@RequestMapping(path = "/api/v1/invoice")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final Logger logger = Logger.getLogger(InvoiceController.class.getName());

    @PostMapping(path = "/save")
    public ResponseEntity<?> saveInvoice (@RequestBody InvoiceRequest invoiceRequest) {
        return invoiceService.saveInvoice(invoiceRequest);
    }

    @GetMapping(path = "/get-all")
    public ResponseEntity<?> getInvoices () {
        return invoiceService.getAllInvoices();
    }

    @PostMapping(path = "/get-filtered")
    public ResponseEntity<?> getFilteredInvoices(@RequestBody InvoiceFilterRequest invoiceFilterRequest) {
        return invoiceService.getFilteredInvoices(invoiceFilterRequest);
    }
}
