package com.example.neulbom.Dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class RegisterDto {

    private String loginId;
    private String pw;
    private String name;
    private String email;
}
