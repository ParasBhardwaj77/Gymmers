package gymmers.com.example.server.controller;

import gymmers.com.example.server.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@AuthenticationPrincipal String email) {
        try {
            String paymentUrl = paymentService.createCheckoutSession(email); // Principal is email string
            return ResponseEntity.ok(Map.of("url", paymentUrl));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/verify-payment")
    public ResponseEntity<Map<String, Boolean>> verifyPayment(@RequestBody Map<String, String> body) {
        String sessionId = body.get("session_id");
        boolean success = paymentService.verifyPayment(sessionId);
        return ResponseEntity.ok(Map.of("success", success));
    }
}
