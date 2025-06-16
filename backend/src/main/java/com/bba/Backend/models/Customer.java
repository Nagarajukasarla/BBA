package com.bba.Backend.models;

import com.bba.Backend.annotations.BigDecimalFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.sql.Timestamp;
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

    @Column(name = "phone", length = 256)
    private String phone;

    @Column(name = "paid_amount", precision = 10, scale = 4)
    @BigDecimalFormat(precision = 10, scale = 4)
    private BigDecimal paidAmount;

    @Column(name = "total_purchase_amount", precision = 10, scale = 4)
    @BigDecimalFormat(precision = 10, scale = 4)
    private BigDecimal totalPurchaseAmount;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "discount", precision = 4, scale = 2)
    @BigDecimalFormat(precision = 4, scale = 2)
    private BigDecimal discount;

    @Column(name = "due_period")
    private Integer duePeriod;

    @Column(name = "total_sold_amount", precision = 10, scale = 4)
    @BigDecimalFormat(precision = 10, scale = 4)
    private BigDecimal totalSoldAmount;

    @Column(name = "shop_id", nullable = false)
    private Integer shopId;

    @Override
    public String toString() {
        return "Customer { " + "\n\t" +
                "id= " + getId() + ",\n\t" +
                "name= " + getName() + ",\n\t" +
                "customerNumber= " + getCustomerNumber() + ",\n\t" +
                "email= " + getEmail() + ",\n\t" +
                "phone= " + getPhone() + ",\n\t" +
                "paidAmount= " + getPaidAmount() + ",\n\t" +
                "createdDate= " + getCreatedDate() + ",\n\t" +
                "totalPurchaseAmount= " + getTotalPurchaseAmount() + "\n\t" +
                "discount= " + getDiscount() + "\n\t" +
                "duePeriod=" + getDuePeriod() + "\n" +
                "}";
    }
}
