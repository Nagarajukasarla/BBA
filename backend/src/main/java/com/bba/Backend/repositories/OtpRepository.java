package com.bba.Backend.repositories;

import com.bba.Backend.models.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

public interface OtpRepository extends JpaRepository<Otp, Integer> {

    @Procedure
    Boolean verifyOtp(String email, String otp);
}
