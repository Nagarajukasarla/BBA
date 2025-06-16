package com.bba.Backend.services;

import com.bba.Backend.dto.CustomerDto;
import java.util.List;
import java.util.Optional;

public interface CustomerService {
    CustomerDto saveCustomer (CustomerDto customerDto);

    Optional<CustomerDto> getCustomer (Integer customerNumber);

    List<CustomerDto> getAllCustomers ();
}
