package com.bba.Backend.dto;
import com.bba.Backend.models.util.Address;
import com.bba.Backend.utils.DateTime;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CustomerDto {

    private int id;

    private String name;

    private Integer customerNumber;

    private String email;

    private String phone;

    private long pendingAmount;

    private DateTime createdDate;

    private AddressDto addressDto;

    private long totalPurchaseAmount;

}