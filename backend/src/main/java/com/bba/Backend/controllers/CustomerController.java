package com.bba.Backend.controllers;

import com.bba.Backend.dto.CustomerDto;
import com.bba.Backend.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/api/v1/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping(path = "/save")
    public ResponseEntity<?> saveCustomer (@RequestBody CustomerDto customerDto) {
        return customerService.saveCustomer(customerDto);
    }

    @PostMapping(path = "/get")
    public ResponseEntity<?> getCustomer (@RequestBody Integer customerNumber) {
        return customerService.getCustomer(customerNumber);
    }

    @GetMapping(path = "/get-all")
    public ResponseEntity<?> getCustomers () {
        return customerService.getAllCustomers();
    }
}
