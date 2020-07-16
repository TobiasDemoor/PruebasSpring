package com.tobiasdemoor.pruebamixto.controller;

import com.tobiasdemoor.pruebamixto.model.User;
import com.tobiasdemoor.pruebamixto.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("")
    public ResponseEntity<?> getUser(Principal principal) {
        User user = principal == null ? null : this.userRepository.findByUsername(principal.getName());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("");
        } else {
            return ResponseEntity.ok().body(user);
        }

    }
}
