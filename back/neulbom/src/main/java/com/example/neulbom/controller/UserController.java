package com.example.neulbom.controller;

import com.amazonaws.Response;
import com.example.neulbom.domain.Photo;
import com.example.neulbom.domain.User;
import com.example.neulbom.service.PhotoService;
import com.example.neulbom.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PhotoService photoService;

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
    public ResponseEntity<?> register(HttpSession session, @RequestParam String loginId, @RequestParam String pw
    , @RequestParam String name,@RequestPart MultipartFile profile) {
        if (isValidUser(loginId, pw)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        else{
            userService.addUser(loginId,pw,name,profile);

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
    public List<Photo> findUserPhotos(@PathVariable String name) {
        User user = userService.findByName(name);

        return photoService.findByUser(user);
    }

    private boolean isValidUser(String loginId, String pw) {
        // 간단한 사용자 검증 로직
        return userService.findByLoginIdAndPw(loginId,pw);
    }


}
