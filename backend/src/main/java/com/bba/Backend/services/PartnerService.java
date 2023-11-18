package com.bba.Backend.services;

import com.bba.Backend.dto.PartnerDto;

import org.springframework.http.ResponseEntity;

public interface PartnerService {
    ResponseEntity<PartnerDto> addPartner (PartnerDto partnerDto);
    ResponseEntity<?> findPartner (String email, String password);
}
