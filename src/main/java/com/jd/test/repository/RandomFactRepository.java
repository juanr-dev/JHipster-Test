package com.jd.test.repository;

import com.jd.test.domain.RandomFact;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RandomFact entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RandomFactRepository extends JpaRepository<RandomFact, Long> {

}
