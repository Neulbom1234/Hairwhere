package com.example.neulbom.controller;

import com.example.neulbom.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("like")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/{id}")
    public String addLike(@PathVariable("id") Long id) {
        likeService.addLike(id);
        return "좋아요 추가";
    }

    @DeleteMapping("/{id}")
    public String deleteLike(@PathVariable("id") Long id) {
        likeService.deleteLike(id);
        return "삭제 완료";
    }
}
