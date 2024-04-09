package com.bba.Backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDto {

    public Integer id;

    public String blockNumber;

    public Integer customerNumber;

    public String partnerEmail;

    public String street;

    public String area;

    public String city;

    public String state;

    public String zipcode;

    @Override
    public String toString() {
        return "Address { " + "\n\t" +
                "id= " + id + ",\n\t" +
                "blockNumber= " + blockNumber + ",\n\t" +
                "customerNumber= " + customerNumber + ",\n\t" +
                "partnerEmail= " + partnerEmail + ",\n\t" +
                "street= " + street + ",\n\t" +
                "area=" + area + ",\n\t" +
                "city= " + city + ",\n\t" +
                "state= " + state + ",\n\t" +
                "zipcode= " + zipcode + "\n" +
                "}";
    }
}
