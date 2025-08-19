package com.voting.model;

import com.voting.model.enums.Role;
import jakarta.persistence.*;
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

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean isCandidate;
    private boolean isApproved;
}
