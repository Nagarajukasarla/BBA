package com.bba.Backend.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class InvoiceItemRequest {
    public String invoiceNumber;
}
