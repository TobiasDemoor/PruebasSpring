package com.tobiasdemoor.pruebamixto.model;

import com.tobiasdemoor.pruebamixto.security.MyGrantedAuthority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private String username;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.ALL })
    private Set<MyGrantedAuthority> authorities;

    public void addAuthority(MyGrantedAuthority authority) {
        this.authorities.add(authority);
    }
}
