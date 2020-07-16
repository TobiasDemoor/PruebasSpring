package com.tobiasdemoor.pruebamixto.security;

import com.tobiasdemoor.pruebamixto.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class MyGrantedAuthority implements GrantedAuthority {
    @Id
    private String authority;
}
