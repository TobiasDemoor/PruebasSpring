package com.tobiasdemoor.pruebamixto.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class MyGrantedAuthority implements GrantedAuthority {
    @Id
    private String authority;
}
