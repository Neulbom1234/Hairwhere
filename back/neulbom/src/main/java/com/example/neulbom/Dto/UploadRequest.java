package com.example.neulbom.Dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UploadRequest {

    private String text;
    private String hairName;
    private String gender;
    private String createdStr;
    private String hairSalon;
    private String hairSalonAddress;
    private String hairLength;
    private String hairColor;
    private MultipartFile[] image;
}
