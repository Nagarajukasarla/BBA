package com.bba.Backend.controllers;

import com.bba.Backend.requestModels.InvoiceItemRequest;
import com.bba.Backend.services.InvoiceItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/api/v1/invoice-item")
@RequiredArgsConstructor
public class InvoiceItemController {

    private final InvoiceItemService invoiceItemService;

    @PostMapping(path = "/get-items")
    public ResponseEntity<?> getInvoiceItems (@RequestBody InvoiceItemRequest invoiceItemRequest) {
        return invoiceItemService.getInvoiceItems(invoiceItemRequest.getInvoiceNumber());
    }
}
