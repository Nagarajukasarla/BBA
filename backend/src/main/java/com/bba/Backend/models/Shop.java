package com.bba.Backend.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "_shop")
public class Shop {

    @Id
    @SequenceGenerator(name = "_shop_id_seq", sequenceName = "_shop_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_shop_id_seq")
    private Integer id;
    @Column(name = "gst_in_number", length = 256, nullable = false)
    private String gstInNumber;

    @Column(name = "name", length = 256, nullable = false)
    private String name;

    @Column(name = "budget", nullable = false)
    private long budget;

    @Column(name = "profit")
    private long profit;

    @Column(name = "loss")
    private long loss;

//    private List<Partner> partners;
}
