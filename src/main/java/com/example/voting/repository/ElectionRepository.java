package com.example.voting.repository;


import com.example.voting.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;
import java.util.Optional;



public interface ElectionRepository extends JpaRepository<Election, Long> {}