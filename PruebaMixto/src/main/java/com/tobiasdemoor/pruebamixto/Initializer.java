package com.tobiasdemoor.pruebamixto;

import com.tobiasdemoor.pruebamixto.repositories.UserRepository;
import com.tobiasdemoor.pruebamixto.security.AuthUser;
import com.tobiasdemoor.pruebamixto.model.Event;
import com.tobiasdemoor.pruebamixto.model.Group;
import com.tobiasdemoor.pruebamixto.model.User;
import com.tobiasdemoor.pruebamixto.repositories.AuthoritiesRepository;
import com.tobiasdemoor.pruebamixto.repositories.GroupRepository;
import com.tobiasdemoor.pruebamixto.repositories.AuthUserRepository;
import com.tobiasdemoor.pruebamixto.security.MyGrantedAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.HashSet;
import java.util.stream.Stream;

@Component
public class Initializer implements CommandLineRunner {
    private final AuthUserRepository authUserRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    @Autowired
    public Initializer(AuthUserRepository authUserRepository, GroupRepository groupRepository, UserRepository userRepository, BCryptPasswordEncoder encoder) {
        this.authUserRepository = authUserRepository;
        this.groupRepository = groupRepository;
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) throws Exception {
        User user = new User();
        AuthUser authUser = new AuthUser();
        user.setName("Usuario prueba");
        authUser.setAuthorities(new HashSet<>());
        authUser.addAuthority(new MyGrantedAuthority("ROLE_ADMIN"));
        authUser.setUsername("prueba");
        authUser.setPassword(this.encoder.encode("prueba"));
        authUser.setPublicUser(user);
        this.userRepository.save(user);
        this.authUserRepository.save(authUser);

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
        denverJug.setOwner(authUser.getPublicUser());
        groupRepository.save(denverJug);
    }
}
