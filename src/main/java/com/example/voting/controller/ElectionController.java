package com.example.voting.controller;

import com.example.voting.model.Candidate;
import com.example.voting.model.Election;
import com.example.voting.service.ElectionService;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/elections")
@CrossOrigin
public class ElectionController {
    private final ElectionService electionService;

    @PostMapping("")
    public Election createElection(@RequestBody CreateElectionReq req) {
        return electionService.createElection(req.getName(), req.getStartTime(), req.getEndTime());
    }

    @GetMapping("")
    public List<Election> listElections() {
        // No admin check, open to all
        return electionService.listElections();
    }

    @PostMapping("/{electionId}/candidates")
    public ResponseEntity<?> addCandidate(@PathVariable("electionId") Long electionId, @RequestBody AddCandidateReq req) {
        if (!isAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can add candidates");
        }
        Candidate candidate = electionService.addCandidate(electionId, req.getName(), req.getAffiliation());
        return ResponseEntity.ok(candidate);
    }

    @GetMapping("/{electionId}/candidates")
    public List<Candidate> listCandidates(@PathVariable("electionId") Long electionId) {
        // No admin check, open to all
        return electionService.listCandidates(electionId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateElection(@PathVariable("id") Long id, @RequestBody UpdateElectionReq req) {
        if (!isAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can update elections");
        }
        try {
            Election updated = electionService.updateElection(id, req.getName(), req.getStartTime(), req.getEndTime());
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteElection(@PathVariable("id") Long id) {
        if (!isAdmin()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can delete elections");
        }
        try {
            electionService.deleteElection(id);
            return ResponseEntity.ok(Map.of("deleted", true));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    private boolean isAdmin() {
        org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        return auth != null && auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
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
    public static class UpdateElectionReq {
        private String name;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
    }
}
