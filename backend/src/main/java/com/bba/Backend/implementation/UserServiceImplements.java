package com.bba.Backend.implementation;

import com.bba.Backend.dto.PartnerDto;
import com.bba.Backend.models.Partner;
import com.bba.Backend.models.util.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.bba.Backend.repositories.AddressRepository;
import com.bba.Backend.repositories.PartnerRepository;
import com.bba.Backend.services.PartnerService;

@Service
public class UserServiceImplements implements PartnerService {

    @Autowired
    public PartnerRepository partnerRepository;
    @Autowired
    public AddressRepository addressRepository;

    @Override
    public ResponseEntity<PartnerDto> addPartner (PartnerDto partnerDto) {
        Partner newUser = new Partner();
        Address userAddress = partnerDto.getAddress();

        newUser.setOwner(false);
        newUser.setFirstName(partnerDto.getFirstName());
        newUser.setLastName(partnerDto.getLastName());
        newUser.setEmail(partnerDto.getEmail());
        newUser.setPassword(partnerDto.getPassword());
        newUser.setDateOfBirth(partnerDto.getDateOfBirth());
        newUser.setMobile(partnerDto.getMobile());
        newUser.setGender(partnerDto.getGender());

        partnerRepository.save(newUser);
        addressRepository.save(userAddress);

        PartnerDto responsePartnerDto = new PartnerDto();
        responsePartnerDto.setId(newUser.getId());
        responsePartnerDto.setFirstName(newUser.getFirstName());
        responsePartnerDto.setLastName(newUser.getLastName());
        responsePartnerDto.setEmail(newUser.getEmail());
        responsePartnerDto.setPassword("*********");
        responsePartnerDto.setGender(newUser.getGender());
        responsePartnerDto.setMobile(newUser.getMobile());
        responsePartnerDto.setDateOfBirth(newUser.getDateOfBirth());
        return ResponseEntity.ok(responsePartnerDto);
    }

    public ResponseEntity<?> findPartner (String email, String password) {
        Partner validPartner =  partnerRepository.findAll()
                .stream()
                .filter(obj -> obj.getEmail().equals(email))
                .findFirst()
                .orElse(null);

        Address validAddress = addressRepository.findAll()
                .stream()
                .filter(address -> address.getEmail().equals(email))
                .findFirst()
                .orElse(null);

        PartnerDto responsePartnerDto = new PartnerDto();
        if (validPartner != null) {
            responsePartnerDto.setId(validPartner.getId());
            responsePartnerDto.setFirstName(validPartner.getFirstName());
            responsePartnerDto.setLastName(validPartner.getLastName());
            responsePartnerDto.setEmail(validPartner.getEmail());
            responsePartnerDto.setPassword("*********");
            responsePartnerDto.setGender(validPartner.getGender());
            responsePartnerDto.setMobile(validPartner.getMobile());
            responsePartnerDto.setDateOfBirth(validPartner.getDateOfBirth());
            responsePartnerDto.setAddress(validAddress);
        }
        String errorMessage = "User Not found";
        return (responsePartnerDto.getId() != 0)
                ? ResponseEntity.ok(responsePartnerDto)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }
}
