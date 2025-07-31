# API contracts and integration plan for Vidyavantra

## Frontend-Backend Integration Plan

### 1. Authentication APIs
- POST /api/auth/register - User registration
- POST /api/auth/login - User login  
- POST /api/auth/logout - User logout
- POST /api/auth/forgot-password - Send reset code
- POST /api/auth/reset-password - Reset password with OTP

### 2. User Management APIs
- GET /api/user/profile - Get user profile
- PUT /api/user/profile - Update user profile
- GET /api/user/dashboard - Get dashboard data

### 3. Content APIs  
- GET /api/news - Get news articles with filters
- GET /api/tutorials - Get startup tutorials
- GET /api/jobs - Get job recommendations
- GET /api/faq - Get frequently asked questions

### 4. AI Chatbot API
- POST /api/chat - Send message to OpenAI and get response

### 5. Database Models

#### User Model
```python
class User:
    id: ObjectId
    name: str
    email: str
    password_hash: str
    join_date: datetime
    completed_tutorials: List[str]
    saved_jobs: List[str]
    is_active: bool
```

#### Chat Session Model
```python
class ChatSession:
    id: ObjectId
    user_id: ObjectId
    messages: List[dict]
    created_at: datetime
    updated_at: datetime
```

### 6. Mock Data to Replace

Currently using mock data in `/app/frontend/src/mock.js` for:
- mockNews - Replace with database/API calls
- mockJobs - Replace with job recommendation API
- mockTutorials - Replace with database content
- mockFAQs - Replace with database content
- mockTestimonials - Replace with database content
- mockChatbotResponses - Replace with OpenAI API integration

### 7. Frontend Integration Changes

Replace mock imports with API calls:
- HomePage: Fetch news, testimonials from API
- DashboardPage: Fetch user data, jobs, news from API  
- NewsPage: Fetch news with search/filter from API
- TutorialsPage: Fetch tutorials from API
- FAQPage: Fetch FAQs from API
- ChatbotPage: Replace mock responses with OpenAI API calls

### 8. Environment Variables

Backend `.env` file needs:
```
OPENAI_API_KEY=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
JWT_SECRET=your-jwt-secret-key
MONGO_URL=existing-mongo-url
DB_NAME=existing-db-name
```

### 9. Implementation Priority

1. Setup environment variables and OpenAI integration
2. Create authentication endpoints with JWT
3. Create AI chatbot endpoint with OpenAI
4. Create basic CRUD endpoints for content
5. Replace frontend mock data with API calls
6. Test full integration

### 10. Error Handling

- Proper HTTP status codes
- Validation error messages  
- OpenAI API error fallbacks
- Database connection error handling
- JWT token validation and refresh

This plan ensures seamless integration between the current frontend and new backend implementation.