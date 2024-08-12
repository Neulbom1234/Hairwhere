package com.example.neulbom.repository;

import com.example.neulbom.domain.Photo;
import com.example.neulbom.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    Optional<Photo> findById(long id);

    Page<Photo> findByGender(String gender, Pageable pageable);

    Page<Photo> findByHairSalon(String hairSalon, Pageable pageable);

    Page<Photo> findByUserName(String userName,Pageable pageable);
}
