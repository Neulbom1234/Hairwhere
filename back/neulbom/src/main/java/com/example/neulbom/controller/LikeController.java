package com.example.neulbom.controller;

import com.amazonaws.Response;
import com.example.neulbom.domain.Like;
import com.example.neulbom.domain.User;
import com.example.neulbom.service.LikeService;
import com.example.neulbom.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("like")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;
    private final UserService userService;

    /*
    @PostMapping("/{id}")
    public ResponseEntity<Integer> addLike(@PathVariable("id") Long id, HttpSession session) {
        int likes = likeService.addLike(id);
        String name = session.getAttribute("username").toString();

        User user = userService.findByName(name); // User id 얻으려고 작성함

        return new ResponseEntity<>(likes, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteLike(@PathVariable("id") Long id) {
        int likes = likeService.deleteLike(id);

        return new  ResponseEntity<>(likes,HttpStatus.OK);
    }
    */

    @PostMapping("{id}")
    public ResponseEntity<String> isLiked(@PathVariable Long id ,HttpSession session) {

        Long userId = (Long) session.getAttribute("userId");
        //Long userId = 1L;
        boolean isLiked = likeService.isLiked(id,userId);

        if(isLiked){
            return new ResponseEntity<>("like added",HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("like removed",HttpStatus.OK);
        }

    }

}