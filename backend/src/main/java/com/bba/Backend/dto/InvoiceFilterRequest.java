package com.bba.Backend.dto;

import com.bba.Backend.utils.DateTime;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceFilterRequest {

    private Integer customerNumber;

    private String paymentMode;

    private String status;

    private DateTime startDate;

    private DateTime endDate;

    public void setStartDate(String formattedDateString) {
        this.startDate = (formattedDateString != null) ? new DateTime(formattedDateString) : null;
    }

    public Date getStartDate() {
        return (startDate != null)
                ? DateTime.formatDate(startDate.getFormattedStringForDateGeneration())
                : null;
    }

    public Date getEndDate() {
        return (endDate != null)
                ? DateTime.formatDate(endDate.getFormattedStringForDateGeneration())
                : null;
    }

    public void setEndDate(String formattedDateString) {
        this.endDate = (formattedDateString != null) ? new DateTime(formattedDateString) : null;
    }

}
