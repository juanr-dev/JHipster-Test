package com.jd.test.service.mapper;

import com.jd.test.domain.*;
import com.jd.test.service.dto.FavouriteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Favourite and its DTO FavouriteDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface FavouriteMapper extends EntityMapper<FavouriteDTO, Favourite> {

    @Mapping(source = "user.id", target = "userId")
    FavouriteDTO toDto(Favourite favourite);

    @Mapping(source = "userId", target = "user")
    Favourite toEntity(FavouriteDTO favouriteDTO);

    default Favourite fromId(Long id) {
        if (id == null) {
            return null;
        }
        Favourite favourite = new Favourite();
        favourite.setId(id);
        return favourite;
    }
}
