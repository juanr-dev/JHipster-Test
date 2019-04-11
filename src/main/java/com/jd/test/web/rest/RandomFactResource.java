package com.jd.test.web.rest;
import com.jd.test.service.RandomFactService;
import com.jd.test.web.rest.errors.BadRequestAlertException;
import com.jd.test.web.rest.util.HeaderUtil;
import com.jd.test.web.rest.util.PaginationUtil;
import com.jd.test.service.dto.RandomFactDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing RandomFact.
 */
@RestController
@RequestMapping("/api")
public class RandomFactResource {

    private final Logger log = LoggerFactory.getLogger(RandomFactResource.class);

    private static final String ENTITY_NAME = "randomFact";

    private final RandomFactService randomFactService;

    public RandomFactResource(RandomFactService randomFactService) {
        this.randomFactService = randomFactService;
    }

    /**
     * POST  /random-facts : Create a new randomFact.
     *
     * @param randomFactDTO the randomFactDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new randomFactDTO, or with status 400 (Bad Request) if the randomFact has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/random-facts")
    public ResponseEntity<RandomFactDTO> createRandomFact(@RequestBody RandomFactDTO randomFactDTO) throws URISyntaxException {
        log.debug("REST request to save RandomFact : {}", randomFactDTO);
        if (randomFactDTO.getId() != null) {
            throw new BadRequestAlertException("A new randomFact cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RandomFactDTO result = randomFactService.save(randomFactDTO);
        return ResponseEntity.created(new URI("/api/random-facts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /random-facts : Updates an existing randomFact.
     *
     * @param randomFactDTO the randomFactDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated randomFactDTO,
     * or with status 400 (Bad Request) if the randomFactDTO is not valid,
     * or with status 500 (Internal Server Error) if the randomFactDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/random-facts")
    public ResponseEntity<RandomFactDTO> updateRandomFact(@RequestBody RandomFactDTO randomFactDTO) throws URISyntaxException {
        log.debug("REST request to update RandomFact : {}", randomFactDTO);
        if (randomFactDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RandomFactDTO result = randomFactService.save(randomFactDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, randomFactDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /random-facts : get all the randomFacts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of randomFacts in body
     */
    @GetMapping("/random-facts")
    public ResponseEntity<List<RandomFactDTO>> getAllRandomFacts(Pageable pageable) {
        log.debug("REST request to get a page of RandomFacts");
        Page<RandomFactDTO> page = randomFactService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/random-facts");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /random-facts/:id : get the "id" randomFact.
     *
     * @param id the id of the randomFactDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the randomFactDTO, or with status 404 (Not Found)
     */
    @GetMapping("/random-facts/{id}")
    public ResponseEntity<RandomFactDTO> getRandomFact(@PathVariable Long id) {
        log.debug("REST request to get RandomFact : {}", id);
        Optional<RandomFactDTO> randomFactDTO = randomFactService.findOne(id);
        return ResponseUtil.wrapOrNotFound(randomFactDTO);
    }

    /**
     * DELETE  /random-facts/:id : delete the "id" randomFact.
     *
     * @param id the id of the randomFactDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/random-facts/{id}")
    public ResponseEntity<Void> deleteRandomFact(@PathVariable Long id) {
        log.debug("REST request to delete RandomFact : {}", id);
        randomFactService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
