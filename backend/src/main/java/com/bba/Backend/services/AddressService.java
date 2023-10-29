package com.bba.Backend.services;

import com.bba.Backend.dto.AddressDto;
import com.bba.Backend.models.util.Address;

import java.util.List;
import java.util.Optional;

public interface AddressService {
    Address saveAddressOfPartner (AddressDto addressDto);
    Address saveAddressOfCustomer (AddressDto addressDto);
    Optional<AddressDto> getAddressOfCustomer (Integer customerNumber);
    List<AddressDto> getAllCustomersAddress();
    Address getAddressOfPartner (String email);
}
