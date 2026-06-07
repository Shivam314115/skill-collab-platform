# Skill Collab Platform - Project Prompt

## Project Overview
**Skill Collab Platform** is a full-stack collaborative web application designed to connect professionals and students for skill-sharing, project collaboration, and networking. The platform enables users to discover collaborators, manage projects, communicate in real-time, and build meaningful professional relationships.

## Tech Stack

### Frontend
- **Framework**: React 18.3.1 with React Router DOM v7.8.2
- **Build Tool**: Vite 7.1.12
- **Styling**: Tailwind CSS 3.4.10 with PostCSS and Autoprefixer
- **Animations**: Framer Motion 12.23.22 & GSAP 3.12.2
- **3D Graphics**: Three.js 0.159.0 with React Three Fiber 8.15.11 & Drei 9.88.13
- **UI Components**: Lucide React for icons
- **State Management**: React Context API (AuthContext, ChatContext)
- **API Client**: Axios 1.12.2
- **Error Handling**: React Error Boundary 4.0.11
- **Backend Service**: Appwrite 14.0.0 (BaaS for authentication, database, storage)

### Backend
- **Runtime**: Node.js with Express 5.1.0
- **AI Integration**: Google Generative AI (Gemini Pro) 0.24.1
- **Middleware**: CORS enabled for cross-origin requests
- **Environment**: Dotenv for configuration management
- **Dev Tool**: Nodemon for hot-reloading

### Deployment
- **Hosting**: Netlify (configured with netlify.toml)
- **Redirects**: Configured for SPA routing

---

## Architecture

### Project Structure
```
skill-collab-platform/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── App.jsx                 # Main routing & authentication wrapper
│   │   ├── main.jsx                # Entry point
│   │   ├── index.css               # Global styles
│   │   ├── api/
│   │   │   └── mockData.js         # Mock data for testing
│   │   ├── components/
│   │   │   ├── Icons.jsx           # Icon library
│   │   │   ├── common/             # Reusable components (ActionButton, FormInput, Logo, SocialButton)
│   │   │   ├── dashboard/          # Dashboard-specific (NotificationsDropdown, ProfileDropdown, ProjectCard)
│   │   │   └── profile/            # Profile management (ProfileForm)
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx     # Authentication state & user management
│   │   │   └── ChatContext.jsx     # Chat/messaging state
│   │   ├── hooks/
│   │   │   └── useAuth.jsx         # Authentication hook
│   │   ├── layouts/
│   │   │   ├── AuthLayout.jsx      # Layout for auth pages
│   │   │   ├── DashboardLayout.jsx # Layout for authenticated pages
│   │   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   │   └── TopBar.jsx          # Top navigation bar
│   │   ├── lib/
│   │   │   ├── api.js              # Axios instance & API calls
│   │   │   └── appwrite.js         # Appwrite SDK configuration
│   │   └── pages/
│   │       ├── LandingPage.jsx     # Public landing page with animations
│   │       ├── NotFoundPage.jsx    # 404 page
│   │       ├── auth/               # Authentication pages (Login, SignUp, ForgotPassword, ResetPassword, ProfileBuilder)
│   │       ├── dashboard/          # Protected pages (Home, Projects, ProjectDetail, Discover, Chat, Settings, Support)
│   │       └── profile/            # Profile pages (ProfileBuilder, EditProfile)
│   ├── public/                      # Static assets
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.cjs          # Tailwind CSS customization
│   ├── postcss.config.cjs           # PostCSS plugins
│   ├── package.json                 # Frontend dependencies
│   └── index.html                   # HTML entry point
│
├── server/                          # Node.js Express Backend
│   ├── index.js                     # Express server & Gemini API endpoint
│   ├── package.json                 # Backend dependencies
│   └── .env (not in repo)          # Google API key & port configuration
│
├── netlify.toml                    # Netlify deployment config
├── package.json                     # Root package.json
└── README.md                        # Project documentation

```

---

## Core Features

### 1. **Authentication & Authorization**
- User registration and login via Appwrite
- JWT-based session management
- Password reset functionality
- Profile builder for new users
- Protected routes requiring authentication

### 2. **User Profile Management**
- Comprehensive profile creation and editing
- Skill endorsements and portfolio showcase
- Social links integration
- Profile customization options

### 3. **Project Discovery & Management**
- Browse and discover projects by category, skill requirements
- Create and manage personal projects
- Project details view with collaborator information
- Real-time project status updates

### 4. **Collaboration & Communication**
- Real-time chat interface with AI-powered assistance
- Google Gemini AI integration for intelligent responses
- Message history and conversation management
- Notification system for project updates and messages

### 5. **Dashboard**
- Personalized user dashboard with analytics
- Quick access to ongoing projects
- Activity feed and notifications
- Settings and preferences management
- Support/Help center access

### 6. **Discovery Page**
- Find potential collaborators by skills and interests
- Filter and search functionality
- Connection/collaboration request system

---

## Key Routes

### Public Routes (Unauthenticated Users)
- `/` - Landing page with CTAs and platform overview
- `/login` - User login page
- `/signup` - User registration page
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset confirmation

### Protected Routes (Authenticated Users)
- `/dashboard` - Main dashboard home
- `/dashboard/projects` - Projects listing
- `/dashboard/projects/:id` - Project details
- `/dashboard/chat` - Messaging/chat interface
- `/dashboard/discover` - Find collaborators
- `/dashboard/settings` - User preferences
- `/dashboard/support` - Help & support
- `/profile/setup` - Initial profile setup
- `/profile/edit` - Edit existing profile

---

## State Management

### AuthContext
- Manages current user state
- Handles login/logout/signup
- Tracks authentication loading state
- Provides user data across the app

### ChatContext
- Manages chat messages and conversations
- Handles message sending/receiving
- Integrates with Google Gemini AI for responses
- Maintains message history

---

## Backend API Endpoints

### POST `/api/chat`
- **Purpose**: Send messages to Google Gemini AI
- **Request Body**: `{ message: string }`
- **Response**: `{ response: string }`
- **Error Handling**: Returns 500 on API failure

---

## Design System

### Color Palette
- **Primary Green**: `#36B083` (gradient to `#2d9a6e`)
- **Secondary Gray**: `#303030` to `#404040`
- **Accent Colors**: Green-400, Blue-400, Purple-500
- **Background**: Dark gradients (black to gray-900)
- **Text**: White/White with opacity

### UI Components
- Modern button system with hover animations and shine effects
- Form inputs with validation
- Loading spinners with progress indicators
- Responsive dropdown menus
- Card-based layouts for projects
- Modal dialogs for confirmations

### Animation & Interactions
- Smooth transitions using Tailwind & Framer Motion
- Hover scale effects on interactive elements
- Loading state animations
- Page transitions with React Router
- 3D elements using Three.js (for advanced visualizations)

---

## Data Models

### User Model
- User ID (from Appwrite)
- Email & Password (Appwrite Auth)
- Full Name
- Bio/Description
- Skills (array)
- Profile Picture
- Social Links
- Experience Level
- Location
- Interests

### Project Model
- Project ID
- Title & Description
- Category/Tags
- Required Skills
- Status (active, completed, seeking)
- Team Members
- Created Date
- Updated Date
- Project Link/Repository

### Message Model
- Message ID
- Sender ID
- Recipient/Room ID
- Content
- Timestamp
- Read Status

---

## Development Workflow

### Setup Instructions
```bash
# Install root dependencies (if any)
npm install

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Configure environment
echo "GEMINI_API_KEY=your_key_here" > server/.env
echo "PORT=5000" >> server/.env
```

### Running the Application
```bash
# Terminal 1: Start backend server
cd server
npm start  # Runs on port 5000

# Terminal 2: Start frontend development server
cd client
npm run dev  # Runs on port 5173 (Vite default)
```

### Building for Production
```bash
# Frontend build
cd client
npm run build  # Creates optimized dist/

# Backend is ready as-is (Node.js)
# Deploy using Netlify CLI or git push
```

---

## Integration Points

### Appwrite Integration
- Authentication (email/password)
- User database for profiles
- File storage for avatars/images
- Real-time subscriptions (future)

### Google Gemini AI Integration
- Chat endpoint for AI responses
- Natural language processing
- Context-aware recommendations

### Netlify Deployment
- Automatic builds on git push
- Environment variable management
- Redirects configuration for SPA routing

---

## Known Features & Enhancements

### Current Implementation
- ✅ User authentication flow
- ✅ Profile management
- ✅ Project listing and details
- ✅ Chat interface with AI
- ✅ Dashboard home
- ✅ Dark theme with modern UI
- ✅ Responsive design
- ✅ Notifications dropdown
- ✅ Settings page

### Potential Enhancements
- 🔲 Video call integration
- 🔲 Advanced project filtering
- 🔲 Skill endorsement system
- 🔲 Portfolio/work samples
- 🔲 Payment integration
- 🔲 Notification preferences
- 🔲 Social features (follow, like)
- 🔲 Advanced search/recommendations
- 🔲 File sharing in chat
- 🔲 Analytics dashboard

---

## Development Best Practices

1. **Component Structure**: Functional components with React Hooks
2. **State Management**: Context API for global state, useState for local
3. **Styling**: Tailwind CSS utility-first approach
4. **Error Handling**: React Error Boundary for error catching
5. **Accessibility**: ARIA labels, keyboard navigation support
6. **Performance**: React.memo for expensive components, lazy loading routes
7. **Code Organization**: Feature-based folder structure
8. **Environment**: Use .env files for configuration, never commit secrets

---

## Testing & Quality Assurance

- Manual testing workflow
- Component testing (future: Jest + React Testing Library)
- E2E testing (future: Cypress or Playwright)
- Cross-browser compatibility
- Mobile responsiveness testing

---

## Deployment

**Platform**: Netlify
- Frontend automatically deployed from `/client` build output
- Redirects configured in `netlify.toml` for SPA routing
- Environment variables managed via Netlify dashboard

**Backend**: Can be deployed to:
- Vercel (Node.js support)
- Heroku
- Railway
- DigitalOcean
- AWS (Lambda, EC2, or App Runner)

---

## Documentation & Resources

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Express.js, Google Generative AI
- **Database/Auth**: Appwrite
- **Deployment**: Netlify
- **3D Graphics**: Three.js (optional for enhanced visuals)

---

## Summary
Skill Collab Platform is a modern, full-stack web application for professional collaboration built with React, Express, and Appwrite. It features real-time chat with AI assistance, comprehensive user profiles, project management, and a beautiful dark-themed UI optimized for both desktop and mobile devices.
