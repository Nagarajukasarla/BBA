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

    @PostMapping(path = "/get")
    public ResponseEntity<?> getCompany (@RequestBody CompanyDto companyDto) {
        return companyService.getCompany(companyDto);
    }

    @GetMapping(path = "/get-all")
    public ResponseEntity<?> getCompanies() {
        return companyService.getCompanies();
    }
}
