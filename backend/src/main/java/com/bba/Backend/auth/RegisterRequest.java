package com.bba.Backend.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String name;
    private String drugLicenseNumber;
    private String gstin;
    private String email;
    private String password;
    private String mobile;
    private String type;
}
