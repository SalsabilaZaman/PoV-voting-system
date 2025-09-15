package com.example.voting.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String nid;

    @NotBlank
    private String passwordHash; // store hashed passwords if you add auth later


    @Enumerated(EnumType.STRING)
    private Role role = Role.VOTER;

    private boolean isCandidate;
    private boolean isApproved;

    public enum Role {
        VOTER,
        ADMIN
    }
}
