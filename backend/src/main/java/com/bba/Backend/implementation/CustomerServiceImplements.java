package com.bba.Backend.implementation;

import com.bba.Backend.dto.CustomerDto;
import com.bba.Backend.models.Customer;
import com.bba.Backend.repositories.CustomerRepository;
import com.bba.Backend.services.AddressService;
import com.bba.Backend.services.CustomerService;
import com.bba.Backend.utils.DateTime;
import com.bba.Backend.utils.Mapper;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class CustomerServiceImplements implements CustomerService {

    private final CustomerRepository customerRepository;
    private final AddressService addressService;
    private final Mapper mapper;
    public static Logger logger = Logger.getLogger(CustomerService.class.getName());


    @Override
    public CustomerDto saveCustomer(@NonNull CustomerDto customerDto) {
        var customerNumber = customerRepository.getNextCustomerNumber();
        var customer = Customer.builder()
                .name(customerDto.getCustomerName())
                .email(customerDto.getEmail())
                .phone(customerDto.getPhone())
                .customerNumber(customerNumber)
                .createdDate(DateTime.formatDate(customerDto.getCreatedDate()))
                .duePeriod(customerDto.getDuePeriod())
                .discount(customerDto.getDiscount())
                .build();

        customerDto.addressDto.setCustomerNumber(customerNumber);
        return (
                mapper.mapCustomerToCustomerDto(
                    customerRepository.save(customer),
                    mapper.mapAddressToAddressDto(addressService.saveAddressOfCustomer(customerDto.getAddressDto()))
                )
        );
    }

    @Override
    public Optional<CustomerDto> getCustomer(@NonNull Integer customerNumber) {
        var customer = customerRepository.findByCustomerNumber(customerNumber);
        if (customer.isEmpty()) {
            logger.info("Customer doesn't exist with " + customerNumber);
            return Optional.empty();
        }
        var addressDto = addressService.getAddressOfCustomer(customerNumber);
        if (addressDto.isEmpty()) {
            logger.info("Address Not Found for customer: " + customer.get().getName());
            return Optional.empty();
        }
        return Optional.of(mapper.mapCustomerToCustomerDto(customer.get(), addressDto.get()));
    }

    @Override
    public List<CustomerDto> getAllCustomers() {
        var customers = customerRepository.getCustomersWithAddressAndPurchaseStatus();
        return customers.parallelStream()
                .map(mapper::mapCustomerToCustomerDtoWithAddressAndPurchaseStatus)
                .collect(Collectors.toList());
    }
}
