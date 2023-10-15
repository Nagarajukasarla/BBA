package com.bba.Backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class AddressDto {

    private Integer id;

    private String blockNumber;

    private Integer customerNumber;

    private String street;

    private String city;

    private String state;

    private String zipcode;
}
