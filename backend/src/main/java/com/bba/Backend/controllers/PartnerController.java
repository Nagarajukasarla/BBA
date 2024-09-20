package com.bba.Backend.controllers;

import com.bba.Backend.dto.PartnerDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bba.Backend.services.PartnerService;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("api/v1/partner")
@RequiredArgsConstructor
public class PartnerController {

    private final PartnerService partnerService;

    @PostMapping(path = "/save")
    public ResponseEntity<PartnerDto> savePartner (@RequestBody PartnerDto partnerDto) {
        return partnerService.savePartner(partnerDto);
    }

    @PostMapping(path = "/get")
    public ResponseEntity<?> getPartner (@RequestBody Map<String, String> data) {
        return partnerService.getPartner(
                data.get("email"), data.get("password"));
    }

}
