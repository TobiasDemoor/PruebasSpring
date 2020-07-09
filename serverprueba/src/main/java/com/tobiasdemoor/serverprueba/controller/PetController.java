package com.tobiasdemoor.serverprueba.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tobiasdemoor.serverprueba.model.Pet;
import com.tobiasdemoor.serverprueba.service.PetService;

@RestController
@RequestMapping("/pet")
public class PetController {

	private PetService petService;
	
	@Autowired
	public PetController(PetService petService) {
		this.petService = petService;
	}
	
	@GetMapping("")
	public List<Pet> getAll(@RequestParam(required = false) String name) {
		return this.petService.getAll(name);
	}

	@GetMapping("/{petId}")
	public Optional<Pet> getPetById(@PathVariable Integer petId) {
		return this.petService.getPetById(petId);
	}
	
	@PostMapping("/")
	public void addPet(@RequestBody Pet newPet) {
		this.petService.addPet(newPet);
	}
	
	
	
}
