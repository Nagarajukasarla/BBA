package com.bba.Backend.controllers;

import com.bba.Backend.dto.PartnerDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.bba.Backend.services.PartnerService;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private PartnerService partnerService;

    @PostMapping(path = "/save")
    public ResponseEntity<PartnerDto> saveUser (@RequestBody PartnerDto partnerDto) {
        return partnerService.addPartner(partnerDto);
    }

    @PostMapping(path = "/get")
    public ResponseEntity<?> getUser (@RequestBody Map<String, String> data) {
        return partnerService.findPartner(data.get("email"), data.get("password"));
    }

}
