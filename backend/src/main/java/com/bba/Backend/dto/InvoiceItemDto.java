package com.bba.Backend.dto;


import com.bba.Backend.annotations.BigDecimalFormat;
import com.bba.Backend.utils.BigDecimalDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.deser.std.DelegatingDeserializer;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceItemDto {

    public Long id;

    public String itemName;

    public String company;

    public String invoiceNumber;

    public String itemBatchNumber;

    @BigDecimalFormat(precision = 4, scale = 2)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    public BigDecimal discount;

    @BigDecimalFormat(precision = 13, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    public BigDecimal price;

    @BigDecimalFormat(precision = 10, scale = 2)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    public BigDecimal quantity;

}