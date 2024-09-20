package com.bba.Backend.implementation;

import com.bba.Backend.dto.AddressDto;
import com.bba.Backend.models.util.Address;
import com.bba.Backend.repositories.AddressRepository;
import com.bba.Backend.services.AddressService;
import com.bba.Backend.utils.Mapper;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AddressServiceImplements implements AddressService {

    private final AddressRepository addressRepository;
    private final Mapper mapper;

    @Override
    public void saveAddressOfPartner(@NonNull AddressDto addressDto) {
        var address = Address.builder()
                .blockNumber(addressDto.getBlockNumber())
                .partnerEmail(addressDto.getPartnerEmail())
                .street(addressDto.getStreet())
                .area(addressDto.getArea())
                .city(addressDto.getCity())
                .state(addressDto.getState())
                .zipcode(addressDto.getZipcode())
                .build();
        addressRepository.save(address);
    }

    @Override
    public Address saveAddressOfCustomer(@NonNull AddressDto addressDto) {
        var address = Address.builder()
                .blockNumber(addressDto.getBlockNumber())
                .customerNumber(addressDto.getCustomerNumber())
                .street(addressDto.getStreet())
                .area(addressDto.getArea())
                .city(addressDto.getCity())
                .state(addressDto.getState())
                .zipcode(addressDto.getZipcode())
                .build();
        return addressRepository.save(address);
    }

    @Override
    public Optional<AddressDto> getAddressOfCustomer(Integer customerNumber) {
        var address = addressRepository.findByCustomerNumber(customerNumber);
        return address.map(mapper::mapAddressToAddressDto);
    }

    @Override
    public Address getAddressOfPartner(String email) {
        var partnerAddress = addressRepository.findByPartnerEmail(email);
        return partnerAddress.orElse(null);
    }
}
