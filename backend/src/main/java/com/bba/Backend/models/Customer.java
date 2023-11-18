package com.bba.Backend.models;

import com.bba.Backend.models.util.Address;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "_customer")
public class Customer {

    @Id
    @SequenceGenerator(name = "_customer_id_seq", sequenceName = "_customer_id_seq" , allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_customer_id_seq")
    private Integer id;

    @Column(name = "name", length = 256, nullable = false)
    private String name;

    @Column (name = "customer_number", unique = true, nullable = false)
    private Integer customerNumber;

    @Column(name = "email", length = 256)
    private String email;

    @Column(name = "phone", length = 256, nullable = false)
    private String phone;

    @Column(name = "pending_amount")
    private long pendingAmount;

    @Column(name = "created_date", length = 256)
    private Date createdDate;

    @Column(name = "total_purchase_amount")
    private long totalPurchaseAmount;

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_number", referencedColumnName = "customerNumber")
    private Address address;

    @Override
    public String toString() {
        return "Customer { " + "\n\t" +
                "id= " + getId() + ",\n\t" +
                "name= " + getName() + ",\n\t" +
                "customerNumber= " + getCustomerNumber() + ",\n\t" +
                "email= " + getEmail() + ",\n\t" +
                "phone= " + getPhone() + ",\n\t" +
                "pendingAmount= " + getPendingAmount() + ",\n\t" +
                "createdDate= " + getCreatedDate() + ",\n\t" +
                "totalPurchaseAmount= " + getTotalPurchaseAmount() + "\n" +
                "}";
    }
}
