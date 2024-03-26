package com.bba.Backend.controllers;


import com.bba.Backend.requestModels.InvoiceRequest;
import com.bba.Backend.services.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/api/v1/invoice")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping(path = "/save")
    public ResponseEntity<?> saveInvoice (@RequestBody InvoiceRequest invoiceRequest) {
        return invoiceService.saveInvoice(invoiceRequest);
    }

    @GetMapping(path = "/get-invoices")
    public ResponseEntity<?> getInvoices () {
        return invoiceService.getAllInvoices();
    }
}
