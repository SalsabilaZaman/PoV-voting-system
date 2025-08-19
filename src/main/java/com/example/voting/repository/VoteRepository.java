package com.example.voting.repository;

import com.example.voting.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByVoterIdAndElectionId(Long voterId, Long electionId);

    List<Vote> findByElectionId(Long electionId);
}
