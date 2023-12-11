package com.bba.Backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Builder
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_invoice")
public class Invoice {

    @Id
    @SequenceGenerator(name = "_invoice_id_seq", sequenceName = "_invoice_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_invoice_id_seq")
    private Integer id;

    @Column(name = "number", nullable = false, unique = true)
    private String number;

    @Column(name = "customer_number")
    private Integer customerNumber;

    @Column(name = "generation_date", nullable = false)
    private Date generationDate;

    @Column(name = "payment_mode", nullable = false)
    private String paymentMode;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_number", referencedColumnName = "customer_number", unique = true, insertable = false, updatable = false)
    private Customer customer;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<InvoiceItem> invoiceItems;
}