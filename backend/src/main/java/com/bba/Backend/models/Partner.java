package com.bba.Backend.models;

import com.bba.Backend.models.util.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "_partner")
public class Partner implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "_partner_id_seq")
    @SequenceGenerator(name = "_partner_id_seq", sequenceName = "_partner_id_seq", allocationSize = 1)
    private int id;

    @Column(name = "owner", length = 256, nullable = false)
    private boolean isOwner;

    @Column(name = "first_name", length = 256, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 256, nullable = false)
    private String lastName;

    @Column(name = "email", length = 256,  nullable = false)
    private String email;

    @Column(name = "password", length = 256, nullable = false)
    private String password;

    @Column(name = "gender", length = 128, nullable = false)
    private String gender;

    @Column(name = "mobile", length = 128, nullable = false)
    private String mobile;

    @Enumerated(EnumType.STRING)
    Role role;

    @Override
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