package com.example.neulbom.service;

import com.example.neulbom.domain.User;
import com.example.neulbom.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final NCPStorageService ncpStorageService;  // s3Service를 NCPStorageService로 변경

    public boolean isValidRegister(String loginId){
        return userRepository.findByLoginId(loginId).isPresent();
    }

    public User findByName(String name) {
        return userRepository.findByName(name);
    }

    public boolean findByLoginIdAndPw(String loginId, String pw) {
        User user = userRepository.findByLoginIdAndPw(loginId,pw);

        if(user!=null){// user가 존재한 경우
            return user.getLoginId().equals(loginId);
        }
        else{
            return false;
        }
    }

    public ResponseEntity<Object> addUser(String loginId, String pw, String name, String email, MultipartFile profile) {
        String profilePath = ncpStorageService.upload(profile);  // s3Service를 ncpStorageService로 변경

        User user = new User(loginId,pw,name,email,profilePath);
        userRepository.save(user);

        return ResponseEntity.ok("register success");
    }

    public String update(HttpSession session, String name, MultipartFile profile){
        String profilePath = ncpStorageService.upload(profile);  // s3Service를 ncpStorageService로 변경

        String loginId = (String)session.getAttribute("loginId");

        User user = userRepository.findByLoginId(loginId)
            .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        user.setName(name);
        user.setProfilePath(profilePath);

        userRepository.save(user);

        return "수정 완료";
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    public User findByLoginId(String loginId) {
        return userRepository.findByLoginId(loginId)
            .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
    }

    public User updateName(String loginId, String newName) {
        User user = findByLoginId(loginId);
        user.setName(newName);
        userRepository.save(user);

        return user;
    }

    public User updateProfile(String loginId, MultipartFile profile) {
        String profilePath = ncpStorageService.upload(profile);  // s3Service를 ncpStorageService로 변경

        User user = userRepository.findByLoginId(loginId)
            .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

        user.setProfilePath(profilePath);

        userRepository.save(user);

        return user;
    }

    public User updateNameAndProfile(String loginId, String newName, MultipartFile profile) {
        if(userRepository.existsByName(newName)){
            throw new IllegalArgumentException("이미 존재하는 이름입니다.");
        }

        String profilePath = ncpStorageService.upload(profile);  // s3Service를 ncpStorageService로 변경

        User user = userRepository.findByLoginId(loginId)
            .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));


        user.setProfilePath(profilePath);
        user.setName(newName);

        userRepository.save(user);

        return user;
    }

}
