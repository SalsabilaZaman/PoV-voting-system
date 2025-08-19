package com.example.voting.blockchain;


import com.example.voting.model.BlockEntity;
import com.example.voting.repository.BlockRepository;
import com.example.voting.util.HashUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.Instant;
import java.util.List;


@Service
@RequiredArgsConstructor
public class BlockchainService {
    private final BlockRepository blockRepository;


    public List<BlockEntity> getChain() {
        return blockRepository.findAllOrdered();
    }


    @Transactional
    public BlockEntity addBlock(String dataJson) {
        List<BlockEntity> chain = getChain();
        String prevHash = chain.isEmpty() ? "GENESIS" : chain.get(chain.size()-1).getHash();
        long ts = Instant.now().toEpochMilli();
        String hash = HashUtil.sha256(prevHash + ts + dataJson);
        BlockEntity block = BlockEntity.builder()
                .previousHash(prevHash)
                .data(dataJson)
                .hash(hash)
                .timestamp(ts)
                .build();
        return blockRepository.save(block);
    }


    public boolean isValid() {
        List<BlockEntity> chain = getChain();
        String lastHash = "GENESIS";
        for (BlockEntity b : chain) {
            String recalculated = HashUtil.sha256(b.getPreviousHash() + b.getTimestamp() + b.getData());
            if (!recalculated.equals(b.getHash())) return false;
            if (!b.getPreviousHash().equals(lastHash)) return false;
            lastHash = b.getHash();
        }
        return true;
    }
}