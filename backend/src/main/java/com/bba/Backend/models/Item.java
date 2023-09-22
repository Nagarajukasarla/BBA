package com.bba.Backend.models;

import jakarta.persistence.*;
import lombok.*;

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

    @Column(name = "name", length = 256, nullable = false)
    private String name;

    @Column(name = "company", length = 256, nullable = false)
    private String company;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "batch_number", length = 256, nullable = false)
    private String batchNumber;

    @Column(name = "rate", nullable = false)
    private Integer rate;

    @Column(name = "s_gst_in_percent", nullable = false)
    private Integer SGSTInPercent;

    @Column(name = "c_gst_in_percent", nullable = false)
    private Integer CGSTInPercent;

    @Column(name = "i_gst_in_percent", nullable = false)
    private Integer IGSTInPercent;

    @Column(name = "manufacturing_date", nullable = false)
    private Date manufacturingDate;

    @Column(name = "expiry_date", nullable = false)
    private Date expiryDate;

    @Column(name = "is_fast_moving", nullable = false)
    private Boolean isFastMoving;

}