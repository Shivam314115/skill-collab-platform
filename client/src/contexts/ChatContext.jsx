import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
    sendMessage, 
    getConversation, 
    getUserConversations, 
    getAllUsers,
    markMessageAsRead
} from '../lib/api';

const ChatContext = createContext();

export function useChat() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}

export function ChatProvider({ children }) {
    const { user } = useAuth();
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load initial data
    useEffect(() => {
        if (user) {
            loadInitialData();
        }
    }, [user]);

    // Load conversations and users
    const loadInitialData = async () => {
        try {
            setLoading(true);
            console.log('🔄 Loading chat data...');

            // Load all users and conversations in parallel
            const [usersData, conversationsData] = await Promise.all([
                getAllUsers(),
                getUserConversations(user.id)
            ]);

            setAllUsers(usersData);
            setConversations(conversationsData);
            
            console.log('✅ Chat data loaded successfully');
        } catch (error) {
            console.error('❌ Error loading chat data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Load messages for a specific conversation
    const loadConversation = async (otherUserId) => {
        try {
            console.log('💬 Loading conversation with:', otherUserId);
            setLoading(true);
            
            const conversationMessages = await getConversation(user.id, otherUserId);
            setMessages(conversationMessages);
            setActiveConversation(otherUserId);
            
            // Mark messages as read
            const unreadMessages = conversationMessages.filter(
                msg => msg.receiverId === user.id && !msg.isRead
            );
            
            for (const message of unreadMessages) {
                try {
                    await markMessageAsRead(message.id);
                } catch (error) {
                    console.warn('Could not mark message as read:', error);
                }
            }
            
            console.log('✅ Conversation loaded');
        } catch (error) {
            console.error('❌ Error loading conversation:', error);
        } finally {
            setLoading(false);
        }
    };

    // Send a new message
    const sendNewMessage = async (receiverId, content) => {
        try {
            console.log('📤 Sending message to:', receiverId);
            
            const newMessage = await sendMessage(user.id, receiverId, content);
            
            // Add to current conversation if active
            if (activeConversation === receiverId) {
                setMessages(prev => [...prev, newMessage]);
            }
            
            // Refresh conversations to update latest message
            const updatedConversations = await getUserConversations(user.id);
            setConversations(updatedConversations);
            
            return newMessage;
        } catch (error) {
            console.error('❌ Error sending message:', error);
            throw error;
        }
    };

    // Get user info by ID
    const getUserInfo = (userId) => {
        return allUsers.find(u => u.id === userId);
    };

    // Get available users to chat with
    const getAvailableUsers = () => {
        return allUsers.filter(u => u.id !== user.id);
    };

    const value = {
        // State
        activeConversation,
        messages,
        conversations,
        allUsers,
        loading,

        // Actions
        loadConversation,
        sendNewMessage,
        getUserInfo,
        getAvailableUsers,
        loadInitialData
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}
