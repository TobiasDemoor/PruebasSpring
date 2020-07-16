package com.tobiasdemoor.pruebamixto.repositories;

import com.tobiasdemoor.pruebamixto.security.MyGrantedAuthority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthoritiesRepository extends JpaRepository<MyGrantedAuthority, String> {
}
