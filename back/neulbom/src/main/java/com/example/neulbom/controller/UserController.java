package com.example.neulbom.controller;

import com.example.neulbom.domain.User;
import com.example.neulbom.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String loginId, @RequestParam String pw, HttpSession session) {
        // 인증 로직
        if (isValidUser(loginId, pw)) {
            User user = userService.findByLoginId(loginId);
            String name = user.getName();
            session.setAttribute("name", name);
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
    , @RequestParam String name) {
        if (isValidUser(loginId, pw)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        else{
            userService.addUser(loginId,pw,name);

            session.setAttribute("name", name);

            return ResponseEntity.ok("User registered successfully");
        }
    }

    private boolean isValidUser(String loginId, String pw) {
        // 간단한 사용자 검증 로직
        return userService.findByLoginIdAndPw(loginId,pw);
    }


}
