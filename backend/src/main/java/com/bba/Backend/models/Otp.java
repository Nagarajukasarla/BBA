package com.bba.Backend.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Table(name = "_otp")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Otp {
    @Id
    @SequenceGenerator(name = "_otp_id_seq", sequenceName = "_otp_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_otp_id_seq")
    private Long id;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "otp", nullable = false)
    private String otp;

    @Column(name = "created_at", insertable = false, updatable = false)
    private Date createdAt;

    @Column(name = "expires_at", insertable = false, updatable = false)
    private Date expiresAt;
}