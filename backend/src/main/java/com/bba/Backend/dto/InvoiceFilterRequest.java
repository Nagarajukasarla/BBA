package com.bba.Backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class InvoiceFilterRequest {
    public Integer customerNumber;
    public String paymentMode;
    public String status;
}
