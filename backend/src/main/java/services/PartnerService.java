package services;

import models.Partner;
import dto.PartnerDto;

import org.springframework.http.ResponseEntity;

public interface PartnerService {
    public Partner addPartner (PartnerDto partnerDto);
    public ResponseEntity<Partner> findPartner (String email, String password);
}
