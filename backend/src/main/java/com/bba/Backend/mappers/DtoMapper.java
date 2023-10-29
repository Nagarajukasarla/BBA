package com.bba.Backend.mappers;

import com.bba.Backend.dto.AddressDto;
import com.bba.Backend.dto.CustomerDto;
import com.bba.Backend.models.Customer;
import com.bba.Backend.models.util.Address;

public interface DtoMapper {
    public CustomerDto mapCustomerToCustomerDto(Customer customer, AddressDto addressDto);
    public AddressDto mapAddressToAddressDto(Address address);

}
