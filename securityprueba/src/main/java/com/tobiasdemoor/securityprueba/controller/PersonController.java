package com.tobiasdemoor.securityprueba.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/person")
public class PersonController {

    @GetMapping("/{personId}")
    public String getPersonById(@PathVariable Integer personId) {
        return "holanda";
    }
}
