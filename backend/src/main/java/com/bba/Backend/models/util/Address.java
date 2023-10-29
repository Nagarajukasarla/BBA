package com.bba.Backend.models.util;

import com.bba.Backend.models.Customer;
import com.bba.Backend.models.Partner;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "_address")
public class Address {

    @Id
    @SequenceGenerator(name = "_address_id_seq", sequenceName = "_address_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_address_id_seq")
    private Integer id;

    @Column(name = "block_number", nullable = false)
    private String blockNumber;

    @Column(name = "customer_number")
    private Integer customerNumber;

    @Column(name = "partner_email")
    private String partnerEmail;

    @Column(name = "street", nullable = false)
    private String street;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "zipcode", nullable = false)
    private String zipcode;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_number", referencedColumnName = "customer_number", unique = true, insertable = false, updatable = false)
    private Customer customer;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partner_email", referencedColumnName = "email", unique = true,insertable = false, updatable = false)
    private Partner partner;

    @Override
    public String toString() {
        return "Address { " + "\n\t" +
                "id= " + getId() + ",\n\t" +
                "blockNumber= " + getBlockNumber() + ",\n\t" +
                "customerNumber= " + getCustomerNumber() + ",\n\t" +
                "partnerEmail= " + getPartnerEmail() + ",\n\t" +
                "street= " + getStreet() + ",\n\t" +
                "city= " + getCity() + ",\n\t" +
                "state= " + getState() + ",\n\t" +
                "zipcode= " + getZipcode() + "\n" +
                "}";
    }
}
