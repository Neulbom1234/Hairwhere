package com.example.neulbom.Dto;

import com.example.neulbom.domain.User;
import lombok.Data;

@Data
public class UploadResponse {
    private User user;
    private Long id;
    private String errorMessage;

    public UploadResponse(User user, Long id){
        this.user = user;
        this.id = id;
    }

    public UploadResponse(String errorMessage)
    {
        this.errorMessage = errorMessage;

    }
}
