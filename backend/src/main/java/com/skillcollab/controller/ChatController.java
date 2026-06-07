package com.skillcollab.controller;

import com.skillcollab.dto.ChatMessageDTO;
import com.skillcollab.dto.ChatRequest;
import com.skillcollab.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/message")
    public ResponseEntity<ChatMessageDTO> sendMessage(
            @RequestBody ChatRequest request,
            @RequestParam Long senderId) {
        log.info("Message from {} to {}", senderId, request.getReceiverId());
        ChatMessageDTO message = chatService.sendMessage(senderId, request.getReceiverId(), request.getMessage());
        return ResponseEntity.ok(message);
    }

    @PostMapping("/ai")
    public ResponseEntity<ChatMessageDTO> sendAiMessage(
            @RequestBody ChatRequest request,
            @RequestParam Long userId) {
        log.info("AI message from user: {}", userId);
        ChatMessageDTO message = chatService.sendAiMessage(userId, request.getMessage());
        return ResponseEntity.ok(message);
    }

    @GetMapping("/conversation")
    public ResponseEntity<List<ChatMessageDTO>> getConversation(
            @RequestParam Long userId1,
            @RequestParam Long userId2,
            @RequestParam(defaultValue = "50") int limit) {
        log.info("Fetching conversation between {} and {}", userId1, userId2);
        return ResponseEntity.ok(chatService.getConversation(userId1, userId2, limit));
    }

    @GetMapping("/unread/{userId}")
    public ResponseEntity<List<ChatMessageDTO>> getUnreadMessages(@PathVariable Long userId) {
        log.info("Fetching unread messages for user: {}", userId);
        return ResponseEntity.ok(chatService.getUnreadMessages(userId));
    }

    @PutMapping("/message/{messageId}/read")
    public ResponseEntity<String> markMessageAsRead(@PathVariable Long messageId) {
        log.info("Marking message as read: {}", messageId);
        chatService.markMessageAsRead(messageId);
        return ResponseEntity.ok("Message marked as read");
    }
}
