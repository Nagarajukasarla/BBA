package com.bba.Backend.implementation;

import com.bba.Backend.dto.AddressDto;
import com.bba.Backend.dto.CustomerDto;
import com.bba.Backend.models.Customer;
import com.bba.Backend.repositories.CustomerRepository;
import com.bba.Backend.services.CustomerService;
import com.bba.Backend.utils.DateFormat;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class CustomerServiceImplements implements CustomerService {

    private final CustomerRepository customerRepository;
    private final AddressServiceImplements addressService;
    private final ModelMapper modelMapper;

    @Override
    public ResponseEntity<?> saveCustomer(CustomerDto customerDto) {
        var customer = Customer.builder()
                .name(customerDto.getName())
                .customerNumber(customerDto.getCustomerNumber())
                .email(customerDto.getEmail())
                .phone(customerDto.getPhone())
                .createdDate(customerDto.getCreatedDate().formatDate())
                .build();

        var response  = customerRepository.save(customer);
        addressService.saveAddress(customerDto.getAddressDto());
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<?> getCustomer(Integer customerNumber) {
        var customer = customerRepository.findByCustomerNumber(customerNumber);
        var customerAddress = addressService.getAddressOfCustomer(customerNumber);
        var customerDto = modelMapper.map(customer, CustomerDto.class);
        customerDto.setAddressDto(modelMapper.map(customerAddress, AddressDto.class));
        return ResponseEntity.ok(customerDto);
    }

    @Override
    public ResponseEntity<?> getAllCustomers() {
        var customers = customerRepository.findAll();
        if (customers.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Customers exists");
        }
        return ResponseEntity.ok(
                customers.stream().map(customer -> modelMapper.map(customer, CustomerDto.class))
        );
    }
}
