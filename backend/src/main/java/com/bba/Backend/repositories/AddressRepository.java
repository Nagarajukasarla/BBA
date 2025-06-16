package com.bba.Backend.repositories;

import com.bba.Backend.models.util.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    Optional<Address> findByCustomerNumber(Integer customerNumber);
    Optional<Address> findByPartnerEmail(String email);

    @Query("SELECT A FROM Address A WHERE A.partnerEmail IS NULL")
    List<Address> findAllWithNullPartnerEmail();
}
