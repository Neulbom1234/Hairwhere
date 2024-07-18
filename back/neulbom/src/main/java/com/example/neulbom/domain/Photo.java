package com.example.neulbom.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Photo {

    private static final int DEFAULT_LIKE_NUM = 0;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id")
    private Long id;

    @Column(name = "photo_title")
    private String photoTitle;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "photo_imagePath")
    private String photoImagePath;

    @Column(name = "like_count")
    private int likeCount = DEFAULT_LIKE_NUM;

    @Column(name = "hair_name")
    private String hairName;

    @Column(name = "text")
    private String text;

    @Column(name = "gender")
    private String gender; // male or female or all

    @OneToMany(mappedBy = "photo")
    @JsonIgnore
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "photo")
    @JsonIgnore
    private List<User> users = new ArrayList<>();

    public void increaseLikeCount() {
        this.likeCount++;
    }

    public void decreaseLikeCount() {
        this.likeCount--;
    }
}
