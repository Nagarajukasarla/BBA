package com.bba.Backend.dto;

import com.bba.Backend.models.Customer;
import com.bba.Backend.models.InvoiceItem;
import com.bba.Backend.utils.DateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDto {

    public String id;

    public String number;

    public Integer customerNumber;

    public String customerName;

    public DateTime generationDate;

    public String paymentMode;

    public Double amount;

    public void setGenerationDate (@NonNull String formattedDate) {
        this.generationDate = new DateTime(formattedDate);
    }
    
    public String getGenerationDate () {
        return this.generationDate.getFormattedStringForDateGeneration();
    }
}