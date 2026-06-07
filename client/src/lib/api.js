import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Auth API ---
export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const signupUser = async (fullName, email, password) => {
  const response = await api.post('/auth/signup', { fullName, email, password });
  return response.data;
};

// --- User API ---
export const getAllUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getUserProfile = async (userId) => {
  const response = await api.get(`/users/${userId}/profile`);
  return response.data;
};

export const createUserProfile = async (userId, profileData) => {
  const response = await api.put(`/users/${userId}/profile`, profileData);
  return response.data;
};

export const updateUserProfile = async (userId, profileData) => {
  const response = await api.put(`/users/${userId}/profile`, profileData);
  return response.data;
};

// --- Chat API ---
export const sendMessage = async (senderId, receiverId, content) => {
  const response = await api.post(
    '/chat/message',
    { message: content, receiverId },
    { params: { senderId } }
  );
  return response.data;
};

export const getConversation = async (userId1, userId2) => {
  const response = await api.get('/chat/conversation', { params: { userId1, userId2 } });
  return response.data;
};

export const getUserConversations = async (userId) => {
  try {
    const response = await api.get(`/chat/user/${userId}/conversations`);
    return response.data;
  } catch {
    return [];
  }
};

export const markMessageAsRead = async (messageId) => {
  const response = await api.put(`/chat/message/${messageId}/read`);
  return response.data;
};

export const sendAIChatMessage = (message, userId) => {
  return api.post('/chat/ai', { message }, { params: { userId } });
};

// --- Password Reset API ---
export const requestPasswordReset = async (email) => {
  const url = `${window.location.origin}/reset-password`;
  const response = await api.post('/auth/recovery', { email, url });
  return response.data;
};

export const confirmPasswordReset = async (userId, secret, password) => {
  const response = await api.put('/auth/recovery', { userId, secret, password });
  return response.data;
};

// --- Notification API ---
export const getUserNotifications = async (userId) => {
  const response = await api.get(`/notifications/user/${userId}`);
  return response.data;
};

export const markNotificationAsRead = async (notificationId) => {
  const response = await api.put(`/notifications/${notificationId}/read`);
  return response.data;
};

// --- Project API ---
export const getAllProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const getProject = async (projectId) => {
  const response = await api.get(`/projects/${projectId}`);
  return response.data;
};

export default api;
