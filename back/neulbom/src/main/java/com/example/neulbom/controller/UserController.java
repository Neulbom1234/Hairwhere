package com.example.neulbom.controller;

import com.amazonaws.Response;
import com.example.neulbom.domain.Like;
import com.example.neulbom.domain.Photo;
import com.example.neulbom.domain.User;
import com.example.neulbom.service.LikeService;
import com.example.neulbom.service.PhotoService;
import com.example.neulbom.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PhotoService photoService;
    private final LikeService likeService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String loginId, @RequestParam String pw, HttpSession session) {
        // 인증 로직
        if (isValidUser(loginId, pw)) {
            User user = userService.findByLoginId(loginId);
            String name = user.getName();
            session.setAttribute("name", name);
            session.setAttribute("loginId", loginId);
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate(); // 세션 무효화
        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(HttpSession session, @RequestParam String loginId, @RequestParam String pw
    , @RequestParam String name,@RequestParam String email,@RequestPart MultipartFile profile) {
        if (isValidUser(loginId, pw)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        else if(profile == null || profile.isEmpty()){
            String dummyContent = "This is dummy profile data";

            profile = new MockMultipartFile("dummy-profile.txt", "dummy-profile.txt", "text/plain", dummyContent.getBytes());

            userService.addUser(loginId, pw, name, email,profile);

            session.setAttribute("name",name);

            return ResponseEntity.ok("User registered successfully with MockMultipartFile");
        }

        else{
            userService.addUser(loginId,pw,name,email,profile);

            session.setAttribute("name", name);

            return ResponseEntity.ok("User registered successfully");
        }
    }

    @GetMapping("/mypage")
    public ResponseEntity<User> getMyPage(HttpSession session) {
        String name = (String)session.getAttribute("name");
        String loginId = (String)session.getAttribute("loginId");

        User user = userService.findByLoginId(loginId);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/mypage/update")
    public String updateMyPage(HttpSession session,@RequestParam("name") String name,@RequestPart("profile") MultipartFile profile) {
        userService.update(session,name,profile);

        return "수정 완료";
    }

    @GetMapping("/mypage/like")
    public Page<Photo> getMyLikePage(@RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "15") int size,
                                     @RequestParam(defaultValue = "created") String sortBy,
                                     @RequestParam(defaultValue = "desc") String sortOrder
                                     /*HttpSession session*/) {

        Sort sort = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.fromString(sortOrder)));

        Pageable pageable = PageRequest.of(page, size, sort);

        //Long id = (Long)session.getAttribute("id");
        Long id = 1L;

        User user = userService.findById(id);

        List<Like> likes = likeService.findByUser(user);//user를 기준으로 좋아요한 게시글들 찾기

        return photoService.findLikedPhotosByUser(likes, pageable);
    }

    @GetMapping("find/{name}")
    public ResponseEntity<User> findByName(@PathVariable String name) {
        User user = userService.findByName(name);

        if(user != null){
            return new ResponseEntity<User>(user,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("find/{name}/photos")
    public Page<Photo> findUserPhotos(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "15") int size,
                                      @RequestParam(defaultValue = "created") String sortBy,
                                      @RequestParam(defaultValue = "desc") String sortOrder,
                                      @PathVariable String name) {

        Sort sort = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.fromString(sortOrder)));

        Pageable pageable = PageRequest.of(page, size, sort);

        return photoService.findByUserName(name,pageable);
    }

    private boolean isValidUser(String loginId, String pw) {
        // 간단한 사용자 검증 로직
        return userService.findByLoginIdAndPw(loginId,pw);
    }


}
