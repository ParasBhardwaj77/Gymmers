package gymmers.com.example.server.controller;

import gymmers.com.example.server.dto.ChatRequest;
import gymmers.com.example.server.dto.ChatResponse;
import gymmers.com.example.server.service.ChatService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        return ResponseEntity.ok(chatService.getChatResponse(request.getPrompt()));
    }
}
