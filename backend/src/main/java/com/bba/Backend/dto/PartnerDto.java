package com.bba.Backend.dto;

import com.bba.Backend.models.Partner;
import com.bba.Backend.models.util.Address;
import lombok.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;


@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public class PartnerDto {

    private ModelMapper modelMapper;

    public PartnerDto (Partner partner, Address address) {
        setId(partner.getId());
        setFirstName(partner.getFirstName());
        setLastName(partner.getLastName());
        setEmail(partner.getEmail());
        setPassword(partner.getPassword());
        setAddressDto(modelMapper.map(address, AddressDto.class));
        setMobile(partner.getMobile());
        setGender(partner.getGender());
        setShopId(partner.getShopId());
    }

    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private AddressDto addressDto;

    private String mobile;

    private String gender;

    private Integer shopId;
}