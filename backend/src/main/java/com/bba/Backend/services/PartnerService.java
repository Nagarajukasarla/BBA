package com.bba.Backend.services;

import com.bba.Backend.dto.PartnerDto;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

public interface PartnerService {
    ResponseEntity<PartnerDto> addPartner (PartnerDto partnerDto);
    ResponseEntity<?> findPartner (String email, String password);
}
