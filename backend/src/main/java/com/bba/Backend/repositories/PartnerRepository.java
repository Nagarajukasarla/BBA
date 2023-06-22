package com.bba.Backend.repositories;

import com.bba.Backend.models.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface PartnerRepository extends JpaRepository<Partner, Integer> {

}
