package com.bba.Backend.requestModels;


import com.bba.Backend.utils.DateTime;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@Setter
@Getter
@Builder
public class InvoiceWithItemsRequest {
    public Integer shopId;
    public String invoiceNumber;
    public Integer customerNumber;
    public String paymentMode;
    public DateTime billedDate;
    public DateTime dueDate;
    public DateTime generationDate;
    public String invoiceType;
    public List<CustomInvoiceItemRequest> items;

    public void setBilledDate(@NonNull String formattedDate) {
        this.billedDate = new DateTime(formattedDate);
    }

    public String getBilledDate() {
        return this.billedDate.getFormattedStringForDateGeneration();
    }

    public void setDueDate(@NonNull String formattedDate) {
        this.dueDate = new DateTime(formattedDate);
    }

    public String getDueDate() {
        return this.dueDate.getFormattedStringForDateGeneration();
    }

    public void setGenerationDate(@NonNull String formattedDate) {
        this.generationDate = new DateTime(formattedDate);
    }

    public String getGenerationDate() {
        return this.generationDate.getFormattedStringForDateGeneration();
    }

    @Override
    public String toString() {
        return "ItemDto { " + "\n\t" +
                "shopId=" + shopId + ",\n\t" +
                "invoiceNumber=" + invoiceNumber + ",\n\t" +
                "id= " + shopId + ",\n\t" +
                "customerNumber= " + customerNumber + ",\n\t" +
                "paymentMode= " + paymentMode + ",\n\t" +
                "billedDate= " + billedDate + ",\n\t" +
                "dueDate= " + dueDate + ",\n\t" +
                "generationDate= " + generationDate + ",\n\t" +
                "items=" + items + "\n" +
                "}";
    }
}
