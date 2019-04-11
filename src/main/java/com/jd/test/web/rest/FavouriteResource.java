package com.jd.test.web.rest;
import com.jd.test.service.FavouriteService;
import com.jd.test.web.rest.errors.BadRequestAlertException;
import com.jd.test.web.rest.util.HeaderUtil;
import com.jd.test.web.rest.util.PaginationUtil;
import com.jd.test.service.dto.FavouriteDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Favourite.
 */
@RestController
@RequestMapping("/api")
public class FavouriteResource {

    private final Logger log = LoggerFactory.getLogger(FavouriteResource.class);

    private static final String ENTITY_NAME = "favourite";

    private final FavouriteService favouriteService;

    public FavouriteResource(FavouriteService favouriteService) {
        this.favouriteService = favouriteService;
    }

    /**
     * POST  /favourites : Create a new favourite.
     *
     * @param favouriteDTO the favouriteDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new favouriteDTO, or with status 400 (Bad Request) if the favourite has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/favourites")
    public ResponseEntity<FavouriteDTO> createFavourite(@Valid @RequestBody FavouriteDTO favouriteDTO) throws URISyntaxException {
        log.debug("REST request to save Favourite : {}", favouriteDTO);
        if (favouriteDTO.getId() != null) {
            throw new BadRequestAlertException("A new favourite cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FavouriteDTO result = favouriteService.save(favouriteDTO);
        return ResponseEntity.created(new URI("/api/favourites/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /favourites : Updates an existing favourite.
     *
     * @param favouriteDTO the favouriteDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated favouriteDTO,
     * or with status 400 (Bad Request) if the favouriteDTO is not valid,
     * or with status 500 (Internal Server Error) if the favouriteDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/favourites")
    public ResponseEntity<FavouriteDTO> updateFavourite(@Valid @RequestBody FavouriteDTO favouriteDTO) throws URISyntaxException {
        log.debug("REST request to update Favourite : {}", favouriteDTO);
        if (favouriteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FavouriteDTO result = favouriteService.save(favouriteDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, favouriteDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /favourites : get all the favourites.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of favourites in body
     */
    @GetMapping("/favourites")
    public ResponseEntity<List<FavouriteDTO>> getAllFavourites(Pageable pageable) {
        log.debug("REST request to get a page of Favourites");
        Page<FavouriteDTO> page = favouriteService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/favourites");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /favourites/:id : get the "id" favourite.
     *
     * @param id the id of the favouriteDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the favouriteDTO, or with status 404 (Not Found)
     */
    @GetMapping("/favourites/{id}")
    public ResponseEntity<FavouriteDTO> getFavourite(@PathVariable Long id) {
        log.debug("REST request to get Favourite : {}", id);
        Optional<FavouriteDTO> favouriteDTO = favouriteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(favouriteDTO);
    }

    /**
     * DELETE  /favourites/:id : delete the "id" favourite.
     *
     * @param id the id of the favouriteDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/favourites/{id}")
    public ResponseEntity<Void> deleteFavourite(@PathVariable Long id) {
        log.debug("REST request to delete Favourite : {}", id);
        favouriteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
