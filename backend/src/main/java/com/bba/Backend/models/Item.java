package com.bba.Backend.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
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

    @Column(name = "description", length = 256)
    private String description;

    @Column(name = "price", nullable = false)
    private Integer price;

    @Column(name = "s_gst_in_percent", nullable = false)
    private Integer SGSTInPercent;

    @Column(name = "c_gst_in_percent", nullable = false)
    private Integer CGSTInPercent;

    @Column(name = "gst_in_percent", nullable = false)
    private Integer GSTInPercent;

    @Column(name = "manufacturing_date", nullable = false)
    private Date manufacturingDate;

    @Column(name = "expiry_date", nullable = false)
    private Date expiryDate;

    @Column(name = "is_fast_moving", nullable = false)
    private Boolean isFastMoving;

}