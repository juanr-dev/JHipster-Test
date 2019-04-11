package com.jd.test.service;

import com.jd.test.service.dto.FavouriteDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Favourite.
 */
public interface FavouriteService {

    /**
     * Save a favourite.
     *
     * @param favouriteDTO the entity to save
     * @return the persisted entity
     */
    FavouriteDTO save(FavouriteDTO favouriteDTO);

    /**
     * Get all the favourites.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FavouriteDTO> findAll(Pageable pageable);


    /**
     * Get the "id" favourite.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FavouriteDTO> findOne(Long id);

    /**
     * Delete the "id" favourite.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
