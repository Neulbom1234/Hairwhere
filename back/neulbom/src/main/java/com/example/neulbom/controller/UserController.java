package com.example.neulbom.controller;

import com.example.neulbom.Dto.PhotoResponse;
import com.example.neulbom.Dto.RegisterRequest;
import com.example.neulbom.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.neulbom.Dto.LoginRequest;
import com.example.neulbom.domain.Like;
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
    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {

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

            User loginUser = userService.findByLoginId(loginId);

            session.setAttribute("name", name);
            session.setAttribute("loginId", loginId);
            session.setAttribute("userId", user.getId());
            session.setAttribute("profile", loginUser.getProfilePath());

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
    public ResponseEntity<String> register(HttpSession session,
                                           @RequestPart("loginId") String loginId,
                                           @RequestPart("pw") String pw,
                                           @RequestPart("name") String name,
                                           @RequestPart("email") String email,
                                           @RequestPart("profile") MultipartFile profile) {
//
//        String loginId = registerRequest.getLoginId();
//        String pw = registerRequest.getPw();
//        String name = registerRequest.getName();
//        String email = registerRequest.getEmail();

        if (isUserExists(loginId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("LoginId already exists");
        }
        else{
            userService.addUser(loginId,pw,name,email,profile);

            User user = userService.findByLoginId(loginId);

            session.setAttribute("name", name);
            session.setAttribute("profile",user.getProfilePath());

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

    private boolean isUserExists(String loginId) {//회원가입
        return userService.isValidRegister(loginId);
    }

    private boolean isValidUser(String loginId, String pw) {//로그인
        // 간단한 사용자 검증 로직
        return userService.findByLoginIdAndPw(loginId,pw);
    }

//    @PatchMapping("/update/name")
//    public ResponseEntity<User> updateName(HttpSession session, @RequestParam("name") String name) {
//        String loginId = (String) session.getAttribute("loginId");
//        if (loginId == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                .body(null);
//        }
//
//        try {
//            String preName = (String) session.getAttribute("name");
//            User user = userService.updateName(loginId, name);
//            //기존에 있던 게시글들의 이름도 변경해주어야 함
//            photoService.updateName(preName,name);
//
//            return ResponseEntity.ok(user);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(null);
//        }
//    }
//
//    @PatchMapping("/update/profile")
//    public ResponseEntity<User> updateImage(HttpSession session, @RequestPart("profile") MultipartFile profile) {
//        String loginId = (String) session.getAttribute("loginId");
//        if (loginId == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                .body(null);
//        }
//
//        try {
//            String preName = (String) session.getAttribute("name");
//            User user = userService.updateProfile(loginId, profile);
//            //기존에 있던 게시글들의 프로필도 변경해주어야 함
//            photoService.updateProfile(preName,profile);
//
//            return ResponseEntity.ok(user);
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(null);
//        }
//    }

    @PatchMapping("/update/user")
    @Transactional
    public ResponseEntity<User> updateUser(HttpSession session,
                                           @RequestPart(value = "profile", required = false) MultipartFile profile,
                                           @RequestPart(value = "name", required = false) String name) {
        String loginId = (String) session.getAttribute("loginId");

        logger.info("업데이트 전 세션 상태:");
        logger.info("loginId: {}", loginId);
        logger.info("현재 name: {}", session.getAttribute("name"));
        logger.info("현재 profile: {}", session.getAttribute("profile"));

        if (loginId == null) {
            logger.info("로그인이 되어있지 않습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(null);
        }

        try {
            String preName = (String) session.getAttribute("name");
            User updatedUser;

            // 케이스별 처리
            if (name != null && profile != null) {
                logger.info("이름과 프로필 모두 수정");
                logger.info("새로운 이름: {}", name);

                updatedUser = userService.updateNameAndProfile(loginId, name, profile);
                photoService.updateName(preName, name);

                session.setAttribute("name", updatedUser.getName());
                session.setAttribute("profile", updatedUser.getProfilePath());

                // 즉시 DB에 반영하고 최신 데이터 조회
                userRepository.flush();
                updatedUser = userService.findByLoginId(loginId);

            } else if (name != null && profile == null) {
                logger.info("이름만 수정");
                logger.info("새로운 이름: {}", name);

                updatedUser = userService.updateName(loginId, name);
                photoService.updateName(preName, name);

                session.setAttribute("name", updatedUser.getName());

                // 즉시 DB에 반영하고 최신 데이터 조회
                userRepository.flush();
                updatedUser = userService.findByLoginId(loginId);

            } else if (profile != null && name == null) {
                logger.info("프로필만 수정");

                updatedUser = userService.updateProfile(loginId, profile);
                session.setAttribute("profile", updatedUser.getProfilePath());

                // 즉시 DB에 반영하고 최신 데이터 조회
                userRepository.flush();
                updatedUser = userService.findByLoginId(loginId);

            } else {
                logger.info("이름과 프로필 모두 null");
                return ResponseEntity.badRequest().body(null);
            }

            logger.info("최종 세션 상태:");
            logger.info("name: {}", session.getAttribute("name"));
            logger.info("profile: {}", session.getAttribute("profile"));

            return ResponseEntity.ok(updatedUser);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
