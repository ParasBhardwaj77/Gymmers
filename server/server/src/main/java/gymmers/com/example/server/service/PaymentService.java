package gymmers.com.example.server.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import gymmers.com.example.server.model.User;
import gymmers.com.example.server.repo.UserRepo;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Value("${frontend.url}")
    private String frontendUrl;

    private final UserRepo userRepo;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    public String createCheckoutSession(String userEmail) throws StripeException {
        userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(frontendUrl + "/payment/success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(frontendUrl + "/payment/cancel")
                .setCustomerEmail(userEmail)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("usd")
                                                .setUnitAmount(1500L) // $15.00
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("Gymmers Premium Membership")
                                                                .setDescription(
                                                                        "Unlock exclusive access to all premium features.")
                                                                .build())
                                                .build())
                                .build())
                .build();

        Session session = Session.create(params);
        return session.getUrl();
    }

    public boolean verifyPayment(String sessionId) {
        try {
            Session session = Session.retrieve(sessionId);
            if ("paid".equals(session.getPaymentStatus())) {
                String email = session.getCustomerEmail();
                if (email != null) {
                    User user = userRepo.findByEmail(email).orElse(null);
                    if (user != null) {
                        user.setPremium(true);
                        userRepo.save(user);
                        return true;
                    }
                }
            }
            return false;
        } catch (StripeException e) {
            e.printStackTrace();
            return false;
        }
    }
}
