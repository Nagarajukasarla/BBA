package com.bba.Backend.auth;

import com.bba.Backend.config.jwtConfig.JwtService;
import com.bba.Backend.models.Partner;
import com.bba.Backend.models.util.Role;
import com.bba.Backend.repositories.PartnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PartnerRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private static final Logger logger = Logger.getLogger(AuthenticationService.class.getName());
    public ResponseEntity<String> register(RegisterRequest request) {
        var user = Partner.builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .gender(request.getGender())
                .mobile(request.getMobile())
                .role(Role.USER)
                .build();
        repository.save(user);

        return ResponseEntity.ok("User -> " + request.getFirstname() + " is successfully registered !");
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        logger.info(jwtToken);
        logger.info(String.valueOf(new Date(System.currentTimeMillis())));
        logger.info(String.valueOf(jwtService.getTokenExpirationDate(jwtToken)));

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
