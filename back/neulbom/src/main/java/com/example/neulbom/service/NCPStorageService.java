package com.example.neulbom.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Arrays;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
@Service
public class NCPStorageService {

    private final AmazonS3 ncpClient;  // ObjectStorageService 대신 AmazonS3 사용

    @Value("neulbom-bucket")
    private String bucketName;

    public String upload(MultipartFile image) {
        if (image.isEmpty()) {
            throw new IllegalArgumentException("사진이 없습니다.");
        }
        return this.uploadImage(image);
    }

    private String uploadImage(MultipartFile image) {
        validateImageFileExtention(image.getOriginalFilename());
        try {
            return this.uploadImageToNCP(image);
        } catch (IOException e) {
            throw new IllegalArgumentException("이미지 저장 실패");
        }
    }

    private void validateImageFileExtention(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1) {
            throw new IllegalArgumentException("잘못된 형식입니다.");
        }
        String extension = filename.substring(lastDotIndex + 1).toLowerCase();
    }

    private boolean isValidImageContentType(String contentType) {
        return Arrays.asList(
            "image/jpeg", "image/jpg", "image/png",
            "image/gif", "image/bmp", "image/webp"
        ).contains(contentType.toLowerCase());
    }

    private String uploadImageToNCP(MultipartFile image) throws IOException {
        if (!isValidImageContentType(image.getContentType())) {
            throw new IllegalArgumentException("Invalid image content type: " + image.getContentType());
        }

        String originalFilename = image.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
        String ncpFileName = UUID.randomUUID().toString().substring(0, 10) + originalFilename;

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(image.getContentType());
        metadata.setContentLength(image.getSize());

        try {
            ncpClient.putObject(new PutObjectRequest(
                bucketName,
                ncpFileName,
                image.getInputStream(),
                metadata
            ).withCannedAcl(CannedAccessControlList.PublicRead));  // 이 줄만 추가

            return ncpClient.getUrl(bucketName, ncpFileName).toString();
        } catch (Exception e) {
            log.error("NCP 업로드 중 오류 발생: {}", e.getMessage());
            throw new RuntimeException("NCP 업로드 실패", e);
        }
    }

    public void deleteImageFromNCP(String imageUrl) {
        String key = extractKeyFromUrl(imageUrl);
        try {
            ncpClient.deleteObject(bucketName, key);
        } catch (Exception e) {
            throw new IllegalArgumentException("삭제 중 문제 발생");
        }
    }

    private String extractKeyFromUrl(String imageUrl) {
        return imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    }
}
