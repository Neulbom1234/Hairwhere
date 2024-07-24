package com.example.neulbom.repository;

import com.example.neulbom.domain.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    Optional<Photo> findById(long id);

    List<Photo> findByGender(String gender);

    List<Photo> findByHairSalon(String hairSalon);
}
