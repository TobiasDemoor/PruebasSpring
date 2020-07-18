package com.tobiasdemoor.pruebamixto.repositories;

import com.tobiasdemoor.pruebamixto.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
