package com.bba.Backend.services;

import com.bba.Backend.dto.CompanyDto;
import com.bba.Backend.dto.ItemRequest;
import org.springframework.http.ResponseEntity;

public interface CompanyService {
    ResponseEntity<CompanyDto> saveCompany (CompanyDto companyDto);

    ResponseEntity<?> getCompany (CompanyDto companyDto);

    ResponseEntity<?> getCompanies();
}
