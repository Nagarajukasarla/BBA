package com.bba.Backend.requestModels;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class InvoiceItemRequest {
    public String invoiceNumber;
}
