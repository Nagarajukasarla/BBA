package com.bba.Backend.utils;

import com.bba.Backend.dto.AddressDto;
import com.bba.Backend.dto.CustomerDto;
import com.bba.Backend.mappers.DtoMapper;
import com.bba.Backend.models.Customer;
import com.bba.Backend.models.util.Address;
import org.springframework.stereotype.Service;


@Service
public class Mapper implements DtoMapper {
    @Override
    public CustomerDto mapCustomerToCustomerDto(Customer customer, AddressDto addressDto) {
        return CustomerDto.builder()
                .id(customer.getId())
                .name(customer.getName())
                .customerNumber(customer.getCustomerNumber())
                .email(customer.getEmail())
                .phone(customer.getPhone())
                .pendingAmount(customer.getPendingAmount())
                .createdDate(new DateTime(customer.getCreatedDate()))
                .totalPurchaseAmount(customer.getTotalPurchaseAmount())
                .addressDto(addressDto)
                .build();
    }

    @Override
    public AddressDto mapAddressToAddressDto(Address address) {
        return AddressDto.builder()
                .id(address.getId())
                .blockNumber(address.getBlockNumber())
                .customerNumber(address.getCustomerNumber())
                .partnerEmail(address.getPartnerEmail())
                .street(address.getStreet())
                .city(address.getCity())
                .state(address.getState())
                .zipcode(address.getZipcode())
                .build();
    }
}
