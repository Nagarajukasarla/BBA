package com.bba.Backend.services;

import com.bba.Backend.dto.PartnerDto;

import org.springframework.http.ResponseEntity;

public interface PartnerService {
    ResponseEntity<PartnerDto> savePartner (PartnerDto partnerDto);
    ResponseEntity<?> getPartner (String email, String password);
}
