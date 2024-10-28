package com.example.neulbom.controller;

import com.example.neulbom.Dto.PhotoResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.neulbom.Dto.LoginRequestDto;
import com.example.neulbom.Dto.RegisterDto;
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
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PhotoService photoService;
    private final LikeService likeService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequest, HttpServletRequest request) {

        String loginId = loginRequest.getLoginId();
        String pw = loginRequest.getPw();

        HttpSession session =  request.getSession();

        // 인증 로직
        if (isValidUser(loginId, pw)) {
            User user = userService.findByLoginId(loginId);
            String name = user.getName();

            if(name == null){
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("name값이 null입니다.");
            }

            session.setAttribute("name", name);
            session.setAttribute("loginId", loginId);
            session.setAttribute("userId", user.getId());

            logger.info("Session ID: {}", session.getId());
            logger.info("User '{}' stored in session", session.getAttribute("name"));

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, session.toString())
                    .body(user);
        }
        else {
            User user = userService.findByLoginId(loginId);

            if(user == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID NOT FOUND");
            }
            else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("PASSWORD INCORRECT");
            }
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate(); // 세션 무효화
        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping(value="/register",consumes = MediaType.MULTIPART_FORM_DATA_VALUE )//회원가입
    public ResponseEntity<String> register(HttpSession session,@RequestPart("loginId") String loginId,
                                           @RequestPart("pw") String pw,@RequestPart("name") String name,
                                           @RequestPart("email") String email,
                                           @RequestPart("profile") MultipartFile profile) {

        if (isValidRegister(loginId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("LoginId already exists");
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
    public Page<PhotoResponse> getMyLikePage(@RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "15") int size,
                                             @RequestParam(defaultValue = "created") String sortBy,
                                             @RequestParam(defaultValue = "desc") String sortOrder,
                                             HttpSession session) {

        Sort sort = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.fromString(sortOrder)));

        Pageable pageable = PageRequest.of(page, size, sort);

        String loginId = (String) session.getAttribute("loginId");
        //Long id = 1L;

        logger.info(loginId + " loginId 정보");
        User user = userService.findByLoginId(loginId);

        logger.info(user + " user 정보");

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
    public Page<PhotoResponse> findUserPhotos(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "15") int size,
                                      @RequestParam(defaultValue = "created") String sortBy,
                                      @RequestParam(defaultValue = "desc") String sortOrder,
                                      @PathVariable String name) {
        try{
            String decodeName = URLDecoder.decode(name,"UTF-8");

            Sort sort = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.fromString(sortOrder)));

            Pageable pageable = PageRequest.of(page, size, sort);

            return photoService.findByUserName(decodeName,pageable);
        }
        catch (UnsupportedEncodingException e) {
            String errorMessage = "사용자 이름 디코딩 중 오류가 발생했습니다: " + e.getMessage();
            logger.error(errorMessage, e);
            return Page.empty();
        }
    }

    private boolean isValidRegister(String loginId) {//회원가입
        // 간단한 사용자 검증 로직
        return userService.isValidRegister(loginId);
    }

    private boolean isValidUser(String loginId, String pw) {//로그인
        // 간단한 사용자 검증 로직
        return userService.findByLoginIdAndPw(loginId,pw);
    }
}
