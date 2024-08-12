package com.example.neulbom.controller;

import com.amazonaws.Response;
import com.example.neulbom.domain.Like;
import com.example.neulbom.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("like")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/{id}")
    public ResponseEntity<Integer> addLike(@PathVariable("id") Long id) {
        int likes = likeService.addLike(id);

        return new ResponseEntity<>(likes, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteLike(@PathVariable("id") Long id) {
        int likes = likeService.deleteLike(id);

        return new  ResponseEntity<>(likes,HttpStatus.OK);
    }
}