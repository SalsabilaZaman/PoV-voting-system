package com.example.voting.service;


import com.example.voting.model.Candidate;
import com.example.voting.model.Election;
import com.example.voting.repository.CandidateRepository;
import com.example.voting.repository.ElectionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ElectionService {
    private final ElectionRepository electionRepository;
    private final CandidateRepository candidateRepository;


    public Election createElection(String name, LocalDateTime start, LocalDateTime end) {
        Election e = Election.builder().name(name).startTime(start).endTime(end).build();
        return electionRepository.save(e);
    }


    public Candidate addCandidate(Long electionId, String name, String affiliation) {
        Election e = electionRepository.findById(electionId).orElseThrow();
        Candidate c = Candidate.builder().name(name).affiliation(affiliation).election(e).build();
        return candidateRepository.save(c);
    }


    public List<Election> listElections() { return electionRepository.findAll(); }
    public List<Candidate> listCandidates(Long electionId) { return candidateRepository.findByElectionId(electionId); }


    public Election updateElection(Long id, String name, LocalDateTime start, LocalDateTime end) {
        Election election = electionRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Election not found"));
        if (name != null) election.setName(name);
        if (start != null) election.setStartTime(start);
        if (end != null) election.setEndTime(end);
        return electionRepository.save(election);
    }

    public void deleteElection(Long id) {
        if (!electionRepository.existsById(id)) {
            throw new IllegalArgumentException("Election not found");
        }
        electionRepository.deleteById(id);
    }
}