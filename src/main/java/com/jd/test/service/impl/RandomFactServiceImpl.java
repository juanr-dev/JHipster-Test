package com.jd.test.service.impl;

import com.jd.test.service.RandomFactService;
import com.jd.test.domain.RandomFact;
import com.jd.test.repository.RandomFactRepository;
import com.jd.test.service.dto.RandomFactDTO;
import com.jd.test.service.mapper.RandomFactMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing RandomFact.
 */
@Service
@Transactional
public class RandomFactServiceImpl implements RandomFactService {

    private final Logger log = LoggerFactory.getLogger(RandomFactServiceImpl.class);

    private final RandomFactRepository randomFactRepository;

    private final RandomFactMapper randomFactMapper;

    public RandomFactServiceImpl(RandomFactRepository randomFactRepository, RandomFactMapper randomFactMapper) {
        this.randomFactRepository = randomFactRepository;
        this.randomFactMapper = randomFactMapper;
    }

    /**
     * Save a randomFact.
     *
     * @param randomFactDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public RandomFactDTO save(RandomFactDTO randomFactDTO) {
        log.debug("Request to save RandomFact : {}", randomFactDTO);
        RandomFact randomFact = randomFactMapper.toEntity(randomFactDTO);
        randomFact = randomFactRepository.save(randomFact);
        return randomFactMapper.toDto(randomFact);
    }

    /**
     * Get all the randomFacts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<RandomFactDTO> findAll(Pageable pageable) {
        log.debug("Request to get all RandomFacts");
        return randomFactRepository.findAll(pageable)
            .map(randomFactMapper::toDto);
    }


    /**
     * Get one randomFact by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RandomFactDTO> findOne(Long id) {
        log.debug("Request to get RandomFact : {}", id);
        return randomFactRepository.findById(id)
            .map(randomFactMapper::toDto);
    }

    /**
     * Delete the randomFact by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RandomFact : {}", id);
        randomFactRepository.deleteById(id);
    }
}
