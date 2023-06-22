package com.bba.Backend.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "_customer")
public class Customer {

    @Id
    @SequenceGenerator(name = "_customer_id_seq", sequenceName = "_customer_id_seq" , allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_customer_id_seq")
    private Integer id;

    @Column(name = "name", length = 256, nullable = false)
    private String name;

    @Column(name = "email", length = 256, nullable = false)
    private String email;

    @Column(name = "pending_amount")
    private long pendingAmount;

    @Column(name = "due_date")
    private Date dueDate;

    @Column(name = "total_purchase_amount")
    private long totalPurchaseAmount;
}
