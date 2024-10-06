package com.example.neulbom.Dto;

import com.example.neulbom.domain.Like;
import com.example.neulbom.domain.Photo;
import com.example.neulbom.domain.User;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class PhotoResponse {
    private Long id;
    private String userName;
    private List<String> photoImagePath;
    private int likeCount;
    private String hairName;
    private String text;
    private String gender;
    private LocalDateTime created;
    private String hairSalon;
    private String hairSalonAddress;
    private String hairLength;
    private String hairColor;
    private List<Like> likes;
    private User user;
    private List<String> likedUserNames;

    public static PhotoResponse fromEntity(Photo photo) {
        PhotoResponse response = new PhotoResponse();
        response.setId(photo.getId());
        response.setUserName(photo.getUserName());
        response.setPhotoImagePath(photo.getPhotoImagePath());
        response.setLikeCount(photo.getLikeCount());
        response.setHairName(photo.getHairName());
        response.setText(photo.getText());
        response.setGender(photo.getGender());
        response.setCreated(photo.getCreated());
        response.setHairSalon(photo.getHairSalon());
        response.setHairSalonAddress(photo.getHairSalonAddress());
        response.setHairLength(photo.getHairLength());
        response.setHairColor(photo.getHairColor());

        List<String> likedUserNames = photo.getLikes().stream()
            .map(like ->
            {
                User user = like.getUser();
                return user.getName();
            })
            .collect(Collectors.toList());
        response.setLikedUserNames(likedUserNames);

        return response;
    }
}
