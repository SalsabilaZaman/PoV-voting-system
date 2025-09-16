package com.example.voting.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.voting.blockchain.BlockchainService;
import com.example.voting.model.Candidate;
import com.example.voting.model.Election;
import com.example.voting.model.User;
import com.example.voting.model.Vote;
import com.example.voting.repository.UserRepository;
import com.example.voting.service.ElectionService;
import com.example.voting.service.VoteService;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin

public class ApiControllers {
    private final ElectionService electionService;
    private final VoteService voteService;
    private final UserRepository userRepository;
    private final BlockchainService blockchainService;


    // ===== Users (minimal; add auth later if needed) =====
    @PostMapping("/users")
    public User createUser(@RequestBody CreateUserReq req) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User u = User.builder()
                .email(req.getEmail())
                .passwordHash(encoder.encode(req.getPassword()))
                .nid(req.getNid())
                .role(req.getRole() == null ? User.Role.VOTER : req.getRole())
                .build();
        return userRepository.save(u);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInRequest req) {
        Optional<User> userOpt = userRepository.findByEmail(req.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
        User user = userOpt.get();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!encoder.matches(req.getPassword(), user.getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        Map<String, Object> userInfo = Map.of(
                "id", user.getId(),
                "email", user.getEmail(),
                "nid", user.getNid(),
                "role", user.getRole(),
                "isCandidate", user.isCandidate(),
                "isApproved", user.isApproved()
        );
        return ResponseEntity.ok(userInfo);
    }


    @GetMapping("/users")
    public List<User> listUsers() { return userRepository.findAll(); }


    // ===== Elections & Candidates =====
    @PostMapping("/elections")
    public Election createElection(@RequestBody CreateElectionReq req) {
        return electionService.createElection(req.getName(), req.getStartTime(), req.getEndTime());
    }


    @GetMapping("/elections")
    public List<Election> listElections() { return electionService.listElections(); }


    @PostMapping("/elections/{electionId}/candidates")
    public Candidate addCandidate(@PathVariable Long electionId, @RequestBody AddCandidateReq req) {
        return electionService.addCandidate(electionId, req.getName(), req.getAffiliation());
    }


    @GetMapping("/elections/{electionId}/candidates")
    public List<Candidate> listCandidates(@PathVariable Long electionId) {
        return electionService.listCandidates(electionId);
    }


    // ===== Voting =====
    @PostMapping("/votes")
    public Vote castVote(@RequestBody CastVoteReq req) {
        return voteService.castVote(req.getUserId(), req.getElectionId(), req.getCandidateId());
    }


    @GetMapping("/results/{electionId}")
    public Map<String, Integer> getResults(@PathVariable Long electionId) {
        return voteService.computeResults(electionId);
    }


    // ===== Blockchain =====
    @GetMapping("/blockchain/is-valid")
    public Map<String, Object> isValid() {
        return Map.of("valid", blockchainService.isValid(), "length", blockchainService.getChain().size());
    }


    // ===== DTOs =====
    @Data
    public static class CreateUserReq {
        @NotBlank private String email;
        @NotBlank private String password;
        @NotBlank private String nid;
        private User.Role role;
    }


    @Data
    public static class CreateElectionReq {
        private String name;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
    }


    @Data
    public static class AddCandidateReq {
        private String name;
        private String affiliation;
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