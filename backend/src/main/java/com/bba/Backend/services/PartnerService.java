package services;

import models.Partner;
import dto.PartnerDto;

import org.springframework.http.ResponseEntity;

public interface PartnerService {
    ResponseEntity<PartnerDto> addPartner (PartnerDto partnerDto);
    ResponseEntity<PartnerDto> findPartner (String email, String password);
}
