package com.bba.Backend.services;

import org.springframework.http.ResponseEntity;

public interface OtpService {
    ResponseEntity<Boolean> verifyOTP(String otp, String email);
    String generateOTP(String email);
}

