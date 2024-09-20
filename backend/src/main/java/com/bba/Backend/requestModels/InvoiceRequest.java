package com.bba.Backend.requestModels;

import com.bba.Backend.annotations.BigDecimalFormat;
import com.bba.Backend.dto.InvoiceItemDto;
import com.bba.Backend.utils.BigDecimalDeserializer;
import com.bba.Backend.utils.DateTime;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.springframework.lang.NonNull;

import java.math.BigDecimal;
import java.util.List;

public class InvoiceRequest {

    public Integer customerNumber;

    public String paymentMode;

    public List<InvoiceItemDto> items;

    @BigDecimalFormat(precision = 10, scale = 4)
    @JsonDeserialize(using = BigDecimalDeserializer.class)
    public BigDecimal amount;

    public String status;

    public DateTime generationDate;

    public void setGenerationDate (@NonNull String formattedDate) {
        this.generationDate = new DateTime(formattedDate);
    }

    public String getGenerationDate() {
        return this.generationDate.getFormattedStringForDateGeneration();
    }
}
