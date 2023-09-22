package com.bba.Backend.repositories;

import com.bba.Backend.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    Optional<Item> findByName (String name);
}
