package com.example.voting.service;

import com.example.voting.blockchain.BlockchainService;
import com.example.voting.model.Candidate;
import com.example.voting.model.Election;
import com.example.voting.model.User;
import com.example.voting.model.Vote;
import com.example.voting.repository.CandidateRepository;
import com.example.voting.repository.ElectionRepository;
import com.example.voting.repository.UserRepository;
import com.example.voting.repository.VoteRepository;
import com.example.voting.util.HashUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class VoteService {
    private final VoteRepository voteRepository;
    private final UserRepository userRepository;
    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;
    private final BlockchainService blockchainService;


    @Transactional
    public Vote castVote(Long userId, Long electionId, Long candidateId) {
        if (voteRepository.existsByVoterIdAndElectionId(userId, electionId)) {
            throw new IllegalStateException("User has already voted in this election");
        }
        User voter = userRepository.findById(userId).orElseThrow();
        Election election = electionRepository.findById(electionId).orElseThrow();
        Candidate candidate = candidateRepository.findById(candidateId).orElseThrow();


        Vote vote = Vote.builder()
                .voter(voter)
                .election(election)
                .candidate(candidate)
                .castAt(LocalDateTime.now())
                .build();
        vote = voteRepository.save(vote);


// Build a minimal, privacy-preserving data payload (no PII)
        String payload = String.format("{\"voteId\":%d,\"electionId\":%d,\"candidateId\":%d,\"timestamp\":\"%s\"}",
                vote.getId(), electionId, candidateId, vote.getCastAt());
        var block = blockchainService.addBlock(payload);


// Create a user-facing receipt hash (hash of block hash + voteId)
        String receipt = HashUtil.sha256(block.getHash() + ":" + vote.getId());
        vote.setReceiptHash(receipt);
        return voteRepository.save(vote);
    }


    public Map<String, Integer> computeResults(Long electionId) {
        List<Vote> votes = voteRepository.findByElectionId(electionId);
        Map<String, Integer> tally = new HashMap<>();
        for (Vote v : votes) {
            String name = v.getCandidate().getName();
            tally.put(name, tally.getOrDefault(name, 0) + 1);
        }
        return tally;
    }
}