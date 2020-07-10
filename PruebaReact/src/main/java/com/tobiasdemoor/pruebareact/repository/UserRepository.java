package com.tobiasdemoor.pruebareact.repository;

import com.tobiasdemoor.pruebareact.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
