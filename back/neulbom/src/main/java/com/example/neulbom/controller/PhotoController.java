package com.example.neulbom.controller;

import com.example.neulbom.Dto.PhotoResponse;
import com.example.neulbom.Dto.SearchRequest;
import com.example.neulbom.Dto.UploadRequest;
import com.example.neulbom.Dto.UploadResponse;
import com.example.neulbom.domain.Photo;
import com.example.neulbom.domain.User;
import com.example.neulbom.repository.PhotoRepository;
import com.example.neulbom.repository.UserRepository;
import com.example.neulbom.service.LikeService;
import com.example.neulbom.service.PhotoService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("photo")
public class PhotoController {

    private final PhotoService photoService;
    private final LikeService likeService;
    private final PhotoRepository photoRepository;

    private static final Logger logger = LoggerFactory.getLogger(PhotoController.class);
    private final UserRepository userRepository;

    @PostMapping("/upload")
    public ResponseEntity<UploadResponse> upload(@ModelAttribute UploadRequest uploadRequest,
                                                 HttpServletRequest request) {
        try {
            // 받은 DTO 데이터 로깅
            logger.info("Received UploadRequest: {}", uploadRequest);
            if (uploadRequest.getImage() != null) {
                logger.info("Number of files received: {}", uploadRequest.getImage().length);
                for (MultipartFile file : uploadRequest.getImage()) {
                    logger.info("File name: {}, size: {}",
                        file.getOriginalFilename(),
                        file.getSize());
                }
            } else {
                logger.info("No files received");
            }

            HttpSession session = request.getSession(false);
            if(session == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new UploadResponse("session is null"));
            }

            String name = (String) session.getAttribute("name");
            if (name == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new UploadResponse("세션에서 사용자 이름을 찾을 수 없습니다. 다시 로그인해주세요."));
            }

            User user = userRepository.findByName(name);
            logger.info("User '{}' stored in session", name);
            logger.info("User '{}' stored in session", session.getAttribute("name"));
            logger.info("User  '{}' get User value", user);

            // 이미지 null 체크
            MultipartFile[] image = uploadRequest.getImage();
            if (image == null || image.length == 0) {
                return ResponseEntity.badRequest()
                    .body(new UploadResponse("이미지 파일이 없습니다."));
            }

            if (image.length > 3) {
                return ResponseEntity.badRequest()
                    .body(new UploadResponse("이미지는 최대 3개까지만 업로드 가능합니다."));
            }

            // 이미지 타입 체크
            for (MultipartFile file : image) {
                String contentType = file.getContentType();
                logger.info("File: {}, Content-Type: {}", file.getOriginalFilename(), contentType);

                if (!contentType.startsWith("image/")) {
                    return ResponseEntity.badRequest()
                        .body(new UploadResponse("Invalid file type"));
                }
            }

            // 날짜 처리
            String createdStr = uploadRequest.getCreatedStr();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            LocalDateTime created = LocalDateTime.parse(createdStr, formatter);

            int likeCount = 0;
            Long id = photoService.upload(name, image, likeCount, created, user, uploadRequest);

            logger.info("photoService.upload() completed successfully");

            return ResponseEntity.ok(new UploadResponse(user, id));
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest()
                .body(new UploadResponse("날짜 형식이 올바르지 않습니다."));
        } catch (Exception e) {
            logger.error("Error occurred during upload", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new UploadResponse("서버 오류가 발생했습니다: " + e.getMessage()));
        }
    }

    @GetMapping("/find/all")
    public Page<PhotoResponse> findAll(@RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "15") int size,
                               @RequestParam(defaultValue = "created") String sortBy,
                               @RequestParam(defaultValue = "desc") String sortOrder){

        Sort sort = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.fromString(sortOrder)));

        Pageable pageable = PageRequest.of(page, size, sort);

        return photoService.findAll(pageable);
    }

    @GetMapping("/findHair/{hairSalon}")
    public Page<PhotoResponse> findByHairSalon(@RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "15") int size,
                                       @RequestParam(defaultValue = "created") String sortBy,
                                       @RequestParam(defaultValue = "desc") String sortOrder,
                                       @PathVariable("hairSalon") String hairSalon){
        Sort sort = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.fromString(sortOrder)));

        Pageable pageable = PageRequest.of(page, size, sort);

        return photoService.findByHairSalon(hairSalon,pageable);
    }

    @GetMapping("/find/{id}")
    public PhotoResponse search(@PathVariable("id") Long id){
        return photoService.findById(id);
    }

    @GetMapping("/find/{id}/likes")// 게시글에 좋아요를 한 사용자들의 목록
    public ResponseEntity<List<User>> getUserWhoPhotoLiked(@PathVariable("id") Long id){
        Photo photo = photoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("사진을 찾을 수 없습니다."));

        List<User> users = likeService.getUserWhoPhotoLiked(photo);

        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(HttpSession session,@PathVariable("id") Long id){
        String name = (String) session.getAttribute("name");
        photoService.deletePhoto(id,name);//게시글 id와 session에 저장된 name
        return "삭제 완료";
    }

    @GetMapping("/findByGender/{gender}")
    public Page<PhotoResponse> findByGender(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "15") int size,
                                    @RequestParam(defaultValue = "created") String sortBy,
                                    @RequestParam(defaultValue = "desc") String sortOrder,
                                    @PathVariable("gender") String gender){

        Sort sort = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.fromString(sortOrder)));

        Pageable pageable = PageRequest.of(page, size, sort);

        return photoService.findByGender(gender,pageable);
    }

    @GetMapping("/find/address/{hairSalonAddress}")
    public Page<PhotoResponse> findByAddress(@RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "15") int size,
                                     @RequestParam(defaultValue = "created") String sortBy,
                                     @RequestParam(defaultValue = "desc") String sortOrder,
                                     @PathVariable("hairSalonAddress") String hairSalonAddress){

        Sort sort = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.fromString(sortOrder)));

        Pageable pageable = PageRequest.of(page, size, sort);

        return photoService.findByHairSalonAddress(hairSalonAddress,pageable);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<PhotoResponse>> search(HttpServletRequest request, @RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "15") int size,
                                                      @RequestParam(defaultValue = "created") String sortBy,
                                                      @RequestParam(defaultValue = "desc") String sortOrder,
                                                      @ModelAttribute SearchRequest searchRequest) throws UnsupportedEncodingException {

        HttpSession session = request.getSession();

        Sort sort = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.fromString(sortOrder)));

        Pageable pageable = PageRequest.of(page, size, sort);

        return ResponseEntity.ok()
            .body(photoService.search(searchRequest,pageable));
    }

}
