package com.example.neulbom.service;

import com.example.neulbom.domain.User;
import com.example.neulbom.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final s3Service s3Service;

    public User findByLoginId(String loginId) {
        return userRepository.findByLoginId(loginId);
    }

    public User findByName(String name) {
        return userRepository.findByName(name);
    }

    public boolean findByLoginIdAndPw(String loginId, String pw){

        User user=  userRepository.findByLoginIdAndPw(loginId,pw);

        return user.getLoginId().equals(loginId) && user.getPw().equals(pw);
    }

    public ResponseEntity<Object> addUser(String loginId, String pw, String name,MultipartFile profile) {
        String profilePath = s3Service.upload(profile);

        User user = new User(loginId,pw,name,profilePath);

        userRepository.save(user);

        return ResponseEntity.ok("register success");
    }

    public String update(HttpSession session, String name, MultipartFile profile){
        String profilePath = s3Service.upload(profile);

        String loginId = (String)session.getAttribute("loginId");

        User user = userRepository.findByLoginId(loginId);

        user.setName(name);
        user.setProfilePath(profilePath);

        userRepository.save(user);

        return "수정 완료";
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

}