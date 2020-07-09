package com.tobiasdemoor.serverprueba.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tobiasdemoor.serverprueba.model.Pet;

@Repository
public interface PetRepository extends JpaRepository<Pet, Integer>{

	@Query(value = "Select * from pet where name = ?1", nativeQuery = true)
	List<Pet> findByName(String name);
	
}
