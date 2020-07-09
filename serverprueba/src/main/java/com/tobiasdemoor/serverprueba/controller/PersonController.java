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

import com.tobiasdemoor.serverprueba.model.Person;
import com.tobiasdemoor.serverprueba.service.PersonService;

@RestController
@RequestMapping("/person")
public class PersonController {
	
	private final PersonService personService;
	
	@Autowired
	public PersonController(PersonService personService) {
		this.personService = personService;
	}
	
	@GetMapping("")
	public List<Person> getAll(@RequestParam(required = false) String name) {
		return this.personService.getAll(name);
	}

	@GetMapping("/{personId}")
	public Optional<Person> getPersonById(@PathVariable Integer personId) {
		return this.personService.getPersonById(personId);
	}
	
	@PostMapping("/")
	public void addPerson(@RequestBody Person newPerson) {
		this.personService.addPerson(newPerson);
	}
}
