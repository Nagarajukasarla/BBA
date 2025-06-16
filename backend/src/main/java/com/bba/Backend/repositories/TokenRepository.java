package com.bba.Backend.repositories;

import com.bba.Backend.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {
    Optional<Token> findByToken (String jwt);
}
