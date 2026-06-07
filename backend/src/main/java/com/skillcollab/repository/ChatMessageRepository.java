package com.skillcollab.repository;

import com.skillcollab.model.ChatMessage;
import com.skillcollab.model.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    
    @Query("SELECT m FROM ChatMessage m WHERE m.chatRoom.id = :chatRoomId ORDER BY m.createdAt DESC LIMIT :limit")
    List<ChatMessage> findByChatRoomIdOrderByCreatedAtDesc(@Param("chatRoomId") Long chatRoomId, @Param("limit") int limit);
    
    @Query("SELECT m FROM ChatMessage m WHERE " +
           "((m.sender.id = :userId1 AND m.receiver.id = :userId2) OR " +
           "(m.sender.id = :userId2 AND m.receiver.id = :userId1)) " +
           "ORDER BY m.createdAt DESC LIMIT :limit")
    List<ChatMessage> findConversationBetweenUsers(@Param("userId1") Long userId1, @Param("userId2") Long userId2, @Param("limit") int limit);
    
    List<ChatMessage> findByReceiverIdAndIsReadFalseOrderByCreatedAtDesc(Long receiverId);
}
