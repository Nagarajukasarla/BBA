package com.bba.Backend.services;

import com.bba.Backend.dto.AddressDto;
import com.bba.Backend.models.util.Address;

import java.util.Optional;

public interface AddressService {
    void saveAddressOfPartner (AddressDto addressDto);
    Address saveAddressOfCustomer (AddressDto addressDto);
    Optional<AddressDto> getAddressOfCustomer (Integer customerNumber);
    Address getAddressOfPartner (String email);
}
