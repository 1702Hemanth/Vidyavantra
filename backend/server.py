from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timedelta
import jwt
import bcrypt
from openai import OpenAI
import asyncio
from functools import wraps

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Environment variables
mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']
jwt_secret = os.environ['JWT_SECRET']
openai_api_key = os.environ['OPENAI_API_KEY']

# MongoDB connection
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# OpenAI client
openai_client = OpenAI(api_key=openai_api_key)

# Create the main app without a prefix
app = FastAPI(title="Vidyavantra API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Pydantic Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    password_hash: str
    join_date: datetime = Field(default_factory=datetime.utcnow)
    completed_tutorials: List[str] = Field(default_factory=list)
    saved_jobs: List[str] = Field(default_factory=list)
    is_active: bool = True

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ForgotPassword(BaseModel):
    email: EmailStr

class ResetPassword(BaseModel):
    email: EmailStr
    otp: str
    new_password: str

class ChatMessage(BaseModel):
    message: str
    context: Optional[str] = "career and startup guidance"

class ChatResponse(BaseModel):
    response: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class NewsArticle(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    image: str
    date: str
    category: str

class JobRecommendation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    company: str
    location: str
    salary: str
    type: str
    skills: List[str]
    posted: str

class Tutorial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    duration: str
    difficulty: str
    steps: List[str]

class FAQ(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question: str
    answer: str

# Utility functions
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hash: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hash.encode('utf-8'))

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, jwt_secret, algorithm="HS256")
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, jwt_secret, algorithms=["HS256"])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        user = await db.users.find_one({"id": user_id})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

# Mock data initialization
async def init_mock_data():
    """Initialize the database with mock data if it's empty"""
    try:
        # Check if data already exists
        news_count = await db.news.count_documents({})
        if news_count > 0:
            return
        
        # Insert mock news
        mock_news = [
            {
                "id": "1",
                "title": "Top 10 Emerging Tech Startups to Watch in 2025",
                "excerpt": "Discover the most promising startups revolutionizing AI, healthcare, and sustainable technology.",
                "image": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop",
                "date": "2025-01-15",
                "category": "Startup News"
            },
            {
                "id": "2",
                "title": "Remote Work Career Opportunities Surge by 40%",
                "excerpt": "Latest employment trends show significant growth in remote positions across tech and creative industries.",
                "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
                "date": "2025-01-14",
                "category": "Career Trends"
            },
            {
                "id": "3",
                "title": "How to Secure Startup Funding in 2025",
                "excerpt": "Complete guide to navigate venture capital, angel investors, and government grants for your startup.",
                "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
                "date": "2025-01-13",
                "category": "Funding"
            }
        ]
        await db.news.insert_many(mock_news)
        
        # Insert mock jobs
        mock_jobs = [
            {
                "id": "1",
                "title": "Frontend Developer",
                "company": "TechCorp Solutions",
                "location": "Remote",
                "salary": "$70,000 - $90,000",
                "type": "Full-time",
                "skills": ["React", "TypeScript", "Tailwind CSS"],
                "posted": "2 days ago"
            },
            {
                "id": "2",
                "title": "Product Manager",
                "company": "InnovateLabs",
                "location": "San Francisco, CA",
                "salary": "$95,000 - $120,000",
                "type": "Full-time",
                "skills": ["Agile", "Analytics", "Strategy"],
                "posted": "1 week ago"
            }
        ]
        await db.jobs.insert_many(mock_jobs)
        
        # Insert mock tutorials
        mock_tutorials = [
            {
                "id": "1",
                "title": "Business Idea Validation",
                "description": "Learn how to validate your startup idea before investing time and money",
                "duration": "15 min",
                "difficulty": "Beginner",
                "steps": [
                    "Define your target audience",
                    "Conduct market research", 
                    "Create MVP wireframes",
                    "Test with potential customers",
                    "Analyze feedback and iterate"
                ]
            }
        ]
        await db.tutorials.insert_many(mock_tutorials)
        
        # Insert mock FAQs
        mock_faqs = [
            {
                "id": "1",
                "question": "How do I get started with my startup idea?",
                "answer": "Begin by validating your idea through market research, talking to potential customers, and creating a simple prototype or mockup. Focus on solving a real problem that people are willing to pay for."
            },
            {
                "id": "2",
                "question": "What skills are most important for career growth?",
                "answer": "Key skills include digital literacy, critical thinking, communication, adaptability, and continuous learning. Technical skills like coding, data analysis, and AI familiarity are increasingly valuable across industries."
            }
        ]
        await db.faqs.insert_many(mock_faqs)
        
        logger.info("Mock data initialized successfully")
    except Exception as e:
        logger.error(f"Error initializing mock data: {e}")

# API Routes

@api_router.get("/")
async def root():
    return {"message": "Vidyavantra API is running!", "version": "1.0.0"}

# Authentication routes
@api_router.post("/auth/register")
async def register(user_data: UserCreate):
    try:
        # Check if user already exists
        existing_user = await db.users.find_one({"email": user_data.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create new user
        hashed_password = hash_password(user_data.password)
        user = User(
            name=user_data.name,
            email=user_data.email,
            password_hash=hashed_password
        )
        
        # Insert user into database
        await db.users.insert_one(user.dict())
        
        # Create access token
        access_token = create_access_token(data={"sub": user.id})
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "join_date": user.join_date.isoformat()
            }
        }
    except Exception as e:
        logger.error(f"Registration error: {e}")
        raise HTTPException(status_code=500, detail="Registration failed")

@api_router.post("/auth/login")
async def login(user_data: UserLogin):
    try:
        # Find user by email
        user = await db.users.find_one({"email": user_data.email})
        if not user or not verify_password(user_data.password, user["password_hash"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        
        # Create access token
        access_token = create_access_token(data={"sub": user["id"]})
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"],
                "join_date": user["join_date"].isoformat() if isinstance(user["join_date"], datetime) else user["join_date"]
            }
        }
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(status_code=500, detail="Login failed")

@api_router.post("/auth/forgot-password")
async def forgot_password(data: ForgotPassword):
    try:
        # In a real app, you would send an actual email
        # For demo purposes, we'll just return success
        user = await db.users.find_one({"email": data.email})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Store OTP in database (in real app, with expiration)
        otp = "123456"  # Demo OTP
        await db.reset_tokens.update_one(
            {"email": data.email},
            {"$set": {"otp": otp, "created_at": datetime.utcnow()}},
            upsert=True
        )
        
        return {"message": "Reset code sent to email"}
    except Exception as e:
        logger.error(f"Forgot password error: {e}")
        raise HTTPException(status_code=500, detail="Failed to send reset code")

@api_router.post("/auth/reset-password")
async def reset_password(data: ResetPassword):
    try:
        # Verify OTP
        reset_token = await db.reset_tokens.find_one({"email": data.email, "otp": data.otp})
        if not reset_token:
            raise HTTPException(status_code=400, detail="Invalid or expired OTP")
        
        # Update user password
        hashed_password = hash_password(data.new_password)
        await db.users.update_one(
            {"email": data.email},
            {"$set": {"password_hash": hashed_password}}
        )
        
        # Delete reset token
        await db.reset_tokens.delete_one({"email": data.email})
        
        return {"message": "Password reset successfully"}
    except Exception as e:
        logger.error(f"Reset password error: {e}")
        raise HTTPException(status_code=500, detail="Password reset failed")

# Chat endpoint with OpenAI integration
@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(message: ChatMessage):
    try:
        # Create a system prompt for career and startup guidance
        system_prompt = """You are an AI assistant specializing in career guidance and startup advice for the Vidyavantra platform. 
        
        Your expertise includes:
        - Career development and planning
        - Job search strategies and interview preparation
        - Skill development recommendations
        - Startup idea validation and business planning
        - Fundraising and investment guidance
        - Entrepreneurship best practices
        - Industry trends and opportunities
        
        Provide helpful, actionable advice in a friendly and professional tone. Keep responses concise but informative.
        If asked about topics outside career/startup guidance, politely redirect to your areas of expertise."""
        
        # Call OpenAI API
        response = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": message.message}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        ai_response = response.choices[0].message.content
        
        return ChatResponse(response=ai_response)
        
    except Exception as e:
        logger.error(f"Chat error: {e}")
        # Fallback response if OpenAI fails
        fallback_responses = {
            "career": "For career growth, focus on developing both technical and soft skills. Consider upskilling in emerging technologies like AI, cloud computing, or data science based on your field.",
            "startup": "Starting a business begins with identifying a real problem and validating your solution. Have you done market research for your idea?",
            "funding": "Funding options include bootstrapping, friends/family, angel investors, VCs, and government grants. What stage is your startup at?",
            "default": "I'm here to help with career guidance and startup advice. Could you be more specific about what you'd like to know?"
        }
        
        message_lower = message.message.lower()
        if "career" in message_lower or "job" in message_lower:
            response_text = fallback_responses["career"]
        elif "startup" in message_lower or "business" in message_lower:
            response_text = fallback_responses["startup"]
        elif "funding" in message_lower or "money" in message_lower:
            response_text = fallback_responses["funding"]
        else:
            response_text = fallback_responses["default"]
            
        return ChatResponse(response=response_text)

# Content routes
@api_router.get("/news")
async def get_news():
    try:
        news_cursor = db.news.find()
        news_list = await news_cursor.to_list(length=100)
        return news_list
    except Exception as e:
        logger.error(f"Get news error: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch news")

@api_router.get("/jobs")
async def get_jobs():
    try:
        jobs_cursor = db.jobs.find()
        jobs_list = await jobs_cursor.to_list(length=100)
        return jobs_list
    except Exception as e:
        logger.error(f"Get jobs error: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch jobs")

@api_router.get("/tutorials")
async def get_tutorials():
    try:
        tutorials_cursor = db.tutorials.find()
        tutorials_list = await tutorials_cursor.to_list(length=100)
        return tutorials_list
    except Exception as e:
        logger.error(f"Get tutorials error: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch tutorials")

@api_router.get("/faq")
async def get_faqs():
    try:
        faqs_cursor = db.faqs.find()
        faqs_list = await faqs_cursor.to_list(length=100)
        return faqs_list
    except Exception as e:
        logger.error(f"Get FAQs error: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch FAQs")

@api_router.get("/user/profile")
async def get_user_profile(current_user = Depends(get_current_user)):
    try:
        return {
            "id": current_user["id"],
            "name": current_user["name"],
            "email": current_user["email"],
            "join_date": current_user["join_date"],
            "completed_tutorials": current_user.get("completed_tutorials", []),
            "saved_jobs": current_user.get("saved_jobs", [])
        }
    except Exception as e:
        logger.error(f"Get profile error: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch profile")

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    """Initialize mock data on startup"""
    await init_mock_data()
    logger.info("Vidyavantra API started successfully")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("Database connection closed")