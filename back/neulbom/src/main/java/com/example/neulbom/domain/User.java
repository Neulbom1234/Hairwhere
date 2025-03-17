package com.example.neulbom.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "user")
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "loginId")
    private String loginId;

    @Column(name = "pw")
    private String pw;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "profilePath")
    private String profilePath;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Photo> photos = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Like> likes = new ArrayList<>();

    public User(Long id, String loginId, String pw, String name, String email, String profilePath) {
        this.id = id;
        this.loginId = loginId;
        this.pw = pw;
        this.name = name;
        this.email = email;
        this.profilePath = profilePath;
    }

    public User(String loginId, String pw, String name, String email, String profilePath) {
        this.loginId = loginId;
        this.pw = pw;
        this.name = name;
        this.email = email;
        this.profilePath = profilePath;
    }
}
