// package com.example.voting.controller;

// import org.springframework.http.ResponseEntity;
// import org.springframework.http.HttpStatus;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import com.example.voting.blockchain.BlockchainService;
// import com.example.voting.model.User;
// import com.example.voting.model.Vote;
// import com.example.voting.repository.UserRepository;
// import com.example.voting.service.VoteService;
// import com.example.voting.util.JwtUtil;
// import jakarta.validation.constraints.NotBlank;
// import lombok.Data;
// import lombok.RequiredArgsConstructor;
// import org.springframework.web.bind.annotation.*;

// import java.time.LocalDateTime;
// import java.util.List;
// import java.util.Map;
// import java.util.Optional;

// @RestController
// // @RequestMapping("/api")
// @RequiredArgsConstructor
// @CrossOrigin

// public class ApiControllers {
//     private final VoteService voteService;
//     private final UserRepository userRepository;
//     private final BlockchainService blockchainService;
//     private final JwtUtil jwtUtil;
//     private final com.example.voting.service.UserService userService;

//     // ===== Users (minimal; add auth later if needed) =====
//     @PostMapping("/users")
//     public User createUser(@RequestBody CreateUserReq req) {
//         BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//         User.Role role = req.getRole();
//         if (role == null) {
//             role = User.Role.VOTER;
//         }
//         User u = User.builder()
//                 .email(req.getEmail())
//                 .passwordHash(encoder.encode(req.getPassword()))
//                 .nid(req.getNid())
//                 .role(role)
//                 .build();
//         return userRepository.save(u);
//     }

//     @PostMapping("/signin")
//     public ResponseEntity<?> signIn(@RequestBody SignInRequest req) {
//         try {
//             User user = userService.signIn(req.getEmail(), req.getPassword());
//             String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
//             Map<String, Object> userInfo = Map.of(
//                     "id", user.getId(),
//                     "email", user.getEmail(),
//                     "nid", user.getNid(),
//                     "role", user.getRole(),
//                     "isCandidate", user.isCandidate());
//             return ResponseEntity.ok(Map.of(
//                     "token", token,
//                     "user", userInfo));
//         } catch (org.springframework.security.core.userdetails.UsernameNotFoundException e) {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
//         }
//         // Optional<User> userOpt = userRepository.findByEmail(req.getEmail());
//         // if (userOpt.isEmpty()) {
//         // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
//         // }
//         // User user = userOpt.get();
//         // BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//         // if (!encoder.matches(req.getPassword(), user.getPasswordHash())) {
//         // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid
//         // credentials");
//         // }
//         // String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
//         // Map<String, Object> userInfo = Map.of(
//         // "id", user.getId(),
//         // "email", user.getEmail(),
//         // "nid", user.getNid(),
//         // "role", user.getRole(),
//         // "isCandidate", user.isCandidate(),
//         // "isApproved", user.isApproved()
//         // );
//         // return ResponseEntity.ok(Map.of(
//         // "token", token,
//         // "user", userInfo
//         // ));
//     }

//     @GetMapping("/users")
//     public List<User> listUsers() {
//         return userRepository.findAll();
//     }

//     // ===== Voting =====
//     @PostMapping("/votes")
//     public Vote castVote(@RequestBody CastVoteReq req) {
//         return voteService.castVote(req.getUserId(), req.getElectionId(), req.getCandidateId());
//     }

//     @GetMapping("/results/{electionId}")
//     public Map<String, Integer> getResults(@PathVariable Long electionId) {
//         return voteService.computeResults(electionId);
//     }

//     // ===== Blockchain =====
//     @GetMapping("/blockchain/is-valid")
//     public Map<String, Object> isValid() {
//         return Map.of("valid", blockchainService.isValid(), "length", blockchainService.getChain().size());
//     }

//     // ===== DTOs =====
//     @Data
//     public static class CreateUserReq {
//         @NotBlank
//         private String email;
//         @NotBlank
//         private String password;
//         @NotBlank
//         private String nid;
//         private User.Role role;
//     }

//     @Data
//     public static class CastVoteReq {
//         private Long userId;
//         private Long electionId;
//         private Long candidateId;
//     }

//     @Data
//     public static class SignInRequest {
//         private String email;
//         private String password;
//     }
// }

package com.example.voting.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.voting.blockchain.BlockchainService;
import com.example.voting.model.User;
import com.example.voting.model.Vote;
import com.example.voting.repository.UserRepository;
import com.example.voting.service.VoteService;
import com.example.voting.util.JwtUtil;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
// @RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin
public class ApiControllers {
    private final VoteService voteService;
    private final UserRepository userRepository;
    private final BlockchainService blockchainService;
    private final JwtUtil jwtUtil;
    private final com.example.voting.service.UserService userService;

    // Create User (Admin functionality)
    @PostMapping("/users")
    public User createUser(@RequestBody CreateUserReq req) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User.Role role = req.getRole() != null ? req.getRole() : User.Role.VOTER;
        User u = User.builder()
                .email(req.getEmail())
                .passwordHash(encoder.encode(req.getPassword()))
                .nid(req.getNid())
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .birthdate(req.getBirthdate())
                .motherName(req.getMotherName())
                .fatherName(req.getFatherName())
                .role(role)
                .isCandidate(req.isCandidate())
                .build();
        return userRepository.save(u);
    }

    // Signup (Public user registration)
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody CreateUserReq req) {
        try {
            System.out.println("[SIGNUP] Incoming request: " + req);
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            User.Role role = req.getRole() != null ? req.getRole() : User.Role.VOTER;
            User u = User.builder()
                    .email(req.getEmail())
                    .passwordHash(encoder.encode(req.getPassword()))
                    .nid(req.getNid())
                    .firstName(req.getFirstName())
                    .lastName(req.getLastName())
                    .birthdate(req.getBirthdate())
                    .motherName(req.getMotherName())
                    .fatherName(req.getFatherName())
                    .role(role)
                    .isCandidate(req.isCandidate())
                    .build();
            User savedUser = userRepository.save(u);
            String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole().name());
            Map<String, Object> userInfo = Map.of(
                    "id", savedUser.getId(),
                    "email", savedUser.getEmail(),
                    "nid", savedUser.getNid(),
                    "firstName", savedUser.getFirstName(),
                    "lastName", savedUser.getLastName(),
                    "birthdate", savedUser.getBirthdate(),
                    "motherName", savedUser.getMotherName(),
                    "fatherName", savedUser.getFatherName(),
                    "role", savedUser.getRole(),
                    "isCandidate", savedUser.isCandidate());
            System.out.println("[SIGNUP] Success for: " + savedUser.getEmail());
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "user", userInfo));
        } catch (Exception e) {
            System.out.println("[SIGNUP] Exception: " + e);
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Signup failed: " + e.getMessage());
        }
    }

    // Sign In
    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInRequest req) {
        try {
            System.out.println("[SIGNIN] Incoming request for: " + req.getEmail());
            User user = userService.signIn(req.getEmail(), req.getPassword());
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
            System.out.println("[SIGNIN] Generating token for: " + user.getEmail());
            Map<String, Object> userInfo = Map.of(
                    "id", user.getId(),
                    "email", user.getEmail(),
                    "nid", user.getNid(),
                    "firstName", user.getFirstName(),
                    "lastName", user.getLastName(),
                    "birthdate", user.getBirthdate(),
                    "motherName", user.getMotherName(),
                    "fatherName", user.getFatherName(),
                    "role", user.getRole(),
                    "isCandidate", user.isCandidate());
            System.out.println("[SIGNIN] Success for: " + user.getEmail());
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "user", userInfo));
        } catch (org.springframework.security.core.userdetails.UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    // List Users
    @GetMapping("/users")
    public List<User> listUsers() {
        return userRepository.findAll();
    }

    // Voting
    @PostMapping("/votes")
    public Vote castVote(@RequestBody CastVoteReq req) {
        return voteService.castVote(req.getUserId(), req.getElectionId(), req.getCandidateId());
    }

    // Election Results
    @GetMapping("/results/{electionId}")
    public Map<String, Integer> getResults(@PathVariable Long electionId) {
        return voteService.computeResults(electionId);
    }

    // Blockchain Validation
    @GetMapping("/blockchain/is-valid")
    public Map<String, Object> isValid() {
        return Map.of("valid", blockchainService.isValid(), "length", blockchainService.getChain().size());
    }

    // DTOs
    @Data
    public static class CreateUserReq {
        @NotBlank
        private String email;
        @NotBlank
        private String password;
        @NotBlank
        private String nid;
        @NotBlank
        private String firstName;
        @NotBlank
        private String lastName;
        @NotBlank
        private String birthdate;
        @NotBlank
        private String motherName;
        @NotBlank
        private String fatherName;
        private User.Role role;
        private boolean isCandidate;
    }

    @Data
    public static class CastVoteReq {
        private Long userId;
        private Long electionId;
        private Long candidateId;
    }

    @Data
    public static class SignInRequest {
        private String email;
        private String password;
    }
}