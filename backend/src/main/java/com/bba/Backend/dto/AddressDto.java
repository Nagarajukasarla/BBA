package com.bba.Backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class AddressDto {

    private int id;

    private String blockNumber;

    private String street;

    private String city;

    private String state;

    private int zipcode;

    private String email;
}
