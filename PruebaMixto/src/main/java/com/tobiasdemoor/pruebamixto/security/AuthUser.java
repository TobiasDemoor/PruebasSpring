package com.tobiasdemoor.pruebamixto.security;

import com.tobiasdemoor.pruebamixto.model.User;
import com.tobiasdemoor.pruebamixto.security.MyGrantedAuthority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AuthUser {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private String username;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.ALL })
    private Set<MyGrantedAuthority> authorities;

    @OneToOne
    private User publicUser;
    public void addAuthority(MyGrantedAuthority authority) {
        this.authorities.add(authority);
    }
}
