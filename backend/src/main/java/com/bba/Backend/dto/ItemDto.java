package com.bba.Backend.dto;

import com.bba.Backend.utils.DateTime;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.lang.NonNull;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

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

    private Double rate;

    private Integer sGstInPercent;

    private Integer cGstInPercent;

    private Integer iGstInPercent;

    private DateTime manufacturingDate;

    private DateTime expiryDate;

    private Boolean isFastMoving;

    private Double mrp;

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
                "id= " + id + ",\n\t" +
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