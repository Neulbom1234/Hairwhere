package com.example.neulbom.service;

import com.example.neulbom.controller.UserController;
import com.example.neulbom.domain.Like;
import com.example.neulbom.domain.Photo;
import com.example.neulbom.domain.User;
import com.example.neulbom.repository.PhotoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoRepository photorepository;
    private final s3Service s3Service;

    private final int MIN_RANDOM_NUM = 1;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Transactional
    public Long upload(String name, MultipartFile[] image,
                                 int likeCount, String hairName, String text, String gender, LocalDateTime created,
                                 String hairSalon, String hairSalonAddress, String hairLength, String hairColor, User user) {
        List<String> imagePaths = new ArrayList<>();

        for( MultipartFile file : image ) {
            try{ // image생성안함 이 부분만 차이남
                String imagePath = s3Service.upload(file);
                imagePaths.add(imagePath);
            }
            catch (Exception e) {
                logger.error("Error uploading file to S3", e);
                throw new RuntimeException("파일 업로드 중 오류가 발생했습니다.", e);
            }
        }

        Photo photo = Photo.builder()
                .userName(name)
                .photoImagePath(imagePaths)
                .likeCount(likeCount)
                .hairName(hairName)
                .text(text)
                .gender(gender)
                .created(created)
                .hairSalon(hairSalon)
                .hairSalonAddress(hairSalonAddress)
                .hairLength(hairLength)
                .hairColor(hairColor)
                .user(user)
                .build();

        photorepository.save(photo);

        Long id = photo.getId();

        return id;
    }

    @Transactional
    public Page<Photo> findByHairSalon(String hairSalon,Pageable pageable){
        return photorepository.findByHairSalon(hairSalon,pageable);
    }

    @Transactional
    public Page<Photo> findByHairSalonAddress(String hairSalonAddress,Pageable pageable){
        return photorepository.findByHairSalonAddress(hairSalonAddress,pageable);
    }

    @Transactional
    public Photo findById(Long id) {
        return findPhotoById(id);
    }

    @Transactional
    public Page<Photo> findByGender(String gender,Pageable pageable) {

        return photorepository.findByGender(gender,pageable);
    }

    @Transactional
    public Page<Photo> findAll(Pageable pageable) {
        return photorepository.findAll(pageable);
    }

    @Transactional
    public String deletePhoto(Long photoId, String name) {
        Photo photo = findPhotoById(photoId);
        validateUserName(name, photo.getUserName());

        for(String imagePath : photo.getPhotoImagePath()) {
            s3Service.deleteImageFromS3(imagePath);
        }

        photorepository.delete(photo);
        return "삭제 완료";
    }

    @Transactional
    public Page<Photo> findByUserName(String userName,Pageable pageable) {
        return photorepository.findByUserName(userName,pageable);
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

    public void save(Photo photo) {
        photorepository.save(photo);
    }

    public Page<Photo> findLikedPhotosByUser(List<Like> likes, Pageable pageable) {

        List<Photo> photos = likes.stream()
                .map(Like::getPhoto)
                .collect(Collectors.toList());

        int start = (int) pageable.getOffset();  // 페이지 시작 인덱스
        int end = Math.min((start + pageable.getPageSize()), photos.size());
        // 페이지 끝 인덱스
        return new PageImpl<>(photos.subList(start, end), pageable, photos.size());
    }

    public Page<Photo> search(String hairName, String hairLength,String hairColor,
                              String gender, Pageable pageable){

        return photorepository.search(hairName,hairLength,hairColor,gender,pageable);
    }

    private void validateUserName(String photoName, String userName) {
        if (!photoName.equals(userName)) {
            throw new IllegalArgumentException("사진을 삭제할 권한이 없습니다.");
        }
    }
}