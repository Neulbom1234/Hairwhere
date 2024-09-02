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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    public String upload(@RequestPart uploadDto uploadRequest ,@RequestPart("photoImagePath") MultipartFile[] image, HttpSession session) throws Exception{
        String name = (String) session.getAttribute("name");

        //String title = uploadRequest.getTitle();
        String text = uploadRequest.getText();
        String hairName = uploadRequest.getHairName();
        String gender = uploadRequest.getGender();
        String createdStr = uploadRequest.getCreated();
        String hairSalon = uploadRequest.getHairSalon();
        String hairSalonAddress = uploadRequest.getHairSalonAddress();
        String hairLength = uploadRequest.getHairLength();
        String hairColor = uploadRequest.getHairColor();

        //String name = "Dummy Name";
        int likeCount = 0;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime created = LocalDateTime.parse(createdStr, formatter);

        if(image.length > 3){
            return "이미지는 최대 3개까지만 업로드 가능합니다."; 
        }
        photoService.upload(name, image,likeCount,hairName,text,gender,created,hairSalon,hairSalonAddress,hairLength,hairColor);
        return "업로드 완료";
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