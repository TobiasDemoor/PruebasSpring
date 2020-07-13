package com.tobiasdemoor.pruebacaching;

import com.tobiasdemoor.pruebacaching.model.UserDTO;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeUnit;

@RestController
public class ResourceEndpoint {
    @GetMapping("/default/users/{name}")
    public ResponseEntity<UserDTO> getUserWithDefaultCaching(@PathVariable String name) {
        return ResponseEntity.ok(new UserDTO(name));
    }

    @GetMapping("/users/{name}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String name) {
        return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(60, TimeUnit.SECONDS))
                .body(new UserDTO(name));
    }
}
