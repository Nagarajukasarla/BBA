package com.bba.Backend.implementation;

import com.bba.Backend.dto.AddressDto;
import com.bba.Backend.models.util.Address;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.bba.Backend.repositories.AddressRepository;
import com.bba.Backend.services.AddressService;

@Service
public class AddressServiceImplements implements AddressService {

    @Autowired
    public AddressRepository addressRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ResponseEntity<AddressDto> saveAddress (AddressDto addressDto) {
        Address address = new Address();
        address.setBlockNumber(addressDto.getBlockNumber());
        address.setStreet(addressDto.getStreet());
        address.setCity(addressDto.getCity());
        address.setState(addressDto.getState());
        address.setZipcode(addressDto.getZipcode());
        address.setEmail(addressDto.getEmail());

        addressRepository.save(address);

        AddressDto savedAddress = new AddressDto();
        savedAddress.setId(address.getId());
        savedAddress.setBlockNumber(address.getBlockNumber());
        savedAddress.setStreet(address.getStreet());
        savedAddress.setCity(address.getCity());
        savedAddress.setState(address.getState());
        savedAddress.setZipcode(address.getZipcode());
        savedAddress.setEmail(address.getEmail());
        return ResponseEntity.ok(savedAddress);
    }

    @Override
    public ResponseEntity<?> getAddress(String email) {
        Address address = addressRepository.findAll()
                .stream()
                .filter(add -> add.getEmail().equals(email))
                .findFirst()
                .orElse(null);

        if (address != null) {
            AddressDto validAddress = modelMapper.map(address, AddressDto.class);
            return ResponseEntity.ok(validAddress);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Address doesn't exist");
        }
    }
}
