package com.tobiasdemoor.pruebamixto.security;

import com.tobiasdemoor.pruebamixto.repositories.AuthUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;


@Component
public class MyDatabaseUserDetailsService implements UserDetailsService {

    private final AuthUserRepository authUserRepository;

    @Autowired
    public MyDatabaseUserDetailsService(AuthUserRepository authUserRepository) {
        this.authUserRepository = authUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AuthUser> authUser = this.authUserRepository.findByUsername(username);
        AuthUser user;
        if (!authUser.isPresent()) {
            throw new UsernameNotFoundException(username);
        } else {
            user = authUser.get();
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.getAuthorities());
        }
    }
}
