package com.example.neulbom.Dto;

import lombok.Data;

@Data
public class RegisterDto {

    private String loginId;
    private String pw;
    private String name;
    private String email;
}
