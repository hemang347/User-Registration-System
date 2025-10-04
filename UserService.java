package com.example.Demo.service;

import com.example.Demo.dto.LoginRequest;
import com.example.Demo.dto.RegisterRequest;
import com.example.Demo.dto.UserResponse;
import java.util.List;

public interface UserService {
    UserResponse register(RegisterRequest request);
    UserResponse login(LoginRequest request);
    List<UserResponse> getAllUsers();
}
