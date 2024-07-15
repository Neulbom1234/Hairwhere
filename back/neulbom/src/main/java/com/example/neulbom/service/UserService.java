package com.example.neulbom.service;

import com.example.neulbom.domain.User;
import com.example.neulbom.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User findByLoginId(String loginId) {
        return userRepository.findByLoginId(loginId);
    }

    public boolean findByLoginIdAndPw(String loginId, String pw){

        User user=  userRepository.findByLoginIdAndPw(loginId,pw);

        return user.getLoginId().equals(loginId) && user.getPw().equals(pw);
    }

    public ResponseEntity<Object> addUser(String loginId, String pw, String name) {
        User user = new User(loginId,pw,name);

        userRepository.save(user);

        return ResponseEntity.ok("register success");
    }


}