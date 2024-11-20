package com.example.neulbom.service;

import com.example.neulbom.domain.Comment;
import com.example.neulbom.domain.Photo;
import com.example.neulbom.domain.User;
import com.example.neulbom.repository.CommentRepository;
import com.example.neulbom.repository.PhotoRepository;
import com.example.neulbom.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PhotoRepository photoRepository;
    private final UserRepository userRepository;

    public Comment createComment(HttpSession session,Long PhotoId, String content, Long parentId) {
        Photo photo = photoRepository.findById(PhotoId)
            .orElseThrow(() -> new IllegalArgumentException("Photo not found"));

        // 현재 로그인한 사용자 정보 가져오기
        Long userId = (Long)session.getAttribute("userId");

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setPhoto(photo);
        comment.setUser(user);

        if (parentId != null) {
            Comment parentComment = commentRepository.findById(parentId)
                .orElseThrow(() -> new IllegalArgumentException("Parent comment not found"));
            comment.setParent(parentComment);
        }

        return commentRepository.save(comment);
    }

    public List<Comment> getPhotoComments(Long PhotoId, Long parentId) {
        if(parentId == null){
            return commentRepository.findByPhotoIdAndParentIdIsNullOrderByCreatedAtDesc(PhotoId);
        }

        return commentRepository.findByPhotoIdAndParentIdOrderByCreatedAtDesc(PhotoId, parentId);
    }
}
