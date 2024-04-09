package com.bba.Backend.dto;
import com.bba.Backend.utils.DateTime;
import lombok.*;
import org.springframework.lang.NonNull;

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

    public Double paidAmount;

    public Double pendingAmount;

    public DateTime createdDate;

    public AddressDto addressDto;

    public Double totalPurchaseAmount;

    public Double discount;

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