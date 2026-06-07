package com.skillcollab.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessageDTO {
    private Long id;
    private Long senderId;
    private String senderName;
    private Long receiverId;
    private String content;
    private Boolean isRead;
    private Boolean isAiGenerated;
    private LocalDateTime createdAt;
}
