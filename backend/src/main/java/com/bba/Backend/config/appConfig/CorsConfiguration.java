package com.bba.Backend.config.appConfig;

import lombok.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/api/v1/**") // Specify the path you want to allow CORS for
                        .allowedOrigins("http://localhost:3000") // Specify the allowed origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Specify the allowed HTTP methods
                        .allowCredentials(true);
            }
        };
    }

    // When you get issues regarding api accessing try to put localhost:8080 in allowedOrigins method
}
