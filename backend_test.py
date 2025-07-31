#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Vidyavantra Platform
Tests all backend endpoints including authentication, AI chatbot, and content APIs
"""

import requests
import json
import time
from datetime import datetime

# Configuration
BASE_URL = "https://03423dca-21ee-4d8e-9964-23542b5b6783.preview.emergentagent.com/api"
TEST_USER_EMAIL = "sarah.johnson@example.com"
TEST_USER_NAME = "Sarah Johnson"
TEST_USER_PASSWORD = "SecurePass123!"

class VidyavantraAPITester:
    def __init__(self):
        self.base_url = BASE_URL
        self.access_token = None
        self.test_results = []
        
    def log_result(self, test_name, success, message, response_data=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        
    def test_health_check(self):
        """Test basic health check endpoint"""
        try:
            response = requests.get(f"{self.base_url}/")
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "Vidyavantra API is running" in data["message"]:
                    self.log_result("Health Check", True, "API is running successfully", data)
                    return True
                else:
                    self.log_result("Health Check", False, f"Unexpected response format: {data}")
                    return False
            else:
                self.log_result("Health Check", False, f"HTTP {response.status_code}: {response.text}")
                return False
        except Exception as e:
            self.log_result("Health Check", False, f"Connection error: {str(e)}")
            return False
    
    def test_user_registration(self):
        """Test user registration"""
        try:
            # First, try to register a new user
            user_data = {
                "name": TEST_USER_NAME,
                "email": TEST_USER_EMAIL,
                "password": TEST_USER_PASSWORD
            }
            
            response = requests.post(f"{self.base_url}/auth/register", json=user_data)
            
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data and "user" in data:
                    self.access_token = data["access_token"]
                    self.log_result("User Registration", True, "User registered successfully", {
                        "user_id": data["user"]["id"],
                        "user_name": data["user"]["name"],
                        "token_received": True
                    })
                    return True
                else:
                    self.log_result("User Registration", False, f"Missing required fields in response: {data}")
                    return False
            elif response.status_code == 400:
                # User might already exist, try to login instead
                self.log_result("User Registration", True, "User already exists (expected behavior)", {"status": "user_exists"})
                return self.test_user_login()
            else:
                self.log_result("User Registration", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_result("User Registration", False, f"Request error: {str(e)}")
            return False
    
    def test_user_login(self):
        """Test user login"""
        try:
            login_data = {
                "email": TEST_USER_EMAIL,
                "password": TEST_USER_PASSWORD
            }
            
            response = requests.post(f"{self.base_url}/auth/login", json=login_data)
            
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data and "user" in data:
                    self.access_token = data["access_token"]
                    self.log_result("User Login", True, "Login successful", {
                        "user_id": data["user"]["id"],
                        "user_name": data["user"]["name"],
                        "token_received": True
                    })
                    return True
                else:
                    self.log_result("User Login", False, f"Missing required fields in response: {data}")
                    return False
            else:
                self.log_result("User Login", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_result("User Login", False, f"Request error: {str(e)}")
            return False
    
    def test_jwt_validation(self):
        """Test JWT token validation with protected route"""
        if not self.access_token:
            self.log_result("JWT Validation", False, "No access token available")
            return False
            
        try:
            headers = {"Authorization": f"Bearer {self.access_token}"}
            response = requests.get(f"{self.base_url}/user/profile", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "name" in data and "email" in data:
                    self.log_result("JWT Validation", True, "JWT token validation successful", {
                        "user_profile_retrieved": True,
                        "user_name": data["name"]
                    })
                    return True
                else:
                    self.log_result("JWT Validation", False, f"Invalid profile data structure: {data}")
                    return False
            else:
                self.log_result("JWT Validation", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_result("JWT Validation", False, f"Request error: {str(e)}")
            return False
    
    def test_ai_chatbot(self):
        """Test AI chatbot functionality - CRITICAL TEST"""
        test_questions = [
            {
                "question": "How do I validate my startup idea?",
                "expected_keywords": ["validate", "market", "research", "customer", "idea"]
            },
            {
                "question": "What skills should I learn for career growth?",
                "expected_keywords": ["skills", "career", "learn", "development", "growth"]
            },
            {
                "question": "How can I get funding for my startup?",
                "expected_keywords": ["funding", "investor", "capital", "startup", "money"]
            }
        ]
        
        chatbot_success = True
        
        for i, test_case in enumerate(test_questions):
            try:
                chat_data = {
                    "message": test_case["question"],
                    "context": "career and startup guidance"
                }
                
                response = requests.post(f"{self.base_url}/chat", json=chat_data)
                
                if response.status_code == 200:
                    data = response.json()
                    if "response" in data and "timestamp" in data:
                        ai_response = data["response"].lower()
                        
                        # Check if response contains relevant keywords
                        keyword_matches = sum(1 for keyword in test_case["expected_keywords"] 
                                            if keyword.lower() in ai_response)
                        
                        if keyword_matches >= 2:  # At least 2 relevant keywords
                            self.log_result(f"AI Chatbot Question {i+1}", True, 
                                          f"AI provided relevant response to: '{test_case['question']}'", {
                                              "question": test_case["question"],
                                              "response_length": len(data["response"]),
                                              "keyword_matches": keyword_matches,
                                              "response_preview": data["response"][:100] + "..."
                                          })
                        else:
                            self.log_result(f"AI Chatbot Question {i+1}", False, 
                                          f"AI response not relevant enough for: '{test_case['question']}'", {
                                              "question": test_case["question"],
                                              "response": data["response"],
                                              "keyword_matches": keyword_matches
                                          })
                            chatbot_success = False
                    else:
                        self.log_result(f"AI Chatbot Question {i+1}", False, 
                                      f"Invalid response format: {data}")
                        chatbot_success = False
                else:
                    self.log_result(f"AI Chatbot Question {i+1}", False, 
                                  f"HTTP {response.status_code}: {response.text}")
                    chatbot_success = False
                    
                # Small delay between requests
                time.sleep(1)
                
            except Exception as e:
                self.log_result(f"AI Chatbot Question {i+1}", False, f"Request error: {str(e)}")
                chatbot_success = False
        
        # Overall chatbot assessment
        if chatbot_success:
            self.log_result("AI Chatbot Overall", True, "AI chatbot is working correctly with intelligent responses")
        else:
            self.log_result("AI Chatbot Overall", False, "AI chatbot has issues with response quality or availability")
        
        return chatbot_success
    
    def test_content_apis(self):
        """Test content APIs (news, jobs, tutorials, faq)"""
        content_endpoints = [
            ("news", "News API"),
            ("jobs", "Jobs API"),
            ("tutorials", "Tutorials API"),
            ("faq", "FAQ API")
        ]
        
        all_success = True
        
        for endpoint, test_name in content_endpoints:
            try:
                response = requests.get(f"{self.base_url}/{endpoint}")
                
                if response.status_code == 200:
                    data = response.json()
                    if isinstance(data, list) and len(data) > 0:
                        self.log_result(test_name, True, f"Retrieved {len(data)} items successfully", {
                            "item_count": len(data),
                            "sample_item": data[0] if data else None
                        })
                    else:
                        self.log_result(test_name, True, "API working but no data available", {
                            "response_type": type(data).__name__,
                            "data_length": len(data) if isinstance(data, list) else "N/A"
                        })
                else:
                    self.log_result(test_name, False, f"HTTP {response.status_code}: {response.text}")
                    all_success = False
                    
            except Exception as e:
                self.log_result(test_name, False, f"Request error: {str(e)}")
                all_success = False
        
        return all_success
    
    def test_password_recovery(self):
        """Test password recovery flow"""
        try:
            # Test forgot password
            forgot_data = {"email": TEST_USER_EMAIL}
            response = requests.post(f"{self.base_url}/auth/forgot-password", json=forgot_data)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    self.log_result("Forgot Password", True, "Forgot password request successful", data)
                    
                    # Test reset password with demo OTP
                    reset_data = {
                        "email": TEST_USER_EMAIL,
                        "otp": "123456",
                        "new_password": "NewSecurePass123!"
                    }
                    
                    reset_response = requests.post(f"{self.base_url}/auth/reset-password", json=reset_data)
                    
                    if reset_response.status_code == 200:
                        reset_result = reset_response.json()
                        if "message" in reset_result:
                            self.log_result("Reset Password", True, "Password reset successful", reset_result)
                            return True
                        else:
                            self.log_result("Reset Password", False, f"Invalid reset response: {reset_result}")
                            return False
                    else:
                        self.log_result("Reset Password", False, f"HTTP {reset_response.status_code}: {reset_response.text}")
                        return False
                else:
                    self.log_result("Forgot Password", False, f"Invalid forgot password response: {data}")
                    return False
            else:
                self.log_result("Forgot Password", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_result("Password Recovery", False, f"Request error: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Vidyavantra Backend API Tests")
        print("=" * 60)
        
        # Test sequence
        tests = [
            ("Health Check", self.test_health_check),
            ("User Registration/Login", self.test_user_registration),
            ("JWT Validation", self.test_jwt_validation),
            ("AI Chatbot (CRITICAL)", self.test_ai_chatbot),
            ("Content APIs", self.test_content_apis),
            ("Password Recovery", self.test_password_recovery)
        ]
        
        total_tests = 0
        passed_tests = 0
        
        for test_name, test_func in tests:
            print(f"\n📋 Running {test_name}...")
            result = test_func()
            total_tests += 1
            if result:
                passed_tests += 1
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        success_rate = (passed_tests / total_tests) * 100 if total_tests > 0 else 0
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {total_tests - passed_tests}")
        print(f"Success Rate: {success_rate:.1f}%")
        
        # Detailed results
        print("\n📋 DETAILED RESULTS:")
        for result in self.test_results:
            status = "✅" if result["success"] else "❌"
            print(f"{status} {result['test']}: {result['message']}")
        
        # Critical issues
        failed_tests = [r for r in self.test_results if not r["success"]]
        if failed_tests:
            print("\n🚨 CRITICAL ISSUES FOUND:")
            for failed in failed_tests:
                print(f"- {failed['test']}: {failed['message']}")
        
        return success_rate >= 80  # Consider 80%+ success rate as overall pass

if __name__ == "__main__":
    tester = VidyavantraAPITester()
    overall_success = tester.run_all_tests()
    
    if overall_success:
        print("\n🎉 Overall Assessment: BACKEND APIS WORKING WELL")
    else:
        print("\n⚠️  Overall Assessment: BACKEND HAS CRITICAL ISSUES")