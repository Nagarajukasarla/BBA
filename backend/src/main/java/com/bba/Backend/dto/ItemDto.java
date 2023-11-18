package com.bba.Backend.dto;

import com.bba.Backend.utils.DateTime;
import lombok.*;
import org.springframework.lang.NonNull;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemDto {

    public Integer id;

    public String name;

    public String company;

    public Integer quantity;

    public Integer packingType;

    public String batchNumber;

    public Double rate;

    public Integer sGstInPercent;

    public Integer cGstInPercent;

    public Integer iGstInPercent;

    public DateTime manufacturingDate;

    public DateTime expiryDate;

    public Boolean isFastMoving;

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