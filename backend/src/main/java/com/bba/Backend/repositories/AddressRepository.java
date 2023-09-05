package com.bba.Backend.repositories;

import com.bba.Backend.models.util.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {

}
