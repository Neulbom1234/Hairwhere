package com.example.neulbom.controller;

import com.example.neulbom.Dto.CommentRequest;
import com.example.neulbom.domain.Comment;
import com.example.neulbom.service.CommentService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("comment")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{photoId}")
    public ResponseEntity<Comment> createComment(HttpSession session,@PathVariable Long photoId, @RequestBody CommentRequest commentRequest) {
        String content = commentRequest.getContent();
        Long parentId = commentRequest.getParentId();

        Comment savedComment = commentService.createComment(session,photoId, content, parentId);

        return ResponseEntity.ok(savedComment);
    }

    @GetMapping("getComments/{photoId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long photoId, @RequestParam(required = false) Long parentId) {
        List<Comment> comments = commentService.getPhotoComments(photoId, parentId);
        return ResponseEntity.ok(comments);
    }
}
