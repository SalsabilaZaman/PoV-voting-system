package com.example.voting.controller;


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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


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
        User u = User.builder()
                .email(req.getUsername())
                .passwordHash(req.getPassword()) // TODO: hash for real security
                .role(req.getRole() == null ? User.Role.VOTER : req.getRole())
                .build();
        return userRepository.save(u);
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
        @NotBlank private String username;
        @NotBlank private String password;
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
}