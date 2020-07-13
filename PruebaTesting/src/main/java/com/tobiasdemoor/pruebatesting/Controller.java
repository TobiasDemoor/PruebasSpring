package com.tobiasdemoor.pruebatesting;

import com.tobiasdemoor.pruebatesting.model.Person;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class Controller {

    @PostMapping("/new")
    public ResponseEntity<?> postPersona() {
        return ResponseEntity.status(HttpStatus.CREATED)
                .contentType(MediaType.TEXT_PLAIN)
                .body("");
    }

    @GetMapping("/events")
    public ResponseEntity<?> getEvent(@RequestParam("id") Integer id) {
        Map<String, Object> result = new HashMap<>();
        Map<String, Object> aux;
        List<Map<String, Object>> auxL;
        result.put("id", "390");
        aux = new HashMap<>();
        aux.put("leagueId", 35);
        aux.put("homeTeam", "Norway");
        aux.put("visitingTeam", "England");
        result.put("data", aux);
        auxL = new ArrayList<>();
        aux = new HashMap<>();
        aux.put("price", "1.30");
        aux.put("name", "1");
        auxL.add(aux);
        aux = new HashMap<>();
        aux.put("price", "5.25");
        aux.put("name", "X");
        auxL.add(aux);
        result.put("odds", auxL);

        return ResponseEntity.ok().body(result);
    }
}
