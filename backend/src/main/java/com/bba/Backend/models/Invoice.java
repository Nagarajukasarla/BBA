package com.bba.Backend.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "_invoice")
public class Invoice {

    @Id
    @SequenceGenerator(name = "_invoice_id_seq", sequenceName = "_invoice_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_invoice_id_seq")
    private Integer id;

    @Column(name = "number", nullable = false)
    private String number;

    @Column(name = "generation_date", nullable = false)
    private Date generationDate;

    @Column(name = "payment_mode", nullable = false)
    private String paymentMode;

//    private List<Item> items;
//    private Customer customer;

}