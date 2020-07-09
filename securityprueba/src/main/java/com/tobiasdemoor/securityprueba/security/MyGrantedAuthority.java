package com.tobiasdemoor.securityprueba.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class MyGrantedAuthority implements GrantedAuthority {
    @Id
    private String authority;
}
