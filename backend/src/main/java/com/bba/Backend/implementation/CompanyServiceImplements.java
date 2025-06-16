package com.bba.Backend.implementation;

import com.bba.Backend.dto.CompanyDto;
import com.bba.Backend.models.Company;
import com.bba.Backend.repositories.CompanyRepository;
import com.bba.Backend.services.CompanyService;
import jakarta.persistence.EntityManager;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class CompanyServiceImplements implements CompanyService {

    private final CompanyRepository companyRepository;
    private final EntityManager entityManager;
    private final ModelMapper modelMapper;
    private final Logger logger = Logger.getLogger(CompanyServiceImplements.class.getName());

    @Override
    public ResponseEntity<CompanyDto> saveCompany(@NonNull CompanyDto companyDto) {
        var company = Company.builder()
                .name(companyDto.getName())
                .shopId(companyDto.getShopId())
                .build();
        companyRepository.save(company);
        return ResponseEntity.ok(modelMapper.map(company, CompanyDto.class));
    }

    @Override
    public ResponseEntity<?> getCompany(@NonNull CompanyDto companyDto) {
        var company =  companyRepository.findByShopIdAndName(companyDto.getShopId(), companyDto.getName());
        if (company.isPresent()) {
            return ResponseEntity.ok(modelMapper.map(company, CompanyDto.class));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Company not found!");
    }

    @Override
    public ResponseEntity<?> getCompanies() {
        return ResponseEntity.ok(
            companyRepository
                .findAll()
                .parallelStream()
                .map(company -> modelMapper.map(company, CompanyDto.class))
        );
    }


}
