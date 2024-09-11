package com.example.neulbom.Dto;

import com.example.neulbom.domain.User;
import lombok.Data;

@Data
public class UserUploadResponseDto {
    private User user;
    private Long id;
    private String errorMessage;

    public UserUploadResponseDto(User user, Long id){
        this.user = user;
        this.id = id;
    }

    public UserUploadResponseDto(String errorMessage){
        this.errorMessage = errorMessage;
    }
}
