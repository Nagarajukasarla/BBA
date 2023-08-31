package com.bba.Backend.logout;

import com.bba.Backend.repositories.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    private final TokenRepository tokenRepository;

    private final Logger logger = Logger.getLogger(LogoutService.class.getName());
    @Override
    public void logout(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            Authentication authentication
    ) {
        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !(authHeader.startsWith("Bearer "))) {
            return;
        }

        final String jwt = authHeader.substring(7);
        var storedToken = tokenRepository.findByToken(jwt)
                .orElse(null);

        if (storedToken != null) {
            storedToken.setExpired(true);
            storedToken.setRevoked(true);
            tokenRepository.save(storedToken);
            logger.info("Logout out Successful ! ");
        }

    }
}
