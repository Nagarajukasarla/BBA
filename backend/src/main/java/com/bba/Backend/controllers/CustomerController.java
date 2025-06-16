package com.bba.Backend.controllers;

import com.bba.Backend.dto.CustomerDto;
import com.bba.Backend.requestModels.CustomerRequest;
import com.bba.Backend.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
        return ResponseEntity.ok(customerService.saveCustomer(customerDto));
    }

    @PostMapping(path = "/get")
    public ResponseEntity<?> getCustomer (@RequestBody CustomerRequest customerRequest) {
        var response = customerService.getCustomer(customerRequest.number);
        return response.isPresent()
                ? ResponseEntity.ok(response)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer doesn't exist!");
    }

    @GetMapping(path = "/get-all")
    public ResponseEntity<?> getCustomers () {
        var response = customerService.getAllCustomers();
        return response.isEmpty()
                ? ResponseEntity.status(HttpStatus.NOT_FOUND).body("No customers exists!")
                : ResponseEntity.ok(response);
    }
}
