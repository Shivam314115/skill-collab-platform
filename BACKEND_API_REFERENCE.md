# Quick Reference: Spring Boot Backend API

## Base URL
```
http://localhost:5000/api
```

## Authentication
All authenticated endpoints require:
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

---

## Auth Endpoints

### POST /auth/signup
Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe"
  }'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "userId": 1,
  "email": "user@example.com",
  "fullName": "John Doe",
  "status": "success"
}
```

---

### POST /auth/login
Authenticate user
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Response:** Same as signup

---

## User Endpoints

### GET /users/{userId}
Get user information
```bash
curl -X GET http://localhost:5000/api/users/1 \
  -H "Authorization: Bearer {JWT_TOKEN}"
```

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "John Doe",
  "createdAt": "2026-05-23T10:00:00",
  "updatedAt": "2026-05-23T10:00:00",
  "isActive": true
}
```

---

### GET /users
List all users
```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer {JWT_TOKEN}"
```

---

### GET /users/{userId}/profile
Get user profile
```bash
curl -X GET http://localhost:5000/api/users/1/profile \
  -H "Authorization: Bearer {JWT_TOKEN}"
```

**Response:**
```json
{
  "id": 1,
  "bio": "Full-stack developer",
  "profilePicture": "https://...",
  "location": "San Francisco, CA",
  "experienceLevel": "ADVANCED",
  "profileCompletionPercentage": 85,
  "socialLinks": "{\"github\": \"https://github.com/user\"}",
  "skills": ["JavaScript", "React", "Node.js"],
  "createdAt": "2026-05-23T10:00:00",
  "updatedAt": "2026-05-23T10:00:00"
}
```

---

### PUT /users/{userId}/profile
Update user profile
```bash
curl -X PUT http://localhost:5000/api/users/1/profile \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "Full-stack developer & entrepreneur",
    "location": "New York, NY",
    "experienceLevel": "EXPERT",
    "profilePicture": "https://...",
    "skills": ["JavaScript", "React", "Node.js", "Python"],
    "socialLinks": "{\"github\": \"https://github.com/user\", \"linkedin\": \"https://linkedin.com/in/user\"}"
  }'
```

---

## Project Endpoints

### POST /projects
Create a new project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "E-commerce Platform",
    "description": "Build a modern e-commerce platform",
    "category": "Web Development",
    "requiredSkills": ["React", "Node.js", "PostgreSQL"],
    "projectLink": "https://github.com/user/ecommerce",
    "repositoryUrl": "https://github.com/user/ecommerce"
  }'
```

---

### GET /projects
List all active projects
```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer {JWT_TOKEN}"
```

---

### GET /projects/{projectId}
Get project details
```bash
curl -X GET http://localhost:5000/api/projects/1 \
  -H "Authorization: Bearer {JWT_TOKEN}"
```

---

### GET /projects/user/{userId}
Get projects for a user (created or collaborating)
```bash
curl -X GET http://localhost:5000/api/projects/user/1 \
  -H "Authorization: Bearer {JWT_TOKEN}"
```

---

### PUT /projects/{projectId}
Update project
```bash
curl -X PUT http://localhost:5000/api/projects/1 \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "E-commerce Platform v2",
    "description": "Updated description",
    "status": "SEEKING_COLLABORATORS"
  }'
```

---

### POST /projects/{projectId}/collaborators/{collaboratorId}
Add collaborator to project
```bash
curl -X POST http://localhost:5000/api/projects/1/collaborators/2 \
  -H "Authorization: Bearer {JWT_TOKEN}"
```

---

## Chat Endpoints

### POST /chat/message
Send a message between users
```bash
curl -X POST "http://localhost:5000/api/chat/message?senderId=1" \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hey, want to collaborate?",
    "receiverId": 2
  }'
```

---

### POST /chat/ai
Send message to AI (Google Gemini)
```bash
curl -X POST "http://localhost:5000/api/chat/ai?userId=1" \
  -H "Authorization: Bearer {JWT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What skills should I learn for web development?"
  }'
```

---

### GET /chat/conversation
Get conversation between two users
```bash
curl -X GET "http://localhost:5000/api/chat/conversation?userId1=1&userId2=2&limit=50" \
  -H "Authorization: Bearer {JWT_TOKEN}"
```

---

### GET /chat/unread/{userId}
Get unread messages
```bash
curl -X GET "http://localhost:5000/api/chat/unread/1" \
  -H "Authorization: Bearer {JWT_TOKEN}"
```

---

## Notification Endpoints

### GET /notifications/user/{userId}
Get all notifications
```bash
curl -X GET http://localhost:5000/api/notifications/user/1 \
  -H "Authorization: Bearer {JWT_TOKEN}"
```

---

### GET /notifications/user/{userId}/unread
Get unread notifications
```bash
curl -X GET http://localhost:5000/api/notifications/user/1/unread \
  -H "Authorization: Bearer {JWT_TOKEN}"
```

---

### PUT /notifications/{notificationId}/read
Mark notification as read
```bash
curl -X PUT http://localhost:5000/api/notifications/1/read \
  -H "Authorization: Bearer {JWT_TOKEN}"
```

---

## Error Responses

All errors follow this format:

```json
{
  "timestamp": "2026-05-23T10:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "User with this email already exists"
}
```

### Common Status Codes
- `200`: Success
- `201`: Created
- `204`: No Content
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

---

## Environment Variables

```bash
# JWT Configuration
JWT_SECRET=your-min-256-bit-secret-key-here
JWT_EXPIRATION=86400000

# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/skillcollab
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=your-password

# Google AI
APP_GOOGLE_API_KEY=your-google-api-key

# Server
SERVER_PORT=5000
SERVER_SERVLET_CONTEXT_PATH=/api

# Logging
LOGGING_LEVEL_COM_SKILLCOLLAB=DEBUG
```

---

## Database Queries

### Check JWT Token Validity
```sql
-- Count active users (verifies DB connection)
SELECT COUNT(*) as active_users FROM users WHERE is_active = true;
```

### List Recent Projects
```sql
SELECT id, title, status, created_at 
FROM projects 
ORDER BY created_at DESC 
LIMIT 10;
```

### Get User with Skills
```sql
SELECT u.id, u.full_name, s.name as skill
FROM users u
LEFT JOIN user_skills us ON u.id = us.user_id
LEFT JOIN skills s ON us.skill_id = s.id
WHERE u.id = 1;
```

### Get Collaboration Network
```sql
SELECT p.title, u.full_name, pc.user_id as collaborator_id
FROM projects p
JOIN project_collaborators pc ON p.id = pc.project_id
JOIN users u ON pc.user_id = u.id
WHERE p.creator_id = 1;
```

---

## Frontend Integration Example

```javascript
// client/src/lib/api.js

const API_BASE_URL = 'http://localhost:5000/api';

// Store JWT token
const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// API Helper
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

// Sign Up
export const signup = (email, password, fullName) => {
  return apiCall('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, fullName }),
  });
};

// Get User Profile
export const getUserProfile = (userId) => {
  return apiCall(`/users/${userId}/profile`);
};

// Create Project
export const createProject = (projectData) => {
  return apiCall('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });
};

// Send Message
export const sendMessage = (senderId, receiverId, message) => {
  return apiCall(`/chat/message?senderId=${senderId}`, {
    method: 'POST',
    body: JSON.stringify({ message, receiverId }),
  });
};
```

---

## Testing with Postman

1. **Set Postman Variable**: `{{base_url}}` = `http://localhost:5000/api`
2. **Auth Flow**:
   - Signup → Copy token from response
   - Set token in Postman: `Authorization: Bearer {{token}}`
3. **Test Endpoints**: Use the curl commands above in Postman
4. **Save Responses**: Create test collections for regression testing

---

## Performance Tips

1. **Pagination**: Add `?page=0&size=20` to list endpoints
2. **Filtering**: Use query parameters for search: `?skills=React,Node.js`
3. **Caching**: Set appropriate `Cache-Control` headers
4. **Compression**: Enable gzip compression in production
5. **Connection Pooling**: Configure HikariCP for optimal database performance
