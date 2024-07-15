package com.example.neulbom.repository;

import com.example.neulbom.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByLoginIdAndPw(String loginId, String pw);

    User findByLoginId(String loginId);
}
