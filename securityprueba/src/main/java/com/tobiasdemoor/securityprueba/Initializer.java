package com.tobiasdemoor.securityprueba;

import com.tobiasdemoor.securityprueba.security.MyGrantedAuthority;
import com.tobiasdemoor.securityprueba.security.User;
import com.tobiasdemoor.securityprueba.security.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class Initializer implements CommandLineRunner {

    private final UserRepository userRepository;

    @Autowired
    public Initializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        User user = new User();
        user.setAuthorities(new ArrayList<>());
        user.getAuthorities().add(new MyGrantedAuthority("ROLE_ADMIN"));
        user.setUsername("prueba");
        user.setPassword("$2y$10$cT9xkZxxKeoj1L4mcs/VR.6Rvvm.H4020z4grN65Rc9.JOSWP0MYu");
        this.userRepository.save(user);
    }
}
