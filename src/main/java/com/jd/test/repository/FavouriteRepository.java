package com.jd.test.repository;

import com.jd.test.domain.Favourite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Favourite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FavouriteRepository extends JpaRepository<Favourite, Long> {

    @Query("select favourite from Favourite favourite where favourite.user.login = ?#{principal.username}")
    List<Favourite> findByUserIsCurrentUser();


    @Query("select favourite from Favourite favourite where favourite.user.login = ?#{principal.username}")
    Page<Favourite> findByUserIsCurrentUser(Pageable pageable);

}
