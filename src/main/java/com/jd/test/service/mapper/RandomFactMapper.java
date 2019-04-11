package com.jd.test.service.mapper;

import com.jd.test.domain.*;
import com.jd.test.service.dto.RandomFactDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity RandomFact and its DTO RandomFactDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface RandomFactMapper extends EntityMapper<RandomFactDTO, RandomFact> {



    default RandomFact fromId(Long id) {
        if (id == null) {
            return null;
        }
        RandomFact randomFact = new RandomFact();
        randomFact.setId(id);
        return randomFact;
    }
}
