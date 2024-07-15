package com.example.neulbom.service;

import com.example.neulbom.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final PhotoService photoService;

    @Transactional
    public int addLike(Long photoId) {
        photoService.addLikeCount(photoId);
        return likeRepository.countLikesByPhotoId(photoId);
    }

    @Transactional
    public int deleteLike(Long photoId) {
        photoService.deleteLikeCount(photoId);
        return likeRepository.countLikesByPhotoId(photoId);
    }

}
