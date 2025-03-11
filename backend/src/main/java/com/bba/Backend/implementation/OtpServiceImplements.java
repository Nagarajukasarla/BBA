package com.bba.Backend.implementation;

import com.bba.Backend.models.Otp;
import com.bba.Backend.repositories.OtpJdbcRepository;
import com.bba.Backend.repositories.OtpRepository;
import com.bba.Backend.services.OtpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OtpServiceImplements implements OtpService {

    private final OtpRepository otpRepository;
    private final OtpJdbcRepository otpJdbcRepository;

    @Override
    public ResponseEntity<Boolean> verifyOTP(String otp, String email) {
        var result = otpJdbcRepository.verifyOtp(email, otp);
        return ResponseEntity.ok(result);
    }

    @Override
    public String generateOTP(String email) {
        var otp = (int)(Math.random() * 99999);
        var result = Otp.builder()
                .email(email)
                .otp(String.valueOf(otp))
                .build();
        otpRepository.save(result);
        return result.getOtp();
    }
}

