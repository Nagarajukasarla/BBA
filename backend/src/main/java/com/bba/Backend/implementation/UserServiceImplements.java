package com.bba.Backend.implementation;

import com.bba.Backend.dto.PartnerDto;
import com.bba.Backend.models.Partner;
import com.bba.Backend.repositories.PartnerRepository;
import com.bba.Backend.services.PartnerService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImplements implements PartnerService {

    private final PartnerRepository partnerRepository;
    private final ModelMapper modelMapper;
    private final AddressServiceImplements addressService;

    @Override
    public ResponseEntity<PartnerDto> savePartner(@NonNull PartnerDto partnerDto) {
        var newPartner = Partner.builder()
                .firstName(partnerDto.getFirstName())
                .lastName(partnerDto.getLastName())
                .email(partnerDto.getEmail())
                .password(partnerDto.getPassword())
                .gender(partnerDto.getGender())
                .mobile(partnerDto.getMobile())
                .shopId(partnerDto.getShopId())
                .build();

        partnerRepository.save(newPartner);
        addressService.saveAddressOfPartner(partnerDto.getAddressDto());
        return ResponseEntity.ok(modelMapper.map(partnerRepository.save(newPartner), PartnerDto.class));
    }

    public ResponseEntity<?> getPartner(String email, String password) {
        var partner = partnerRepository.findByEmail(email);
        var partnerAddress = addressService.getAddressOfPartner(email);
        assert partner.orElse(null) != null;
        return ResponseEntity.ok(new PartnerDto(partner.orElse(null), partnerAddress));
    }
}


