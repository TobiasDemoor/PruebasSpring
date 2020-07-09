package com.tobiasdemoor.serverprueba.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tobiasdemoor.serverprueba.model.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer>{

	@Query(value = "Select * from person where name = ?1", nativeQuery = true)
	List<Person> findByName(String name);
}
