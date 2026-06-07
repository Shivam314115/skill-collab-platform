import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Send, 
  User, 
  MessageCircle, 
  Plus, 
  MoreHorizontal, 
  Phone, 
  Video, 
  Settings, 
  CheckCircle, 
  Activity, 
  Zap, 
  Star, 
  X, 
  UserPlus,
  ArrowLeft 
} from "lucide-react";
import { 
  sendMessage, 
  getConversation, 
  getAllUsers,
  getUserConversations,
  getUserProfile
} from "../../lib/api";

export default function ChatPage() {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activePartnerId, setActivePartnerId] = useState(null);
  const [activePartnerProfile, setActivePartnerProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  
  // UI States
  const [showUserDiscovery, setShowUserDiscovery] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [featuredUsers, setFeaturedUsers] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Load initial data
  useEffect(() => {
    if (user) {
      loadInitialData();
    }
  }, [user]);

  // Load messages when active partner changes
  useEffect(() => {
    if (activePartnerId && user) {
      loadMessages();
    }
  }, [activePartnerId, user]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Search users when query changes
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchQuery.trim()) {
        handleUserSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading initial chat data...');
      
      // Load all users FIRST
      const users = await getAllUsers();
      const otherUsers = users.filter(u =>
        (u.id !== user.id)
      );
      setAllUsers(otherUsers);
      setFeaturedUsers(otherUsers.slice(0, 8));
      console.log('✅ Loaded', otherUsers.length, 'users');
      
      // THEN load conversations with the users data available
      await loadConversations(user.id, otherUsers);
      
      console.log('✅ Initial data loaded');
    } catch (error) {
      console.error('❌ Error loading initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadConversations = async (currentUserId, usersArray = null) => {
    try {
      console.log('💬 Loading conversations...');
      const userConversations = await getUserConversations(currentUserId);
      const availableUsers = usersArray || allUsers;
      
      console.log('📋 Found', userConversations.length, 'raw conversations');
      console.log('👥 Available users:', availableUsers.length);
      
      // Enrich conversations with user profiles
      const enrichedConversations = await Promise.all(
        userConversations.map(async (conversation) => {
          try {
            const otherUserId = conversation.otherUserId;
            console.log('🔍 Looking for user:', otherUserId);
            
            // First, try to find in loaded users
            let otherUser = availableUsers.find(u => u.id === otherUserId);
            
            // If not found, try to fetch from API
            if (!otherUser) {
              try {
                console.log('🌐 Fetching user profile for:', otherUserId);
                otherUser = await getUserProfile(otherUserId);
                console.log('✅ Fetched user profile:', otherUser.fullName);
              } catch (fetchError) {
                console.warn('Could not fetch user profile for:', otherUserId);
                otherUser = {
                  id: otherUserId,
                  fullName: `User ${String(otherUserId).slice(0, 8)}...`,
                  email: 'Unknown User'
                };
              }
            } else {
              console.log('✅ Found user in cache:', otherUser.fullName);
            }
            
            return {
              ...conversation,
              otherUser: otherUser,
              lastMessage: conversation.content || 'No messages yet',
              lastMessageTime: conversation.createdAt,
              isUnread: !conversation.isRead && conversation.receiverId === currentUserId
            };
          } catch (error) {
            console.warn('Could not enrich conversation:', error);
            return {
              ...conversation,
              otherUser: {
                id: conversation.otherUserId,
                fullName: `User ${String(conversation.otherUserId).slice(0, 8)}...`,
                email: 'Unknown'
              },
              lastMessage: conversation.content || 'No messages yet',
              lastMessageTime: conversation.createdAt,
              isUnread: false
            };
          }
        })
      );
      
      setConversations(enrichedConversations);
      console.log('✅ Enriched', enrichedConversations.length, 'conversations');
      
      // Log conversation details for debugging
      enrichedConversations.forEach(conv => {
        console.log('💬 Conversation with:', conv.otherUser.fullName, '- Last message:', conv.lastMessage.slice(0, 50));
      });
      
    } catch (error) {
      console.error('❌ Error loading conversations:', error);
    }
  };

  const handleUserSearch = () => {
    try {
      setSearchLoading(true);
      const results = allUsers.filter(u => 
        u.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results.slice(0, 15));
    } catch (error) {
      console.error('❌ Error searching users:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  const loadMessages = async () => {
    if (!activePartnerId || !user) return;
    
    try {
      console.log('💬 Loading conversation with:', activePartnerId);
      const conversation = await getConversation(user.id, activePartnerId);
      setMessages(conversation);
      
      // Set active partner profile - try multiple methods to find the user
      let partner = allUsers.find(u => u.id === activePartnerId);
      
      if (!partner) {
        // Try to get from conversations
        const existingConversation = conversations.find(c => c.otherUserId === activePartnerId);
        if (existingConversation && existingConversation.otherUser) {
          partner = existingConversation.otherUser;
        } else {
          // Last resort - fetch from API
          try {
            partner = await getUserProfile(activePartnerId);
          } catch (error) {
            partner = { 
              id: activePartnerId, 
              fullName: `User ${String(activePartnerId).slice(0, 8)}...`,
              email: 'Unknown'
            };
          }
        }
      }
      
      setActivePartnerProfile(partner);
      console.log('✅ Set active partner:', partner.fullName);
      console.log('✅ Loaded', conversation.length, 'messages');
    } catch (error) {
      console.error('❌ Error loading messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !activePartnerId || sending) return;
    
    const content = messageInput.trim();
    setMessageInput("");
    setSending(true);
    
    try {
      console.log('📤 Sending message...');
      const newMessage = await sendMessage(user.id, activePartnerId, content);
      setMessages(prev => [...prev, newMessage]);
      
      // Reload conversations to update the sidebar
      await loadConversations(user.id);
      
      console.log('✅ Message sent successfully');
    } catch (error) {
      console.error('❌ Error sending message:', error);
      setMessageInput(content); // Restore message on error
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startChatWithUser = async (selectedUser) => {
    const userId = selectedUser.id;
    setActivePartnerId(userId);
    setShowUserDiscovery(false);
    setSearchQuery("");
    setSearchResults([]);
    console.log('🗨️ Starting chat with:', selectedUser.fullName);
  };
  
  const selectConversation = (conversation) => {
    const otherUserId = conversation.otherUserId || conversation.otherUser?.id || conversation.otherUser?.$id;
    if (otherUserId) {
      setActivePartnerId(otherUserId);
      console.log('💬 Selected conversation with:', conversation.otherUser?.fullName);
    }
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getUserDisplayName = (userObj) => {
    if (!userObj) return "Unknown User";
    return userObj.fullName || userObj.name || `User ${String(userObj.id || '').slice(0, 8)}...`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
            <MessageCircle className="w-8 h-8 text-green-400 animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Loading secure channels...</h3>
          <p className="text-gray-400">Fetching conversations and contacts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex">
      {/* Left Sidebar - Conversations List */}
      <div className="w-80 bg-gray-900/50 border-r border-gray-700/50 backdrop-blur-sm flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-green-400" />
              Chats
            </h1>
            <button
              onClick={() => setShowUserDiscovery(!showUserDiscovery)}
              className="p-2 bg-green-500/10 hover:bg-green-500/20 rounded-lg text-green-400 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm text-gray-400">
            {conversations.length} active conversations
          </div>
        </div>

        {/* User Discovery Panel */}
        <AnimatePresence>
          {showUserDiscovery && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-gray-700/50 bg-gray-800/30"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-white">Start New Chat</h3>
                  <button
                    onClick={() => setShowUserDiscovery(false)}
                    className="p-1 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Search Input */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-green-500/50 focus:outline-none"
                  />
                </div>

                {/* Search Results or Featured Users */}
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {searchQuery ? (
                    searchLoading ? (
                      <div className="text-center py-2 text-gray-400">Searching...</div>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((user) => (
                        <button
                          key={user.id || user.$id || user.userId}
                          onClick={() => startChatWithUser(user)}
                          className="w-full p-2 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg text-left transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-green-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">
                                {getUserDisplayName(user)}
                              </p>
                              <p className="text-xs text-gray-400 truncate">
                                {user.email || 'Developer'}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-2 text-gray-400">No users found</div>
                    )
                  ) : (
                    featuredUsers.map((user) => (
                      <button
                        key={user.id || user.$id || user.userId}
                        onClick={() => startChatWithUser(user)}
                        className="w-full p-2 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {getUserDisplayName(user)}
                            </p>
                            <p className="text-xs text-gray-400">Available • Developer</p>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length > 0 ? (
            <div className="p-2 space-y-1">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id || conversation.otherUserId || conversation.$id}
                  onClick={() => selectConversation(conversation)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    activePartnerId === conversation.otherUserId
                      ? 'bg-green-500/20 border-l-2 border-green-500'
                      : 'hover:bg-gray-700/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-white truncate">
                          {getUserDisplayName(conversation.otherUser)}
                        </h3>
                        <span className="text-xs text-gray-400">
                          {formatMessageTime(conversation.lastMessageTime)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">
                        {conversation.lastMessage || 'No messages yet'}
                      </p>
                      {conversation.isUnread && (
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-6">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No conversations yet</h3>
                <p className="text-gray-400 mb-4">Start chatting with developers and creators</p>
                <button
                  onClick={() => setShowUserDiscovery(true)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                >
                  Start New Chat
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area - Keep the same as before */}
      <div className="flex-1 flex flex-col">
        {activePartnerId && activePartnerProfile ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700/50 bg-gray-900/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h2 className="font-medium text-white">
                      {getUserDisplayName(activePartnerProfile)}
                    </h2>
                    <p className="text-sm text-gray-400">Online • Developer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Start your conversation with {getUserDisplayName(activePartnerProfile)}</p>
                </div>
              ) : (
                messages.map((message, index) => {
                  const isOwn = message.senderId === user.id;
                  return (
                    <motion.div
                      key={message.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          isOwn
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-white'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          isOwn ? 'text-green-100' : 'text-gray-400'
                        }`}>
                          {formatMessageTime(message.createdAt)}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-700/50 bg-gray-900/30 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-green-500/50 focus:outline-none"
                  disabled={sending}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim() || sending}
                  className="p-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          // No chat selected
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Select a Chat</h2>
              <p className="text-gray-400 max-w-sm">
                Choose a conversation from the sidebar to start messaging, or create a new chat with other developers.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
