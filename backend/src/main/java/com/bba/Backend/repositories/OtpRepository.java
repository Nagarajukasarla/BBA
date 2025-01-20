package com.bba.Backend.repositories;

import com.bba.Backend.models.Otp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

public interface OtpRepository extends JpaRepository<Otp, Integer> {

    @Procedure
    Boolean verifyOtp(String email, String otp);

    // verifyOtp psql procedure need to be defined.
    // otp table should have automation setup for removing otp for every constant period.
    // Refer chatGpt PostgreSQL quries chat.
}
