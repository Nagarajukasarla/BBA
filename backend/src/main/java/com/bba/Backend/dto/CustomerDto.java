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

    private int id;

    private String name;

    private Integer customerNumber;

    private String email;

    private String phone;

    private long pendingAmount;

    private DateTime createdDate;

    private AddressDto addressDto;

    private long totalPurchaseAmount;

    public void setCreatedDate(@NonNull String formattedDate) {
        this.createdDate = new DateTime(formattedDate);
    }

    public String getCreatedDate() {
        return this.createdDate.getFormattedStringForDateGeneration();
    }

    @Override
    public String toString() {
        return "CustomerDto { " + "\n\t" +
                "id= " + getId() + ",\n\t" +
                "name= " + getName() + ",\n\t" +
                "customerNumber= " + getCustomerNumber() + ",\n\t" +
                "email= " + getEmail() + ",\n\t" +
                "phone= " + getPhone() + ",\n\t" +
                "pendingAmount= " + getPendingAmount() + ",\n\t" +
                "createdDate= " + getCreatedDate() + ",\n\t" +
                "address ={ " + "addressDto.toString()" + "\n" + "}," + "\n" +
                "totalPurchaseAmount= " + getTotalPurchaseAmount() + "\n" +
                "}";
    }
}