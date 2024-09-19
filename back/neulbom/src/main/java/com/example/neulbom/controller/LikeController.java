package com.example.neulbom.controller;

import com.amazonaws.Response;
import com.example.neulbom.domain.Like;
import com.example.neulbom.domain.User;
import com.example.neulbom.service.LikeService;
import com.example.neulbom.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("like")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/{id}")
    @Transactional
    public ResponseEntity<String> addLike(@PathVariable("id") Long id, HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        Long userId = (Long) session.getAttribute("userId");

        boolean isLiked = likeService.isLiked(id,userId);

        if(isLiked){
            return ResponseEntity.status(HttpStatus.OK).body("좋아요 삭제");
        }
        else{
            //likeService.saveUser(userId,id);
            return ResponseEntity.status(HttpStatus.OK).body("좋아요 추가");
        }

    }
/*
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteLike(@PathVariable("id") Long id, HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        Long userId = (Long) session.getAttribute("userId");

        boolean isLiked = likeService.isLiked(id,userId);

        if(isLiked){ //200 이면 안내려감
            //likeService.deleteUser(userId,id);// 사용자와 게시글 사이에 좋아요 관계 삭제
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    */

    /*
    @GetMapping("{id}")
    public ResponseEntity<String> isLiked(@PathVariable Long id , HttpServletRequest request) {

        HttpSession session = request.getSession(false);

        Long userId = (Long) session.getAttribute("userId");
        //Long userId = 1L;
        boolean isLiked = likeService.isLiked(id,userId);

        if(isLiked){//
            return new ResponseEntity<>("like added",HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("like removed",HttpStatus.OK);
        }

    }
    */
}
