package gymmers.com.example.server.service;

import gymmers.com.example.server.config.JwtUtil;
import gymmers.com.example.server.dto.LoginRequest;
import gymmers.com.example.server.dto.LoginResponse;
import gymmers.com.example.server.dto.SignupRequest;
import gymmers.com.example.server.dto.SignupResponse;
import gymmers.com.example.server.model.User;
import gymmers.com.example.server.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public SignupResponse signup(SignupRequest signupRequest) {
        if (userRepo.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setRole("USER");
        user.setPremium(false);
        userRepo.save(user);
        return new SignupResponse("Signup successful", user.getEmail());
    }

    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepo.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return new LoginResponse(token, user.getRole(), user.getName(), user.getEmail(), user.isPremium());
    }

}
