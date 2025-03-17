package com.example.neulbom.repository;

import com.example.neulbom.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByLoginId(String loginId);

    User findByLoginIdAndPw(String loginId, String pw);

    User findByName(String name);;

    Boolean existsByName(String name);
}
