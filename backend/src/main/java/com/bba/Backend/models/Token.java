package com.bba.Backend.models;


import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "_jwt_auth_tokens")
public class Token {

    @Id
    @SequenceGenerator(name = "_jwt_auth_token_id_seq", sequenceName = "_jwt_auth_token_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_jwt_auth_token_id_seq")
    private Integer id;

    @Column(name = "token", length = 266, nullable = false)
    private String token;

    @Column(name = "shop_id")
    private Integer shopId;

    private Boolean expired;

    private Boolean revoked;
}
