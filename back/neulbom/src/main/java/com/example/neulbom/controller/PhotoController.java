package com.example.neulbom.controller;

import com.example.neulbom.domain.Photo;
import com.example.neulbom.service.PhotoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("photo")
public class PhotoController {

    private final PhotoService photoService;

    @PostMapping("/upload")
    public String upload(HttpSession session, @RequestParam("title") String title,@RequestParam("text") String text,
                         @RequestParam("hairName") String hairName,@RequestPart("image") MultipartFile[] image) throws Exception{
        String name = (String) session.getAttribute("name");

        if(image.length > 3){
            return "이미지는 최대 3개까지만 업로드 가능합니다.";
        }
        photoService.upload(title, name, hairName,text,image);
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
    public List<Photo> findByHairSalon(@PathVariable("hairSalon") String hairSalon){
        return photoService.findByHairSalon(hairSalon);
    }

    @GetMapping("/find/{id}")
    public Photo search(@PathVariable("id") Long id){
        return photoService.findById(id);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(HttpSession session,@PathVariable("id") Long id){
        String name = (String) session.getAttribute("name");
        photoService.deletePhoto(id,name);
        return "삭제 완료";
    }

    @GetMapping("/findByGender/{gender}")
    public List<Photo> findByGender(@PathVariable("gender") String gender){
        return photoService.findByGender(gender);
    }

}