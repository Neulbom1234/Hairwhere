package com.example.neulbom.service;

import com.example.neulbom.domain.Like;
import com.example.neulbom.domain.Photo;
import com.example.neulbom.domain.User;
import com.example.neulbom.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final PhotoService photoService;
    private final UserService userService;

    @Transactional
    public boolean isLiked(Long photoId, Long userId) {
        Photo photo = photoService.findById(photoId);
        User user = userService.findById(userId);

        Optional<Like> isLiked = likeRepository.findByUserAndPhoto(user,photo);

        if(isLiked.isPresent()){
            likeRepository.delete(isLiked.get());
            photo.decreaseLikeCount();
            photoService.save(photo);

            return false;
        }
        else{
            Like like = new Like(photo,user);
            likeRepository.save(like);
            photo.increaseLikeCount();
            photoService.save(photo);

            return true;
        }
    }

    @Transactional
    public List<Like> findByUser(User user){
        return likeRepository.findByUser(user);
    }

}
