package com.example.neulbom.LoginRequestDto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class uploadDto
{
    //private String title;
    private String text;
    private String hairName;
    private MultipartFile[] photoImagePath;
    private String gender;
    private String created;
    private String hairSalon;
    private String hairSalonAddress;
    private String hairLength;
    private String hairColor;
}
