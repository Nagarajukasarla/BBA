package com.bba.Backend.utils.mappers;

import com.bba.Backend.dto.AddressDto;
import com.bba.Backend.dto.CustomerDto;
import com.bba.Backend.dto.ItemDto;
import com.bba.Backend.models.Customer;
import com.bba.Backend.models.Item;
import com.bba.Backend.models.util.Address;

public interface DtoMapper {
    CustomerDto mapCustomerToCustomerDto(Customer customer, AddressDto addressDto);
    AddressDto mapAddressToAddressDto(Address address);
    ItemDto mapItemToItemDto(Item item);
}
