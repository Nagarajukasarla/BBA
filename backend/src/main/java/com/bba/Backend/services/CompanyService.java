package com.bba.Backend.services;

import com.bba.Backend.dto.CompanyDto;
import org.springframework.http.ResponseEntity;

public interface CompanyService {
    ResponseEntity<CompanyDto> saveCompany (CompanyDto companyDto);

    ResponseEntity<CompanyDto> getCompany (String name);
}
