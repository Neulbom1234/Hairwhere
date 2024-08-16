package com.example.neulbom.repository;

import com.example.neulbom.domain.Photo;
import com.example.neulbom.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    Optional<Photo> findById(long id);

    Page<Photo> findByGender(String gender, Pageable pageable);

    Page<Photo> findByHairSalon(String hairSalon, Pageable pageable);

    Page<Photo> findByUserName(String userName,Pageable pageable);

    @Query("SELECT p FROM Photo p WHERE " +
            "(:hairName IS NULL OR :hairName = '' OR p.hairName = :hairName) AND " +
            "(:hairLength IS NULL OR :hairLength = '' OR p.hairLength = :hairLength) AND " +
            "(:hairColor IS NULL OR :hairColor = '' OR p.hairColor = :hairColor) AND " +
            "(:gender IS NULL OR :gender = '' OR p.gender = :gender)")
    Page<Photo> search(
            @Param("hairName") String hairName,
            @Param("hairLength") String hairLength,
            @Param("hairColor") String hairColor,
            @Param("gender") String gender,
            Pageable pageable);

}
