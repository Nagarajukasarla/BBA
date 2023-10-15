package com.bba.Backend.implementation;

import com.bba.Backend.dto.AddressDto;
import com.bba.Backend.models.util.Address;
import com.bba.Backend.repositories.AddressRepository;
import com.bba.Backend.services.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AddressServiceImplements implements AddressService {

    private final AddressRepository addressRepository;

    @Override
    public ResponseEntity<?> saveAddress(AddressDto addressDto) {
        var address = Address.builder()
                .blockNumber(addressDto.getBlockNumber())
                .customerNumber(addressDto.getCustomerNumber())
                .street(addressDto.getStreet())
                .city(addressDto.getCity())
                .state(addressDto.getState())
                .zipcode(addressDto.getZipcode())
                .build();
        return ResponseEntity.ok(addressRepository.save(address));
    }

    @Override
    public ResponseEntity<?> getAddressOfCustomer(Integer customerNumber) {
        var address = addressRepository.findByCustomerNumber(customerNumber);
        if (address.isPresent()) {
            return ResponseEntity.ok(address);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Address Not Found");
    }

    @Override
    public Address getAddressOfPartner(String email) {
        var partnerAddress = addressRepository.findByPartnerEmail(email);
        return partnerAddress.orElse(null);
    }
}
