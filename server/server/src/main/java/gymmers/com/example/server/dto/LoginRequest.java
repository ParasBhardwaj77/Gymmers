package gymmers.com.example.server.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.ToString;

@Data
@ToString(exclude = "password")
public class LoginRequest {
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid Email")
    private String email;
    @NotBlank(message = "Password is required")
    private String password;
}
