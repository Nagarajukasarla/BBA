package com.bba.Backend.implementation;


import com.bba.Backend.requestModels.InvoiceRequest;
import com.bba.Backend.services.InvoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class InvoiceServiceImplements implements InvoiceService {

    @Override
    public ResponseEntity<?> saveInvoice(InvoiceRequest invoiceRequest) {
        
    }
}
