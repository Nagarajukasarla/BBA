package com.bba.Backend.models;

import com.bba.Backend.annotations.BigDecimalFormat;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "_item")
public class Item {

    @Id
    @SequenceGenerator(name = "_item_id_seq", sequenceName = "_item_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_item_id_seq")
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "company", nullable = false)
    private String company;

    @Column(name = "packing_type")
    private Integer packingType;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "batch_number", nullable = false)
    private String batchNumber;

    @Column(name = "rate", precision = 10, scale = 4, nullable = false)
    @BigDecimalFormat(precision = 10, scale = 4)
    private BigDecimal rate;

    @Column(name = "mrp", precision = 10, scale = 4, nullable = false)
    @BigDecimalFormat(precision = 10, scale = 4)
    private BigDecimal mrp;

    @Column(name = "s_gst_in_percent", precision = 4, scale = 2)
    @BigDecimalFormat(precision = 4, scale = 2)
    private BigDecimal sGstInPercent;

    @Column(name = "c_gst_in_percent", precision = 4, scale = 2)
    @BigDecimalFormat(precision = 4, scale = 2)
    private BigDecimal cGstInPercent;

    @Column(name = "i_gst_in_percent", precision = 4, scale = 2)
    @BigDecimalFormat(precision = 4, scale = 2)
    private BigDecimal iGstInPercent;

    @Column(name = "manufacturing_date", nullable = false)
    private Date manufacturingDate;

    @Column(name = "expiry_date", nullable = false)
    private Date expiryDate;

    @Column(name = "is_fast_moving")
    private Boolean isFastMoving;

    @Column(name = "shop_id", nullable = false)
    private Integer shopId;

    @Column(name = "hsn_number")
    private String hsnNumber;

    @Column(name = "invoice_number")
    private String invoiceNumber;
}