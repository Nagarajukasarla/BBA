package com.bba.Backend.models;

import com.bba.Backend.models.util.Address;
import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "_partner")
public class Partner {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_partner_id_seq")
    @SequenceGenerator(name = "_partner_id_seq", sequenceName = "_partner_id_seq", allocationSize = 1)
    private Integer id;

    @Column(name = "first_name", length = 256, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 256, nullable = false)
    private String lastName;

    @Column(name = "email", length = 256, unique = true, nullable = false)
    private String email;

    @Column(name = "password", length = 256, nullable = false)
    private String password;

    @Column(name = "gender", length = 128, nullable = false)
    private String gender;

    @Column(name = "mobile", length = 128, nullable = false)
    private String mobile;

    @Column(name = "shop_id")
    private Integer shopId;

    @OneToOne(mappedBy = "partner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "email", referencedColumnName = "email")
    private Address address;

}