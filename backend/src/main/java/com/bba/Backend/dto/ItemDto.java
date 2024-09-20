package com.bba.Backend.dto;

import com.bba.Backend.annotations.BigDecimalFormat;
import com.bba.Backend.utils.BigDecimalDeserializer;
import com.bba.Backend.utils.DateTime;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.*;
import org.springframework.lang.NonNull;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemDto {

    private Integer id;

    private String name;

    private String company;

    private Integer quantity;

    private Integer packingType;

    private String batchNumber;

    @BigDecimalFormat(precision = 10, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    private BigDecimal rate;

    @BigDecimalFormat(precision = 10, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    private BigDecimal mrp;

    @BigDecimalFormat(precision = 4, scale = 2)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    private BigDecimal sGstInPercent;

    @BigDecimalFormat(precision = 4, scale = 2)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    private BigDecimal cGstInPercent;

    @BigDecimalFormat(precision = 4, scale = 2)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    private BigDecimal iGstInPercent;

    private DateTime manufacturingDate;

    private DateTime expiryDate;

    private Boolean isFastMoving;

    private Integer shopId;

    private String hsnNumber;

    private String invoiceNumber;

    public void setManufacturingDate(@NonNull String formattedDate) {
        this.manufacturingDate = new DateTime(formattedDate);
    }

    public String getManufacturingDate() {
        return this.manufacturingDate.getFormattedStringForDateGeneration();
    }

    public void setExpiryDate(@NonNull String formattedDate) {
        this.expiryDate = new DateTime(formattedDate);
    }

    public String getExpiryDate() {
        return this.expiryDate.getFormattedStringForDateGeneration();
    }

    @Override
    public String toString() {
        return "ItemDto { " + "\n\t" +
                "shopId=" + id + ",\n\t" +
                "id= " + shopId + ",\n\t" +
                "hsnNumber= " + hsnNumber + ",\n\t" +
                "name= " + name + ",\n\t" +
                "company= " + company + ",\n\t" +
                "quantity= " + quantity + ",\n\t" +
                "packingType= " + packingType + ",\n\t" +
                "batchNumber= " + batchNumber + ",\n\t" +
                "rate= " + rate + ",\n\t" +
                "sGstInPercent= " + sGstInPercent + ",\n\t" +
                "cGstInPercent= " + cGstInPercent + ",\n\t" +
                "isGstInPercent= " + iGstInPercent + ",\n\t" +
                "manufacturingDate= " + manufacturingDate + ",\n\t" +
                "expiryDate= " + expiryDate + ",\n\t" +
                "isFastMoving= " + isFastMoving + ",\n\t" +
                "mrp= " + mrp + ",\n" +
                "}";

    }
}