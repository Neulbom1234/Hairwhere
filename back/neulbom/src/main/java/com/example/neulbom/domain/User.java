package com.example.neulbom.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "user")
@NoArgsConstructor
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

    @Column(name = "profile")
    private String profile;

    @ManyToOne(fetch = jakarta.persistence.FetchType.LAZY)
    public Photo photo;

    public User(String loginId, String pw, String name) {
        this.loginId = loginId;
        this.pw = pw;
        this.name = name;
    }
}

