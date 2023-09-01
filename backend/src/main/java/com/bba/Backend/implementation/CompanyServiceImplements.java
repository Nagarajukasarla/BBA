package com.bba.Backend.implementation;

import com.bba.Backend.dto.CompanyDto;
import com.bba.Backend.models.Company;
import com.bba.Backend.repositories.CompanyRepository;
import com.bba.Backend.services.CompanyService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyServiceImplements implements CompanyService {

    private final CompanyRepository companyRepository;

    private final ModelMapper modelMapper;
    @Override
    public ResponseEntity<CompanyDto> saveCompany(CompanyDto companyDto) {
        var company = Company.builder()
                .name(companyDto.getName())
                .build();
        companyRepository.save(company);
        return ResponseEntity.ok(modelMapper.map(company, CompanyDto.class));
    }

    @Override
    public ResponseEntity<CompanyDto> getCompany(String name) {
        return ResponseEntity.ok(modelMapper.map(companyRepository.findByName(name), CompanyDto.class));
    }
}
