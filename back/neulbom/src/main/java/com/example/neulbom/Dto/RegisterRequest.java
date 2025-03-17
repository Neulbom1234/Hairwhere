package com.example.neulbom.Dto;

import jakarta.servlet.http.HttpServletRequest;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@Data
public class RegisterRequest {

    private String loginId;
    private String pw;
    private String name;
    private String email;
}
