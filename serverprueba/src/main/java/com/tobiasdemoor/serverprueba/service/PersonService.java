package com.tobiasdemoor.serverprueba.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tobiasdemoor.serverprueba.model.Person;
import com.tobiasdemoor.serverprueba.repository.PersonRepository;

@Service
public class PersonService {
	private final PersonRepository personRepository;

	@Autowired
	public PersonService(PersonRepository personRepository) {
		this.personRepository = personRepository;
	}

	public List<Person> getAll(String name) {
		List<Person> result;
		if (name != null) {
			result = this.personRepository.findByName(name);
		} else {
			result = this.personRepository.findAll();
		}
		return result;
	}	
	
	public void addPerson(Person newPerson) {
		this.personRepository.save(newPerson);
		
	}

	public Optional<Person> getPersonById(Integer personId) {
		return this.personRepository.findById(personId);
	}

}
