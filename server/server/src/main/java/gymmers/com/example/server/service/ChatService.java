package gymmers.com.example.server.service;

import gymmers.com.example.server.dto.ChatResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public ChatResponse getChatResponse(String prompt) {
        String fullUrl = apiUrl + apiKey;

        // Construct the prompt for Gemini with strict fitness constraints
        String systemInstruction = "You are a highly knowledgeable fitness, nutrition, and health expert for 'Gymmers'. "
                +
                "Your role is to help users with: " +
                "1. Workout plans and exercises. " +
                "2. Diet, calories, macros, and nutrition. " +
                "3. Muscle building and weight loss advice. " +
                "4. General health and recovery. " +
                "CRITICAL: If a user asks about anything NOT related to fitness, health, or diet (e.g., coding, history, politics, general knowledge), "
                +
                "you MUST strictly refuse to answer. Say something like: 'I am a fitness AI. I can only answer questions related to health and workouts.' "
                +
                "Do not answer the off-topic question. " +
                "User Question: " + prompt;

        // Request Body Structure for Gemini API
        Map<String, Object> contentPart = new HashMap<>();
        contentPart.put("text", systemInstruction);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(contentPart));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(fullUrl, entity, Map.class);

            if (response.getBody() != null) {
                // Parse the nested JSON structure of Gemini Response
                Map<String, Object> body = response.getBody();
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) body.get("candidates");

                if (candidates != null && !candidates.isEmpty()) {
                    Map<String, Object> contentResponse = (Map<String, Object>) candidates.get(0).get("content");
                    List<Map<String, Object>> parts = (List<Map<String, Object>>) contentResponse.get("parts");

                    if (parts != null && !parts.isEmpty()) {
                        String text = (String) parts.get(0).get("text");
                        return new ChatResponse(text);
                    }
                }
            }
            return new ChatResponse("Sorry, I'm having trouble analyzing your fitness request right now.");

        } catch (Exception e) {
            e.printStackTrace();
            return new ChatResponse("Error connecting to Gymmers AI. Please try again later.");
        }
    }
}
