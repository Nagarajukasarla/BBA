package com.bba.Backend.models;

import com.bba.Backend.annotations.BigDecimalFormat;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

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

    @Column(name = "rate", precision = 10, scale = 4, nullable = false)
    @BigDecimalFormat(precision = 10, scale = 4)
    private BigDecimal rate;

    @Column(name = "price", precision = 10, scale = 4, nullable = false)
    @BigDecimalFormat(precision = 10, scale = 4)
    private BigDecimal price;

    @Column(name = "discount", precision = 4, scale = 2, nullable = false)
    @BigDecimalFormat(precision = 4, scale = 2)
    private BigDecimal discount;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "shop_id")
    private Integer shopId;

    @ManyToOne
    @JoinColumn(name = "invoice_number", referencedColumnName = "number", insertable = false, updatable = false)
    private Invoice invoice;

}
