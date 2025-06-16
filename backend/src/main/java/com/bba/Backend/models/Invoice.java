package com.bba.Backend.models;

import com.bba.Backend.annotations.BigDecimalFormat;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
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
    private Long id;

    @Column(name = "number", nullable = false, unique = true)
    private String number;

    @Column(name = "customer_number")
    private Integer customerNumber;

    @Column(name = "generation_date", nullable = false)
    private Date generationDate;

    @Column(name = "billed_date")
    private Date billedDate;

    @Column(name = "due_date")
    private Date dueDate;

    @Column(name = "payment_mode", nullable = false)
    private String paymentMode;

    @Column(name = "amount", precision = 13, scale = 4, nullable = false)
    @BigDecimalFormat(precision = 13, scale = 4)
    private BigDecimal amount;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "shop_id", nullable = false)
    private Integer shopId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_number", referencedColumnName = "customer_number", unique = true, insertable = false, updatable = false)
    private Customer customer;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<InvoiceItem> invoiceItems;
}