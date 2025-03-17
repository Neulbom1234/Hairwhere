package com.example.neulbom.controller;

import com.example.neulbom.Dto.CommentRequest;
import com.example.neulbom.Dto.CommentResponse;
import com.example.neulbom.domain.Comment;
import com.example.neulbom.service.CommentService;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("comment")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{photoId}")
    @Transactional
    public ResponseEntity<CommentResponse> createComment(HttpSession session, @PathVariable Long photoId, @RequestBody CommentRequest commentRequest) {
        String content = commentRequest.getContent();
        Long parentId = commentRequest.getParentId();

        Comment savedComment = commentService.createComment(session,photoId, content, parentId);

        return ResponseEntity.ok(CommentResponse.from(savedComment));
    }

    @GetMapping("getComments/{photoId}")
    @Transactional
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable Long photoId, @RequestParam(required = false) Long parentId) {
        List<Comment> comments = commentService.getPhotoComments(photoId, parentId);

        List<CommentResponse> responses = comments.stream()
            .map(CommentResponse::from)
            .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("deleteComment/{commentId}")
    @Transactional
    public ResponseEntity<String> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok("댓글 삭제 성공");
    }
}
