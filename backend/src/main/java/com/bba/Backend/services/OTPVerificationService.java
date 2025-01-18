package com.bba.Backend.services;

import org.springframework.http.ResponseEntity;

public interface OTPVerificationService {
    ResponseEntity<Boolean> verifyOTP(String otp, String email);
    ResponseEntity<String> generateOTP(String email);
}

