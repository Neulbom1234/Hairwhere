package com.example.neulbom.service;

import com.example.neulbom.domain.Photo;
import com.example.neulbom.repository.PhotoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoRepository photorepository;
    private final s3Service s3Service;

    private final int MIN_RANDOM_NUM = 1;

    @Transactional
    public String upload(String title, String name, String hairName, String text, MultipartFile image) {
        String imagePath = s3Service.upload(image);
        Photo photo = Photo.builder()
                .photoTitle(title)
                .photoImagePath(imagePath)
                .userName(name)
                .hairName(hairName)
                .text(text)
                //.contentType(image.getContentType())
                .build();
        photorepository.save(photo);
        return "저장완료";
    }

    @Transactional
    public Photo findById(Long id) {
        return findPhotoById(id);
    }


    @Transactional
    public List<Photo> findAll() {
        return photorepository.findAll();
    }

    @Transactional
    public String deletePhoto(Long photoId, String name) {
        Photo photo = findPhotoById(photoId);
        validateUserName(name, photo.getUserName());

        s3Service.deleteImageFromS3(photo.getPhotoImagePath());
        photorepository.delete(photo);
        return "삭제 완료";
    }

    @Transactional
    public void addLikeCount(Long photoId) {
        Photo photo = findById(photoId);
        photo.increaseLikeCount();
    }

    @Transactional
    public void deleteLikeCount(Long photoId) {
        Photo photo = photorepository.findById(photoId).orElseThrow(() -> new IllegalArgumentException("해당 사진이 없습니다."));
        photo.decreaseLikeCount();
    }

    private Photo findPhotoById(Long photoId) {
        return photorepository.findById(photoId).orElseThrow(() -> new IllegalArgumentException("해당 사진이 없습니다."));
    }

    private void validateUserName(String photoName, String userName) {
        if (!photoName.equals(userName)) {
            throw new IllegalArgumentException("사진을 삭제할 권한이 없습니다.");
        }
    }
}