package com.bba.Backend.services;

import com.bba.Backend.dto.AddressDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

public interface AddressService {
    ResponseEntity<AddressDto> saveAddress (AddressDto addressDto);
    ResponseEntity<?> getAddress (String email);
}
