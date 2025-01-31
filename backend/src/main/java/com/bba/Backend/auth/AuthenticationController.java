package com.bba.Backend.auth;

import com.bba.Backend.services.OTPVerificationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final OTPVerificationService otpVerificationService;

    @PostMapping("/register")
    public ResponseEntity<String> register (@RequestBody RegisterRequest request)  {
        return authenticationService.register(request);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<AuthenticationResponse> authenticate (
            @RequestBody AuthenticationRequest request,
            HttpServletResponse response) {
        return ResponseEntity.ok(authenticationService.authenticate(request, response));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Boolean> verifyOtp(@RequestBody OTPVerificationRequest request) {
        return otpVerificationService.verifyOTP(request.otp, request.email);
    }
}
