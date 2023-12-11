package com.bba.Backend.requestModels;

import com.bba.Backend.dto.InvoiceItemDto;
import com.bba.Backend.utils.DateTime;
import org.springframework.lang.NonNull;

import java.util.List;

public class InvoiceRequest {

    public Integer customerNumber;

    public String paymentMode;

    public List<InvoiceItemDto> items;

    public Double amount;

    public DateTime generationDate;

    public void setGenerationDate (@NonNull String formattedDate) {
        this.generationDate = new DateTime(formattedDate);
    }

    public String getGenerationDate() {
        return this.generationDate.getFormattedStringForDateGeneration();
    }
}
