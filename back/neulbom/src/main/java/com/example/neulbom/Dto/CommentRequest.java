package com.example.neulbom.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequest {

    private String content;
    private Long parentId;

}
