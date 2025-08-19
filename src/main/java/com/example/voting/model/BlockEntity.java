package com.example.voting.model;


import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "blocks")
public class BlockEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(length = 64)
    private String previousHash;


    @Lob
    private String data; // e.g. JSON of vote data (non-PII)


    @Column(length = 64)
    private String hash;


    private long timestamp;
}