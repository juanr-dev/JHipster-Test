package com.jd.test.service.impl;

import com.jd.test.service.FavouriteService;
import com.jd.test.domain.Favourite;
import com.jd.test.repository.FavouriteRepository;
import com.jd.test.service.dto.FavouriteDTO;
import com.jd.test.service.mapper.FavouriteMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Favourite.
 */
@Service
@Transactional
public class FavouriteServiceImpl implements FavouriteService {

    private final Logger log = LoggerFactory.getLogger(FavouriteServiceImpl.class);

    private final FavouriteRepository favouriteRepository;

    private final FavouriteMapper favouriteMapper;

    public FavouriteServiceImpl(FavouriteRepository favouriteRepository, FavouriteMapper favouriteMapper) {
        this.favouriteRepository = favouriteRepository;
        this.favouriteMapper = favouriteMapper;
    }

    /**
     * Save a favourite.
     *
     * @param favouriteDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public FavouriteDTO save(FavouriteDTO favouriteDTO) {
        log.debug("Request to save Favourite : {}", favouriteDTO);
        Favourite favourite = favouriteMapper.toEntity(favouriteDTO);
        favourite = favouriteRepository.save(favourite);
        return favouriteMapper.toDto(favourite);
    }

    /**
     * Get all the favourites.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<FavouriteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Favourites");
        return favouriteRepository.findByUserIsCurrentUser(pageable)
            .map(favouriteMapper::toDto);
    }


    /**
     * Get one favourite by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FavouriteDTO> findOne(Long id) {
        log.debug("Request to get Favourite : {}", id);
        return favouriteRepository.findById(id)
            .map(favouriteMapper::toDto);
    }

    /**
     * Delete the favourite by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Favourite : {}", id);
        favouriteRepository.deleteById(id);
    }
}
