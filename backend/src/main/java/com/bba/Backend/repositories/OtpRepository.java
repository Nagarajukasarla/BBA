package com.bba.Backend.repositories;

import com.bba.Backend.models.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

@Repository
@EnableJpaRepositories
public interface OtpRepository extends JpaRepository<Otp, Integer> {
}
