package com.example.neulbom.controller;

import com.example.neulbom.LoginRequestDto.uploadDto;
import com.example.neulbom.domain.Photo;
import com.example.neulbom.domain.User;
import com.example.neulbom.repository.PhotoRepository;
import com.example.neulbom.service.LikeService;
import com.example.neulbom.service.PhotoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
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

    @PostMapping("/upload")
    public ResponseEntity<?> upload(@RequestPart String text,
                                    @RequestPart String hairName,
                                    @RequestPart String gender,
                                    @RequestPart("photoImagePath") MultipartFile[] image,
                                    @RequestPart("created") String createdStr,
                                    @RequestPart String hairSalon,
                                    @RequestPart String hairSalonAddress,
                                    @RequestPart String hairLength,
                                    @RequestPart String hairColor,
                                    HttpSession session) {
        try {
            String name = (String) session.getAttribute("name");
            if (name == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("세션에서 사용자 이름을 찾을 수 없습니다. 다시 로그인해주세요.");
            }

            if (image.length > 3) {
                return ResponseEntity.badRequest()
                        .body("이미지는 최대 3개까지만 업로드 가능합니다.");
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            LocalDateTime created = LocalDateTime.parse(createdStr, formatter);

            int likeCount = 0;

            photoService.upload(name, image, likeCount, hairName, text, gender, created,
                    hairSalon, hairSalonAddress, hairLength, hairColor);

            return ResponseEntity.ok("업로드 완료");
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("날짜 형식이 올바르지 않습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("서버 오류가 발생했습니다: " + e.getMessage());
        }
    }

    @GetMapping("/find/all")
    public Page<Photo> findAll(@RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "15") int size,
                               @RequestParam(defaultValue = "created") String sortBy,
                               @RequestParam(defaultValue = "desc") String sortOrder){

        Sort sort = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.fromString(sortOrder)));

        Pageable pageable = PageRequest.of(page, size, sort);

        return photoService.findAll(pageable);
    }

    @GetMapping("/findHair/{hairSalon}")
    public Page<Photo> findByHairSalon(@RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "15") int size,
                                       @RequestParam(defaultValue = "created") String sortBy,
                                       @RequestParam(defaultValue = "desc") String sortOrder,
                                       @PathVariable("hairSalon") String hairSalon){
        Sort sort = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.fromString(sortOrder)));

        Pageable pageable = PageRequest.of(page, size, sort);

        return photoService.findByHairSalon(hairSalon,pageable);
    }

    @GetMapping("/find/{id}")
    public Photo search(@PathVariable("id") Long id){
        return photoService.findById(id);
    }

    @GetMapping("/find/{id}/likes")
    public ResponseEntity<List<User>> getUserWhoPhotoLiked(@PathVariable("id") Long id){
        Photo photo = photoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("사진을 찾을 수 없습니다."));

        List<User> users = likeService.getUserWhoPhotoLiked(photo);

        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(HttpSession session,@PathVariable("id") Long id){
        String name = (String) session.getAttribute("name");
        photoService.deletePhoto(id,name);
        return "삭제 완료";
    }

    @GetMapping("/findByGender/{gender}")
    public Page<Photo> findByGender(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "15") int size,
                                    @RequestParam(defaultValue = "created") String sortBy,
                                    @RequestParam(defaultValue = "desc") String sortOrder,
                                    @PathVariable("gender") String gender){

        Sort sort = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.fromString(sortOrder)));

        Pageable pageable = PageRequest.of(page, size, sort);

        return photoService.findByGender(gender,pageable);
    }

    @GetMapping("/find/address/{hairSalonAddress}")
    public Page<Photo> findByAddress(@RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "15") int size,
                                     @RequestParam(defaultValue = "created") String sortBy,
                                     @RequestParam(defaultValue = "desc") String sortOrder,
                                     @PathVariable("hairSalonAddress") String hairSalonAddress){

        Sort sort = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.fromString(sortOrder)));

        Pageable pageable = PageRequest.of(page, size, sort);

        return photoService.findByHairSalonAddress(hairSalonAddress,pageable);
    }

    @GetMapping("/search")
    public Page<Photo> search(@RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "15") int size,
                              @RequestParam(defaultValue = "created") String sortBy,
                              @RequestParam(defaultValue = "desc") String sortOrder,
                              @RequestParam("hairName") String hairName,
                              @RequestParam(value = "hairLength", required = false) String hairLength,
                              @RequestParam(value = "hairColor", required = false) String hairColor,
                              @RequestParam(value = "gender", required = false) String gender){

        Sort sort = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.fromString(sortOrder)));

        Pageable pageable = PageRequest.of(page, size, sort);

        return photoService.search(hairName,hairLength,hairColor,gender,pageable);
    }

}