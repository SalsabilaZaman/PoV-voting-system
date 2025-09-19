package com.example.voting.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Candidate {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;
    private String affiliation;


    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Election election;
}