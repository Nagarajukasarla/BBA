package com.bba.Backend.requestModels;

import com.bba.Backend.annotations.BigDecimalFormat;
import com.bba.Backend.utils.BigDecimalDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@Builder
@Setter
@Getter
public class CustomInvoiceItemRequest {
    public Integer hsnNumber;

    public String name;

    public String batchNumber;

    public String company;

    public Integer quantity;

    public String packingType;

    public String manufacturingDate;

    public String expiryDate;

    @BigDecimalFormat(precision = 4, scale = 2)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    public BigDecimal cGst;

    @BigDecimalFormat(precision = 4, scale = 2)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    public BigDecimal sGst;

    @BigDecimalFormat(precision = 4, scale = 2)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    public BigDecimal iGst;

    @BigDecimalFormat(precision = 10, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    public BigDecimal rate;

    @BigDecimalFormat(precision = 10, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    public BigDecimal mrp;

    @Override
    public String toString() {
        return "CustomInvoiceItemRequest { " + "\n\t" +
                "hsnNumber= " + hsnNumber + ",\n\t" +
                "name= " + name + ",\n\t" +
                "company= " + company + ",\n\t" +
                "quantity= " + quantity + ",\n\t" +
                "packingType= " + packingType + ",\n\t" +
                "batchNumber= " + batchNumber + ",\n\t" +
                "rate= " + rate + ",\n\t" +
                "sGstInPercent= " + sGst + ",\n\t" +
                "cGstInPercent= " + cGst + ",\n\t" +
                "isGstInPercent= " + iGst + ",\n\t" +
                "manufacturingDate= " + manufacturingDate + ",\n\t" +
                "expiryDate= " + expiryDate + ",\n\t" +
                "mrp= " + mrp + ",\n" +
                "}";
    }
}
