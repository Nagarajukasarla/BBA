package com.bba.Backend.repositories;

import com.bba.Backend.models.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface ShopRepository extends JpaRepository<Shop, Integer> {
    Optional<Shop> findByEmail(String email);
}
