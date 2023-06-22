package com.bba.Backend.services;

import com.bba.Backend.dto.AddressDto;
import org.springframework.http.ResponseEntity;

public interface AddressService {
    public ResponseEntity<AddressDto> saveAddress (AddressDto addressDto);
    public ResponseEntity<?> getAddress (String email);
}
