package com.bba.Backend.dto;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CompanyDto {
    public Integer shopId;
    public String name;
}
