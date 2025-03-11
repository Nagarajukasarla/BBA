package com.bba.Backend.implementation;

import com.bba.Backend.services.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImplements implements EmailService {

    private final JavaMailSender mailSender;

    private static final String SUBJECT = "BBA OTP Verification";
    private static final String FROM_EMAIL = "nagarajukasarla79@gmail.com";

    @Override
    public void sendOtpEmail(String to, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(FROM_EMAIL);
            message.setTo(to);
            message.setSubject(SUBJECT);
            message.setText("Your OTP for Urban Access verification is: " + otp +
                    "\nThis OTP will expire in 1 minute.");

            mailSender.send(message);
            log.info("OTP sent successfully to {}", to);
        } catch (MailException e) {
            log.error("Failed to send OTP email to {}: {}", to, e.getMessage(), e);
            throw e;
        } catch (Exception e) {
            log.error("Unexpected error sending OTP email to {}: {}", to, e.getMessage(), e);
            throw new RuntimeException("Unexpected error while sending OTP email to " + to, e);
        }
    }
}
