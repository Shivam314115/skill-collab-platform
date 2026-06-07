package com.skillcollab.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRequest {
    private String message;
    private Long receiverId; // Optional, for user-to-user chat
}
