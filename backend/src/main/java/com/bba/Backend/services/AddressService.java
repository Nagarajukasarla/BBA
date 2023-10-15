package com.bba.Backend.services;

import com.bba.Backend.dto.AddressDto;
import com.bba.Backend.models.util.Address;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

public interface AddressService {
    ResponseEntity<?> saveAddress (AddressDto addressDto);
    ResponseEntity<?> getAddressOfCustomer (Integer customerNumber);

    Address getAddressOfPartner (String email);
}
