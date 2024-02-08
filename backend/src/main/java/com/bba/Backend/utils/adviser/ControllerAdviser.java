package com.bba.Backend.utils.adviser;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.logging.Logger;

@RestControllerAdvice
@RequiredArgsConstructor
public class ControllerAdviser {

    private final Logger logger = Logger.getLogger(ControllerAdvice.class.getName());
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleExpiredJwtException (Exception exception) {

        if (exception instanceof ExpiredJwtException) {
            logger.info("Your JWT Token has been expired!!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Your JWT Token has expired");
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Sever Error!");
    }

}
