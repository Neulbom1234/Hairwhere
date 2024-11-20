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
}
