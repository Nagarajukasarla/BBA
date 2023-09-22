package com.bba.Backend.controllers;

import com.bba.Backend.dto.CompanyDto;
import com.bba.Backend.dto.ItemRequest;
import com.bba.Backend.services.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/company")
@CrossOrigin
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;
    @PostMapping(path = "/save")
    public ResponseEntity<CompanyDto> addCompany (@RequestBody CompanyDto companyDto) {
        return companyService.saveCompany(companyDto);
    }

    @GetMapping(path = "/get")
    public ResponseEntity<CompanyDto> getCompany (@RequestBody String name) {
        return companyService.getCompany(name);
    }

}
