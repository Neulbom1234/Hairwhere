package com.example.neulbom.repository;

import com.example.neulbom.domain.Like;
import com.example.neulbom.domain.Photo;
import com.example.neulbom.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends CrudRepository<Like, Long> {

    int countLikesByPhotoId(Long photoId);

    Optional<Like> findByUserAndPhoto(User user, Photo photo);

    List<Like> findByUser(User user);

    List<Like> findByPhoto(Photo photo);

    void deleteByUserAndPhoto(User user, Photo photo);
}
