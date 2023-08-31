package com.bba.Backend.models.util;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "_address")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Address {

    @Id
    @SequenceGenerator(name = "_address_id_seq", sequenceName = "_address_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_address_id_seq")
    private int id;

    @Column(name = "block_number", nullable = false)
    private String blockNumber;

    @Column(name = "street", nullable = false)
    private String street;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "zipcode", nullable = false)
    private int zipcode;

    @Column(name = "email", nullable = false)
    private String email;

}
