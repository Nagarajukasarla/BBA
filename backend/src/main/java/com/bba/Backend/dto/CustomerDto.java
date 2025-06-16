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
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerDto {

    public Integer id;

    public String customerName;

    public Integer customerNumber;

    public String email;

    public String phone;

    @BigDecimalFormat(precision = 10, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    public BigDecimal paidAmount;

    @BigDecimalFormat(precision = 10, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    public BigDecimal pendingAmount;

    @BigDecimalFormat(precision = 10, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    public BigDecimal totalPurchaseAmount;

    @BigDecimalFormat(precision = 4, scale = 2)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    public BigDecimal discount;

    public DateTime createdDate;

    public AddressDto addressDto;

    public Integer duePeriod;

    public void setCreatedDate(@NonNull String formattedDate) {
        this.createdDate = new DateTime(formattedDate);
    }

    public String getCreatedDate() {
        return this.createdDate.getFormattedStringForDateGeneration();
    }

    @Override
    public String toString() {
        return "CustomerDto { " + "\n\t" +
                "id= " + id + ",\n\t" +
                "name= " + customerName + ",\n\t" +
                "customerNumber= " + customerNumber + ",\n\t" +
                "email= " + email + ",\n\t" +
                "phone= " + phone + ",\n\t" +
                "paidAmount= " + paidAmount + ",\n\t" +
                "pendingAmount=" + pendingAmount + "\n\t" +
                "createdDate= " + createdDate + ",\n\t" +
                "totalPurchaseAmount= " + totalPurchaseAmount + "\n\t" +
                "discount= " + discount + "\n\t" +
                "duePeriod=" + duePeriod + "\n" +
                "address ={ " + addressDto.toString() + "\n" + "}," + "\n" +
                "}";
    }
}