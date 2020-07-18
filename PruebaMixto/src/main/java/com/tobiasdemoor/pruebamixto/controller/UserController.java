package com.tobiasdemoor.pruebamixto.controller;

import com.tobiasdemoor.pruebamixto.model.User;
import com.tobiasdemoor.pruebamixto.repositories.AuthoritiesRepository;
import com.tobiasdemoor.pruebamixto.repositories.UserRepository;
import com.tobiasdemoor.pruebamixto.security.AuthUser;
import com.tobiasdemoor.pruebamixto.repositories.AuthUserRepository;
import com.tobiasdemoor.pruebamixto.security.MyGrantedAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashSet;
import java.util.Optional;

import static java.util.Objects.isNull;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final AuthUserRepository authUserRepository;
    private final UserRepository userRepository;
    private final AuthoritiesRepository authoritiesRepository;
    private final BCryptPasswordEncoder encoder;

    @Autowired
    public UserController(AuthUserRepository authUserRepository, UserRepository userRepository,
            AuthoritiesRepository authoritiesRepository, BCryptPasswordEncoder encoder) {
        this.authUserRepository = authUserRepository;
        this.userRepository = userRepository;
        this.authoritiesRepository = authoritiesRepository;
        this.encoder = encoder;
    }

    @GetMapping("")
    public ResponseEntity<?> getUser(Principal principal) {
        Optional<AuthUser> authUser;
        ResponseEntity<?> responseEntity;
        if (!isNull(principal)) {
            authUser = this.authUserRepository.findByUsername(principal.getName());
        } else {
            authUser = Optional.empty();
        }
        if (authUser.isPresent()) {
            responseEntity = ResponseEntity.ok().body(authUser.get().getPublicUser());
        } else {
            responseEntity = ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Exception("User not logged in"));
        }
        return responseEntity;
    }

    @PostMapping("/")
    public ResponseEntity<?> signUp(@RequestBody AuthUser newUser) {
        ResponseEntity<?> responseEntity;
        if (!this.authUserRepository.findByUsername(newUser.getUsername()).isPresent()) {
            newUser.setPassword(this.encoder.encode(newUser.getPassword()));
            newUser.setAuthorities(new HashSet<>());
            newUser.addAuthority(this.authoritiesRepository.findById("ROLE_ADMIN")
                    .orElse(new MyGrantedAuthority("ROLE_ADMIN")));
            this.userRepository.save(newUser.getPublicUser());
            this.authUserRepository.save(newUser);
            responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(newUser.getPublicUser());
        } else {
            responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Exception("Username already in use"));
        }
        return responseEntity;
    }
}
