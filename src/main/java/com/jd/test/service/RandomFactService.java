package com.jd.test.service;

import com.jd.test.service.dto.RandomFactDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing RandomFact.
 */
public interface RandomFactService {

    /**
     * Save a randomFact.
     *
     * @param randomFactDTO the entity to save
     * @return the persisted entity
     */
    RandomFactDTO save(RandomFactDTO randomFactDTO);

    /**
     * Get all the randomFacts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<RandomFactDTO> findAll(Pageable pageable);


    /**
     * Get the "id" randomFact.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<RandomFactDTO> findOne(Long id);

    /**
     * Delete the "id" randomFact.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
