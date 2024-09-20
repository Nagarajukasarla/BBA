package com.bba.Backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "_company")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Company {
    @Id
    @SequenceGenerator(name = "_company_id_seq", sequenceName = "_company_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_company_id_seq")
    private Integer id;

    @Column(name = "name", length = 256, nullable = false)
    private String name;

    @Column(name = "shop_id", nullable = false)
    private Integer shopId;

}
