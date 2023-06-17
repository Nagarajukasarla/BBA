package controllers;

import dto.PartnerDto;
import models.Partner;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import services.PartnerService;

@RestController
@CrossOrigin
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    public PartnerService partnerService;

    public ResponseEntity<PartnerDto> saveUser (PartnerDto partnerDto) {
        Partner user = partnerService.addPartner(partnerDto);

    }

}
