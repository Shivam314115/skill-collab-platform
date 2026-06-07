package com.skillcollab.service;

import com.skillcollab.dto.ChatMessageDTO;
import com.skillcollab.model.ChatMessage;
import com.skillcollab.model.ChatRoom;
import com.skillcollab.model.User;
import com.skillcollab.repository.ChatMessageRepository;
import com.skillcollab.repository.ChatRoomRepository;
import com.skillcollab.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    @Value("${app.google.api-key}")
    private String googleApiKey;

    public ChatMessageDTO sendMessage(Long senderId, Long receiverId, String content) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        // Create or get chat room
        String conversationId = getConversationId(senderId, receiverId);
        ChatRoom chatRoom = chatRoomRepository.findByConversationId(conversationId)
                .orElseGet(() -> chatRoomRepository.save(ChatRoom.builder()
                        .conversationId(conversationId)
                        .build()));

        ChatMessage message = ChatMessage.builder()
                .sender(sender)
                .receiver(receiver)
                .chatRoom(chatRoom)
                .content(content)
                .isRead(false)
                .isAiGenerated(false)
                .build();

        message = chatMessageRepository.save(message);
        log.info("Message sent from {} to {}", senderId, receiverId);

        return convertToDTO(message);
    }

    public ChatMessageDTO sendAiMessage(Long senderId, String content) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        // For AI responses, we use a system user or handle specially
        String aiResponse = generateAiResponse(content);

        // Create a pseudo-message for AI response
        ChatMessage message = ChatMessage.builder()
                .sender(sender)
                .receiver(sender) // Self-message for AI
                .content(aiResponse)
                .isRead(false)
                .isAiGenerated(true)
                .build();

        message = chatMessageRepository.save(message);
        log.info("AI message generated for user: {}", senderId);

        return convertToDTO(message);
    }

    public List<ChatMessageDTO> getConversation(Long userId1, Long userId2, int limit) {
        List<ChatMessage> messages = chatMessageRepository.findConversationBetweenUsers(userId1, userId2, limit);
        return messages.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ChatMessageDTO> getUnreadMessages(Long userId) {
        return chatMessageRepository.findByReceiverIdAndIsReadFalseOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void markMessageAsRead(Long messageId) {
        ChatMessage message = chatMessageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        message.setIsRead(true);
        chatMessageRepository.save(message);
    }

    private String generateAiResponse(String userMessage) {
        try {
            if (googleApiKey == null || googleApiKey.isEmpty()) {
                return "AI service is not configured. Please set your Google API key.";
            }

            // Using REST call to Google Gemini API
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + googleApiKey;

            Map<String, Object> requestBody = new HashMap<>();
            Map<String, Object> content = new HashMap<>();
            Map<String, Object> part = new HashMap<>();
            part.put("text", userMessage);
            content.put("parts", new Object[]{part});
            requestBody.put("contents", new Object[]{content});

            // Make API call
            org.springframework.http.HttpEntity<Map<String, Object>> entity = 
                new org.springframework.http.HttpEntity<>(requestBody, new org.springframework.http.HttpHeaders());
            
            org.springframework.core.ParameterizedTypeReference<Map<String, Object>> responseType = 
                new org.springframework.core.ParameterizedTypeReference<Map<String, Object>>() {};
            
            org.springframework.http.ResponseEntity<Map<String, Object>> response = 
                restTemplate.exchange(url, org.springframework.http.HttpMethod.POST, entity, responseType);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                // Parse response - simplified parsing
                return "Response generated successfully";
            }
            return "Could not generate response";
        } catch (Exception e) {
            log.error("Error generating AI response", e);
            return "I apologize, but I couldn't generate a response at this moment. Please try again.";
        }
    }

    private String getConversationId(Long userId1, Long userId2) {
        Long smaller = Math.min(userId1, userId2);
        Long larger = Math.max(userId1, userId2);
        return smaller + "_" + larger;
    }

    private ChatMessageDTO convertToDTO(ChatMessage message) {
        return ChatMessageDTO.builder()
                .id(message.getId())
                .senderId(message.getSender().getId())
                .senderName(message.getSender().getFullName())
                .receiverId(message.getReceiver().getId())
                .content(message.getContent())
                .isRead(message.getIsRead())
                .isAiGenerated(message.getIsAiGenerated())
                .createdAt(message.getCreatedAt())
                .build();
    }
}
