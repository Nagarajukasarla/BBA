package com.bba.Backend.dto;

import com.bba.Backend.annotations.BigDecimalFormat;
import com.bba.Backend.models.Customer;
import com.bba.Backend.models.InvoiceItem;
import com.bba.Backend.utils.BigDecimalDeserializer;
import com.bba.Backend.utils.DateTime;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.deser.std.NumberDeserializers;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDto {

    public Long id;

    public String invoiceNumber;

    public Integer customerNumber;

    public String customerName;

    public DateTime generationDate;

    public String paymentMode;

    public String status;

    @BigDecimalFormat(precision = 13, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    public BigDecimal amount;

    public AddressDto customerAddressDto;

    public void setGenerationDate (@NonNull String formattedDate) {
        this.generationDate = new DateTime(formattedDate);
    }
    
    public String getGenerationDate () {
        return this.generationDate.getFormattedStringForDateGeneration();
    }
}