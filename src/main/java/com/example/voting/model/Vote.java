package com.example.voting.model;


import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"voter_id", "election_id"}))
public class Vote {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(optional = false)
    private User voter;


    @ManyToOne(optional = false)
    private Election election;


    @ManyToOne(optional = false)
    private Candidate candidate;


    private LocalDateTime castAt;


    // Store the receipt hash the user can use to verify
    private String receiptHash;
}