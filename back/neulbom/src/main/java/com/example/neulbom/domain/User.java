package com.example.neulbom.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Table(name = "user")
@NoArgsConstructor
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long id;

    @Column(name = "loginId")
    private String loginId;

    @Column(name = "pw")
    private String pw;

    @Column(name = "name")
    private String name;

    @Column(name = "profilePath")
    private String profilePath;

    @OneToMany(mappedBy = "id")
    @JsonIgnore
    public List<Photo> photo;

    public User(String loginId, String pw, String name, String profilePath) {
        this.loginId = loginId;
        this.pw = pw;
        this.name = name;
        this.profilePath = profilePath;
    }
}

