package com.bba.Backend.auth;

import com.bba.Backend.config.jwtConfig.JwtService;
import com.bba.Backend.implementation.OTPVerificationImplements;
import com.bba.Backend.models.Shop;
import com.bba.Backend.models.util.Role;
import com.bba.Backend.repositories.ShopRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.Date;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private static final Logger logger = Logger.getLogger(AuthenticationService.class.getName());

    private final ShopRepository shopRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final OTPVerificationImplements otpVerificationService;

    public ResponseEntity<String> register(RegisterRequest request) {
        try {
            var shop = Shop.builder()
                    .email(request.getEmail())
                    .name(request.getName())
                    .drugLicenseNumber(request.getDrugLicenseNumber())
                    .gstin(request.getGstin())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .mobile(request.getMobile())
                    .role(Role.USER)
                    .build();
            var result = shopRepository.save(shop);
            return otpVerificationService.generateOTP(result.getEmail());
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Registration failed due to data(email) violation occurs: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Registration failed: " + e.getMessage());
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );

            // Fetching shop
            var shop = shopRepository.findByEmail(request.getEmail()).orElseThrow(() ->
                    new UsernameNotFoundException("User not found with email: " + request.getEmail())
            );

            // Generating token based on shop
            var jwtToken = jwtService.generateToken(shop);

            logger.info(jwtToken);
            logger.info(String.valueOf(new Date(System.currentTimeMillis())));
            logger.info(String.valueOf(jwtService.getTokenExpirationDate(jwtToken)));

            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .shopId(shop.getId().toString())
                    .build();
        } catch (BadCredentialsException e) {
            logger.info("Invalid credentials for user: " + request.getEmail());
            return AuthenticationResponse.builder()
                    .token("Invalid credentials")
                    .build();
        } catch (Exception e) {
            return AuthenticationResponse.builder()
                    .token("Invalid: " + e.getMessage())
                    .build();
        }
    }
}
