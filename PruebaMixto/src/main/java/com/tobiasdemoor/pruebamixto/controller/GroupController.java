package com.tobiasdemoor.pruebamixto.controller;

import com.tobiasdemoor.pruebamixto.security.AuthUser;
import com.tobiasdemoor.pruebamixto.model.Group;
import com.tobiasdemoor.pruebamixto.repositories.GroupRepository;
import com.tobiasdemoor.pruebamixto.repositories.AuthUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private final Logger log = LoggerFactory.getLogger(GroupController.class);
    private final GroupRepository groupRepository;
    private final AuthUserRepository authUserRepository;

    @Autowired
    public GroupController(GroupRepository groupRepository, AuthUserRepository authUserRepository) {
        this.groupRepository = groupRepository;
        this.authUserRepository = authUserRepository;
    }

    @GetMapping("")
    public ResponseEntity<?> getAll(Principal principal) {
        Optional<AuthUser> user = authUserRepository.findByUsername(principal.getName());
        if (!user.isPresent()) {
            throw new UsernameNotFoundException(principal.getName());
        }
        return ResponseEntity.ok().body(groupRepository.findAllByOwner(user.get().getPublicUser()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGroupById(@PathVariable Long id) {
        Optional<Group> group = groupRepository.findById(id);
        return group.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    ResponseEntity<Group> createGroup(@RequestBody Group group, Principal principal) throws URISyntaxException {
        log.info("Request to create group: {}", group);
        Optional<AuthUser> user = authUserRepository.findByUsername(principal.getName());
        if (!user.isPresent()) {
            throw new UsernameNotFoundException(principal.getName());
        }
        group.setOwner(user.get().getPublicUser());

        Group result = groupRepository.save(group);
        return ResponseEntity.created(new URI("/api/group/" + result.getId()))
                .body(result);
    }

    @PutMapping("/{id}")
    ResponseEntity<Group> updateGroup(@PathVariable Long id, @RequestBody Group group) {
        group.setId(id);
        log.info("Request to update group: {}", group);
        Group result = groupRepository.save(group);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        log.info("Request to delete group: {}", id);
        groupRepository.deleteById(id);
            return ResponseEntity.ok().build();
    }
}
