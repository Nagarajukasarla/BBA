package com.bba.Backend.repositories;

import com.bba.Backend.models.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
    Optional<Company> findByName (String name);
    Optional<Company> findByShopIdAndName (Integer shopId, String name);
}
