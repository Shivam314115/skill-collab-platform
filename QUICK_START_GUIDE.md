# Implementation Checklist & Quick Start Guide

## 📋 Pre-Implementation Checklist

### Environment Setup
- [ ] Java 17+ installed (`java -version`)
- [ ] Maven 3.6+ installed (`mvn -version`)
- [ ] PostgreSQL 13+ installed and running
- [ ] Node.js 18+ installed (`node -v`)
- [ ] Git configured with credentials
- [ ] IDE: IntelliJ IDEA or VS Code with extensions

### Development Tools
- [ ] Postman or Thunder Client for API testing
- [ ] pgAdmin or DBeaver for database management
- [ ] Git client (command line or GUI)
- [ ] Optional: Docker for containerization

---

## 🚀 Quick Start (15 minutes)

### Step 1: Clone & Navigate
```bash
cd /home/shivam/skill-collab-platform
ls -la
```

### Step 2: Setup PostgreSQL Database
```bash
# Start PostgreSQL (if using Homebrew on Mac)
brew services start postgresql

# Or on Linux
sudo service postgresql start

# Create database
createdb skillcollab
# Or via psql:
# psql -U postgres
# CREATE DATABASE skillcollab;
```

### Step 3: Configure Environment
```bash
cd backend

# Create .env file
cat > .env << 'EOF'
JWT_SECRET=your-super-secret-key-that-is-at-least-256-bits-long-for-security-purposes-do-not-share
GOOGLE_API_KEY=your-google-generative-ai-api-key-from-google-cloud
DATABASE_URL=jdbc:postgresql://localhost:5432/skillcollab
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
PORT=5000
EOF

# Export for Maven
export JWT_SECRET="your-super-secret-key-that-is-at-least-256-bits-long-for-security-purposes-do-not-share"
export GOOGLE_API_KEY="your-google-generative-ai-api-key-from-google-cloud"
```

### Step 4: Build & Run Backend
```bash
cd backend

# Clean build
mvn clean package

# Or run directly
mvn spring-boot:run

# Expected output:
# Started SkillCollabApplication in X.XXX seconds
# Listening on port 5000
```

### Step 5: Update Frontend
```bash
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# Expected output:
#   VITE v7.1.12  ready in XXX ms
#   ➜  Local:   http://localhost:5173/
```

### Step 6: Test Connection
```bash
# Test backend health
curl http://localhost:5000/api/auth/login

# Test frontend
# Open http://localhost:5173 in browser
```

---

## ✅ Backend Verification Checklist

### Database Connection
- [ ] PostgreSQL running and accessible
- [ ] Database `skillcollab` created
- [ ] Credentials in `application.yml` correct

### Spring Boot Application
- [ ] Application starts without errors
- [ ] Port 5000 is accessible
- [ ] No compilation errors in IDE

### API Endpoints
- [ ] Test POST /auth/signup
- [ ] Test POST /auth/login
- [ ] Test GET /users (should return 401 without token)
- [ ] Test GET /projects (should return 401 without token)

### Security
- [ ] JWT_SECRET is at least 256 bits
- [ ] CORS is configured correctly
- [ ] No sensitive data in logs

---

## ✅ Frontend Verification Checklist

### Dependencies
- [ ] No errors about missing Three.js
- [ ] No errors about missing @react-three
- [ ] All imports resolve correctly

### Landing Page
- [ ] Page loads without errors
- [ ] Navigation bar appears
- [ ] Hero section is visible
- [ ] Feature cards are displayed
- [ ] Footer is rendered
- [ ] No animation errors in console

### Responsive Design
- [ ] Desktop view (1920x1080) looks correct
- [ ] Tablet view (768px) is responsive
- [ ] Mobile view (375px) is usable

### Form Testing
- [ ] Email input accepts valid emails
- [ ] Buttons are clickable
- [ ] Form submission doesn't crash app

---

## 🔧 Common Issues & Solutions

### Issue: "Cannot resolve symbol" in IDE
**Solution**: 
```bash
cd backend
mvn clean compile
# Then refresh IDE (IntelliJ: Shift+Cmd+R on Mac, Ctrl+F5 on Windows)
```

### Issue: "Connection refused" to PostgreSQL
**Solution**:
```bash
# Check if PostgreSQL is running
psql -U postgres -d postgres -c "SELECT 1"

# Start PostgreSQL
brew services start postgresql  # Mac
sudo service postgresql start   # Linux
```

### Issue: "Port 5000 already in use"
**Solution**:
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :5000   # Windows
```

### Issue: JWT token validation fails
**Solution**:
- Verify JWT_SECRET is exported: `echo $JWT_SECRET`
- Check JWT_SECRET is at least 256 bits
- Ensure same secret used in `application.yml`

### Issue: "CORS error" in browser console
**Solution**:
- Verify backend URL is correct: `http://localhost:5000/api`
- Check SecurityConfig CORS configuration
- Ensure frontend origin is whitelisted

### Issue: React component errors for removed packages
**Solution**:
```bash
cd client
npm install
# Remove any remaining Three.js references from code
```

---

## 🧪 Testing the Integration

### Test 1: User Registration
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!",
    "fullName": "Test User"
  }'

# Expected response: 200 with JWT token
```

### Test 2: User Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123!"
  }'

# Expected response: 200 with JWT token
# Save token for next tests
TOKEN="your-jwt-token-here"
```

### Test 3: Get User Profile
```bash
curl -X GET http://localhost:5000/api/users/1/profile \
  -H "Authorization: Bearer $TOKEN"

# Expected response: 200 with profile data
```

### Test 4: Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "description": "A test project",
    "category": "Web Development",
    "requiredSkills": ["React", "Node.js"]
  }'

# Expected response: 201 with project data
```

### Test 5: Frontend Integration
1. Open http://localhost:5173
2. Click "Get Started Free"
3. Fill in signup form
4. Submit and verify no errors
5. Check browser Network tab for API calls

---

## 📊 Performance Verification

### Backend Performance
```bash
# Test API response time
time curl http://localhost:5000/api/users

# Should complete in < 100ms
```

### Frontend Performance
```bash
# Check bundle size
cd client
npm run build
# Check dist/ folder size (should be < 1MB)
```

### Database Performance
```bash
# Check query performance
psql -U postgres -d skillcollab -c "EXPLAIN ANALYZE SELECT * FROM users LIMIT 1;"
```

---

## 🔒 Security Verification

### JWT Security
- [ ] JWT_SECRET is long and random (256+ bits)
- [ ] JWT is never logged
- [ ] JWT is stored securely on frontend (localStorage vs sessionStorage debate)
- [ ] JWT expiration is set (24 hours)

### Database Security
- [ ] PostgreSQL has strong password
- [ ] Database is not accessible from internet
- [ ] Connection uses SSL/TLS in production
- [ ] Database backups are encrypted

### API Security
- [ ] CORS is restrictive (not * in production)
- [ ] HTTPS is enforced in production
- [ ] Sensitive endpoints require authentication
- [ ] Rate limiting is implemented
- [ ] Input validation is applied

---

## 📈 Deployment Preparation

### Pre-Deployment Checklist
- [ ] All tests pass
- [ ] No console errors
- [ ] Environment variables configured
- [ ] Database backup created
- [ ] Error handling tested
- [ ] Logging configured
- [ ] HTTPS certificate obtained
- [ ] Domain configured

### Backend Deployment Steps
```bash
# 1. Build production JAR
mvn clean package -DskipTests

# 2. Deploy to hosting (Heroku example)
heroku login
heroku create your-app-name
git push heroku main

# 3. Configure environment
heroku config:set JWT_SECRET="your-secret"
heroku config:set GOOGLE_API_KEY="your-key"
heroku addons:create heroku-postgresql:standard-0
```

### Frontend Deployment Steps
```bash
# 1. Build for production
npm run build

# 2. Deploy to Netlify (already configured)
netlify deploy --prod

# Or GitHub Pages
npm run build
# Push to gh-pages branch
```

---

## 📝 Documentation Review

### Read These Files
1. **IMPLEMENTATION_SUMMARY.md** - Overview of what was done
2. **MIGRATION_GUIDE.md** - Detailed migration instructions
3. **BACKEND_API_REFERENCE.md** - API endpoint reference
4. **PROJECT_PROMPT.md** - Complete project documentation

### Key Documents
- Backend: `/backend/pom.xml` - Dependencies
- Backend: `/backend/src/main/resources/application.yml` - Configuration
- Frontend: `/client/package.json` - Dependencies
- API Spec: Start with AuthController → UserController → ProjectController

---

## 🚨 Emergency Troubleshooting

### Application won't start
```bash
# Check logs
mvn spring-boot:run | head -50

# Common issues:
# 1. Port already in use: lsof -ti:5000
# 2. Database not running: psql test
# 3. Environment variables not set: echo $JWT_SECRET
```

### Database issues
```bash
# Reset database
dropdb skillcollab
createdb skillcollab
# App will auto-create schema

# Reset user password
psql -U postgres -d skillcollab -c "UPDATE users SET password = 'hashed' WHERE email = 'user@example.com';"
```

### Frontend issues
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 🎯 Next Milestone Checklist

### Week 1 Goals
- [ ] Backend running locally
- [ ] Database populated with test data
- [ ] All 26 API endpoints tested
- [ ] Frontend connects to backend
- [ ] User authentication flow works

### Week 2 Goals
- [ ] Data migrated from Appwrite
- [ ] All features tested end-to-end
- [ ] Performance optimizations applied
- [ ] Security audit completed
- [ ] Staging deployment ready

### Week 3 Goals
- [ ] Production deployment
- [ ] Monitoring setup
- [ ] Backup strategy implemented
- [ ] Team trained on new system
- [ ] Old system decommissioned

---

## 📞 Support Resources

### Documentation
- Spring Boot: https://spring.io/projects/spring-boot
- Spring Data JPA: https://spring.io/projects/spring-data-jpa
- PostgreSQL: https://www.postgresql.org/docs/
- React: https://react.dev

### Tools
- IDE: IntelliJ IDEA, VS Code
- Database: pgAdmin, DBeaver
- API Testing: Postman, Thunder Client
- Docker: For containerization

### Getting Help
1. Check error logs first
2. Search in documentation files
3. Check MIGRATION_GUIDE.md for solutions
4. Review code comments in Java files
5. Test endpoints with curl/Postman

---

**Status**: ✅ Ready for Implementation
**Last Updated**: May 23, 2026
**Estimated Time to Production**: 5-7 days
