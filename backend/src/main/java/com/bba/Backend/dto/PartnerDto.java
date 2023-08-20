package com.bba.Backend.dto;

import com.bba.Backend.models.util.Address;
import lombok.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PartnerDto {
    private int id;

    private Boolean isOwner;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private Address address;

    private String mobile;

    private String gender;
}