package com.tobiasdemoor.serverprueba.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tobiasdemoor.serverprueba.model.Pet;
import com.tobiasdemoor.serverprueba.repository.PetRepository;

@Service
public class PetService {
	private PetRepository petRepository;

	@Autowired
	public PetService(PetRepository petRepository) {
		this.petRepository = petRepository;
	}

	public List<Pet> getAll(String name) {
		List<Pet> result;
		if (name != null) {
			result = this.petRepository.findByName(name);
		} else {
			result = this.petRepository.findAll();
		}
		return result;
	}	
	
	public void addPet(Pet newPet) {
		this.petRepository.save(newPet);
		
	}

	public Optional<Pet> getPetById(Integer petId) {
		return this.petRepository.findById(petId);
	}

}
