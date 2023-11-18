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

    public int id;

    public String name;

    public Integer customerNumber;

    public String email;

    public String phone;

    public long pendingAmount;

    public DateTime createdDate;

    public AddressDto addressDto;

    public long totalPurchaseAmount;

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
                "name= " + name + ",\n\t" +
                "customerNumber= " + customerNumber + ",\n\t" +
                "email= " + email + ",\n\t" +
                "phone= " + phone + ",\n\t" +
                "pendingAmount= " + pendingAmount + ",\n\t" +
                "createdDate= " + createdDate + ",\n\t" +
                "address ={ " + "addressDto.toString()" + "\n" + "}," + "\n" +
                "totalPurchaseAmount= " + totalPurchaseAmount + "\n" +
                "}";
    }
}