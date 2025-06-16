package com.bba.Backend.config.appConfig;

import com.bba.Backend.dto.AddressDto;
import com.bba.Backend.models.util.Address;
import com.bba.Backend.repositories.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final ShopRepository shopRepository;

    @Bean
    public ModelMapper modelWrapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.addConverter(mappingContext -> {
            Address source = (Address) mappingContext.getSource();
            AddressDto destination = (AddressDto) mappingContext.getDestination();
            destination.setPartnerEmail(source.getPartnerEmail());
            return destination;
        });

        return modelMapper;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> shopRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found!"));
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}
