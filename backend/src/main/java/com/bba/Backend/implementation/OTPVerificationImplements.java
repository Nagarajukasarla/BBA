package com.bba.Backend.implementation;

import com.bba.Backend.models.Otp;
import com.bba.Backend.repositories.OtpRepository;
import com.bba.Backend.services.OTPVerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OTPVerificationImplements implements OTPVerificationService {

    private final OtpRepository otpRepository;

    @Override
    public ResponseEntity<Boolean> verifyOTP(String otp, String email) {
        var result = otpRepository.verifyOtp(email, otp);
        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<String> generateOTP(String email) {
        var otp = (int)(Math.random() * 999999);
        var result = Otp.builder()
                .email(email)
                .otp(String.valueOf(otp))
                .build();
        otpRepository.save(result);
        System.out.println("===== Generated OTP: " + result.getOtp());
        return ResponseEntity.ok(result.getOtp());
    }
}
