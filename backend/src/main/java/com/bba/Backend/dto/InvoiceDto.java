package com.bba.Backend.dto;

import com.bba.Backend.models.Customer;
import com.bba.Backend.models.InvoiceItem;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDto {

    private String id;

    private Integer number;

    private DateTime generationDate;

    private List<InvoiceItem> invoiceItems;

    private Customer customer;
    
    public void setGenerationDate (@NonNull String formattedDate) {
        this.generationDate = new DateTime(formattedDate);
    }
    
    public String getGenerationDate () {
        return this.getGenerationDate.getFormattedStringForDateGeneration();
    }
}