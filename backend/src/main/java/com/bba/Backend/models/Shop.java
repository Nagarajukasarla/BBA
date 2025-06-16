package com.bba.Backend.models;

import com.bba.Backend.models.util.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "_shop")
public class Shop implements UserDetails {

    @Id
    @SequenceGenerator(name = "_shop_id_seq", sequenceName = "_shop_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_shop_id_seq")
    private Long id;

    @Column(name = "name", length = 256, nullable = false)
    private String name;

    @Column(name = "gstin", length = 256, nullable = false)
    private String gstin;

    @Column(name = "drug_license_number", nullable = false)
    private String drugLicenseNumber;

    @Column(name = "email", length = 256, nullable = false)
    private String email;

    @Column(name = "password", length = 256, nullable = false)
    private String password;

    @Column(name ="mobile")
    private String mobile;

    @Column(name = "budget")
    private Long budget;

    @Column(name = "profit")
    private Long profit;

    @Column(name = "loss")
    private Long loss;

    @Enumerated(EnumType.STRING)
    Role role;

    @Column(name = "is_email_verified")
    private Boolean isEmailVerified;

    @Column(name = "is_mobile_verified")
    private Boolean isMobileVerified;

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
