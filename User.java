package com.example.Demo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;
        private String name;
        @Column(unique = true)
        private String email;
        private String password;

        // Constructors
        public User() {}
        public User(String name, String email, String password) {
            this.name = name;
            this.email = email;
            this.password = password;
        }

}
