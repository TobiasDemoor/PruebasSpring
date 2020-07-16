package com.tobiasdemoor.pruebamixto;

import com.tobiasdemoor.pruebamixto.model.Event;
import com.tobiasdemoor.pruebamixto.model.Group;
import com.tobiasdemoor.pruebamixto.model.User;
import com.tobiasdemoor.pruebamixto.repositories.AuthoritiesRepository;
import com.tobiasdemoor.pruebamixto.repositories.GroupRepository;
import com.tobiasdemoor.pruebamixto.repositories.UserRepository;
import com.tobiasdemoor.pruebamixto.security.MyGrantedAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.stream.Stream;

@Component
public class Initializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final GroupRepository groupRepository;
    private final AuthoritiesRepository authoritiesRepository;

    @Autowired
    public Initializer(UserRepository userRepository, GroupRepository groupRepository, AuthoritiesRepository authoritiesRepository) {
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.authoritiesRepository = authoritiesRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        User user = new User();
        MyGrantedAuthority auth = new MyGrantedAuthority("ROLE_ADMIN");
        user.setAuthorities(new HashSet<>());
        user.setUsername("prueba");
        user.setPassword("$2y$10$cT9xkZxxKeoj1L4mcs/VR.6Rvvm.H4020z4grN65Rc9.JOSWP0MYu");
        user.addAuthority(auth);
        this.userRepository.save(user);
        this.authoritiesRepository.save(auth);

        Stream.of("Denver JUG", "Utah JUG", "Seattle JUG",
                "Richmond JUG").forEach(name ->
                groupRepository.save(new Group(name))
        );

        Group denverJug = groupRepository.findByName("Denver JUG");
        Event e = Event.builder().title("Full Stack Reactive")
                .description("Reactive with Spring Boot + React")
                .date(Instant.parse("2018-12-12T18:00:00.000Z"))
                .build();
        denverJug.setEvents(Collections.singleton(e));
        denverJug.setOwner(user.getUsername());
        groupRepository.save(denverJug);
    }
}
