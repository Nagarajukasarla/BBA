package com.bba.Backend.services;

import com.bba.Backend.dto.CustomerDto;
import org.springframework.http.ResponseEntity;

public interface CustomerService {
    ResponseEntity<?> saveCustomer (CustomerDto customerDto);

    ResponseEntity<?> getCustomer (Integer customerNumber);

    ResponseEntity<?> getAllCustomers ();
}
