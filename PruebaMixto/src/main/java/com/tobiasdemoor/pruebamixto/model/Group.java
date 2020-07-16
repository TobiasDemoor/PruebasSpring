package com.tobiasdemoor.pruebamixto.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@NoArgsConstructor
@RequiredArgsConstructor
@Data
@Entity
@Table(name = "user_groups")
public class Group {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    @NonNull
    private String name;
    private String address;
    private String city;
    private String stateOrProvince;
    private String country;
    private String postalCode;
    private String owner;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Event> events;

}
