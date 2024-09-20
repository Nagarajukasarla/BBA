package com.bba.Backend.auth;

import com.bba.Backend.config.jwtConfig.JwtService;
import com.bba.Backend.models.util.Role;
import com.bba.Backend.repositories.ShopRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final EntityManager entityManager;
    private final ShopRepository shopRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private static final Logger logger = Logger.getLogger(AuthenticationService.class.getName());

    @Transactional(rollbackOn = Exception.class)
    public ResponseEntity<String> register(RegisterRequest request) {
        try {
            StoredProcedureQuery query = entityManager
                    .createStoredProcedureQuery("public.register_new_shop")
                    .registerStoredProcedureParameter("p_shop_name", String.class, ParameterMode.IN)
                    .registerStoredProcedureParameter("p_gstin", String.class, ParameterMode.IN)
                    .registerStoredProcedureParameter("p_drug_license_number", String.class, ParameterMode.IN)
                    .registerStoredProcedureParameter("p_email", String.class, ParameterMode.IN)
                    .registerStoredProcedureParameter("p_password", String.class, ParameterMode.IN)
                    .registerStoredProcedureParameter("p_mobile", String.class, ParameterMode.IN)
                    .registerStoredProcedureParameter("p_type", String.class, ParameterMode.IN)
                    .registerStoredProcedureParameter("p_role", String.class, ParameterMode.IN)
                    .setParameter("p_shop_name", request.getShopName())
                    .setParameter("p_gstin", request.getGstin())
                    .setParameter("p_drug_license_number", request.getDrugLicenseNumber())
                    .setParameter("p_email", request.getEmail())
                    .setParameter("p_mobile", request.getMobile())
                    .setParameter("p_password", passwordEncoder.encode(request.getPassword()))
                    .setParameter("p_type", request.getType())
                    .setParameter("p_role", Role.USER.toString());

            query.execute();
            return ResponseEntity.ok(request.getShopName() + " is successfully registered!");
        }
        catch (DataIntegrityViolationException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Registration failed due to data(email) violation occurs: " + e.getMessage());
        }
        catch (Exception e) {
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
                    .shopId(shop.getNumber().toString())
                    .build();
        }
        catch (BadCredentialsException e) {
            logger.info("Invalid credentials for user: " + request.getEmail());
            return AuthenticationResponse.builder()
                    .token("Invalid credentials")
                    .build();
        }
        catch (Exception e) {
            return AuthenticationResponse.builder()
                    .token("Invalid: " + e.getMessage())
                    .build();
        }
    }
}
