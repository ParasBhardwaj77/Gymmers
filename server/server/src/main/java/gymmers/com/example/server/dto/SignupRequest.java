package gymmers.com.example.server.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignupRequest {
    @NotBlank(message = "Name is required")
    @Size(min = 3, message = "Name must be at least 3 characters")
    private String name;
    @NotBlank
    @Email(message = "email is required")
    private String email;
    @NotBlank
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}
