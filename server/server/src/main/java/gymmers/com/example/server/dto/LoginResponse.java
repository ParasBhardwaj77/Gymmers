package gymmers.com.example.server.dto;

public class LoginResponse {
    private String token;
    private String role;
    private String name;
    private String email;
    private boolean premium;

    public LoginResponse() {
    }

    public LoginResponse(String token, String role, String name, String email, boolean premium) {
        this.token = token;
        this.role = role;
        this.name = name;
        this.email = email;
        this.premium = premium;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isPremium() {
        return premium;
    }

    public void setPremium(boolean premium) {
        this.premium = premium;
    }
}
