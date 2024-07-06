package com.example.neulbom.repository;

import com.example.neulbom.domain.Like;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends CrudRepository<Like, Long> {

    int countLikesByPhotoId(Long photoId);

}
