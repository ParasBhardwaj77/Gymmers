package gymmers.com.example.server.controller;

import gymmers.com.example.server.dto.LoginRequest;
import gymmers.com.example.server.dto.LoginResponse;
import gymmers.com.example.server.dto.SignupRequest;
import gymmers.com.example.server.dto.SignupResponse;
import gymmers.com.example.server.service.AuthService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public SignupResponse signup(
            @Valid @RequestBody SignupRequest req) {
        return authService.signup(req);
    }

    @PostMapping("/login")
    public LoginResponse login(
            @Valid @RequestBody LoginRequest req) {
        return authService.login(req);
    }
}
