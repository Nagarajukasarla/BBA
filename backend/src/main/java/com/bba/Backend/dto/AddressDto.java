package com.bba.Backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDto {

    private Integer id;

    private String blockNumber;

    private Integer customerNumber;

    private String partnerEmail;

    private String street;

    private String city;

    private String state;

    private String zipcode;

    @Override
    public String toString() {
        return "Address { " + "\n\t" +
                "id= " + getId() + ",\n\t" +
                "blockNumber= " + getBlockNumber() + ",\n\t" +
                "customerNumber= " + getCustomerNumber() + ",\n\t" +
                "partnerEmail= " + getPartnerEmail() + ",\n\t" +
                "street= " + getStreet() + ",\n\t" +
                "city= " + getCity() + ",\n\t" +
                "state= " + getState() + ",\n\t" +
                "zipcode= " + getZipcode() + "\n" +
                "}";
    }
}
