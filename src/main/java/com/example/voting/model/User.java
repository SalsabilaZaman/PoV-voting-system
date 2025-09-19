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

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Role role = Role.VOTER;

    private boolean isCandidate;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String birthdate; // Store as String for simplicity, or use LocalDate if preferred

    @NotBlank
    private String motherName;

    @NotBlank
    private String fatherName;

    public enum Role {
        VOTER,
        ADMIN
    }
}
