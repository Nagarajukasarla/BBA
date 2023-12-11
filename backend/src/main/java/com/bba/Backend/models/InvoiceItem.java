package com.bba.Backend.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "_invoice_item")
public class InvoiceItem {

    @Id
    @SequenceGenerator(name = "_invoice_item_id_seq", sequenceName = "_invoice_item_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_invoice_item_id_seq")
    private Integer id;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(name = "invoice_number", nullable = false)
    private String invoiceNumber;

    @Column(name = "item_batch_number", nullable = false)
    private String itemBatchNumber;

    @Column(name = "company", nullable = false)
    private String company;

    @Column(name = "rate", nullable = false)
    private Double rate;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "discount", nullable = false)
    private Double discount;

    @Column(name = "price", nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name = "invoice_number", referencedColumnName = "number", insertable = false, updatable = false)
    private Invoice invoice;

}
