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
    private String shopName;
    private String gstin;
    private String drugLicenseNumber;
    private String email;
    private String password;
    private String mobile;
    private String type;
}
