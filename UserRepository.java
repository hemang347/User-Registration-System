package com.example.Demo.repository;

import com.example.Demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    // remove findByEmailAndPassword - we will use BCrypt to verify password
}
