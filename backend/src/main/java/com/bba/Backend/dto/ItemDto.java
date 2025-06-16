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

    private Long id;

    private String name;

    private String company;

    @BigDecimalFormat(precision = 10, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    private BigDecimal quantity;

    @BigDecimalFormat(precision = 10, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    private BigDecimal freeQuantity;

    private String packingType;

    private String batchNumber;

    @BigDecimalFormat(precision = 10, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    private BigDecimal costPrice;

    @BigDecimalFormat(precision = 10, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    private BigDecimal sellingPrice;

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

    private Long shopId;

    private String hsnNumber;

    private String invoiceNumber;

    @BigDecimalFormat(precision = 4, scale = 2)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    private BigDecimal margin;

    private String scheme;

    @BigDecimalFormat(precision = 13, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    private BigDecimal costWorth;

    @BigDecimalFormat(precision = 13, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    private BigDecimal salesWorth;

    @BigDecimalFormat(precision = 10, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    private BigDecimal profit;

    public void setManufacturingDate(String formattedDate) {
        if (formattedDate != null) {
            this.manufacturingDate = new DateTime(formattedDate);
        }
    }

    public String getManufacturingDate() {
        if (this.manufacturingDate != null) {
            return this.manufacturingDate.getFormattedStringForDateGeneration();
        }
        return null;
    }

    public void setExpiryDate(String formattedDate) {
        if (formattedDate != null) {
            this.expiryDate = new DateTime(formattedDate);
        }
    }

    public String getExpiryDate() {
        if (this.expiryDate != null) {
            return this.expiryDate.getFormattedStringForDateGeneration();
        }
        return null;
    }

    @Override
    public String toString() {
        return "ItemDto { " + "\n\t" +
                "id=" + id + ",\n\t" +
                "name=" + name + ",\n\t" +
                "company=" + company + ",\n\t" +
                "quantity=" + quantity + ",\n\t" +
                "freeQuantity=" + freeQuantity + ",\n\t" +
                "packingType=" + packingType + ",\n\t" +
                "batchNumber=" + batchNumber + ",\n\t" +
                "costPrice=" + costPrice + ",\n\t" +
                "sellingPrice=" + sellingPrice + ",\n\t" +
                "mrp=" + mrp + ",\n\t" +
                "sGstInPercent=" + sGstInPercent + ",\n\t" +
                "cGstInPercent=" + cGstInPercent + ",\n\t" +
                "iGstInPercent=" + iGstInPercent + ",\n\t" +
                "manufacturingDate=" + manufacturingDate + ",\n\t" +
                "expiryDate=" + expiryDate + ",\n\t" +
                "isFastMoving=" + isFastMoving + ",\n\t" +
                "shopId=" + shopId + ",\n\t" +
                "hsnNumber=" + hsnNumber + ",\n\t" +
                "invoiceNumber=" + invoiceNumber + ",\n\t" +
                "margin=" + margin + ",\n\t" +
                "scheme=" + scheme + ",\n\t" +
                "costWorth=" + costWorth + ",\n\t" +
                "salesWorth=" + salesWorth + ",\n\t" +
                "profit=" + profit + "\n" +
                '}';
    }
}