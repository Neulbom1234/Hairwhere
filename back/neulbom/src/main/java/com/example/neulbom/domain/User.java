package com.example.neulbom.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Table(name = "user")
@NoArgsConstructor
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public int id;

    @Column(name = "loginId")
    private String loginId;

    @Column(name = "pw")
    private String pw;

    @Column(name = "name")
    private String name;

    @Column(name = "profilePath")
    private String profilePath;

    @ManyToOne(fetch = jakarta.persistence.FetchType.LAZY)
    public Photo photo;

    public User(String loginId, String pw, String name, String profilePath) {
        this.loginId = loginId;
        this.pw = pw;
        this.name = name;
        this.profilePath = profilePath;
    }
}

