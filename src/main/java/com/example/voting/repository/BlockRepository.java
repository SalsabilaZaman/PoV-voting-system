package com.example.voting.repository;

import com.example.voting.model.BlockEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BlockRepository extends JpaRepository<BlockEntity, Long> {
    @Query("select b from BlockEntity b order by b.id asc")
    List<BlockEntity> findAllOrdered();
}
