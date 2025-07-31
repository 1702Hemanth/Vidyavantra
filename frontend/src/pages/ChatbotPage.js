import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mockChatbotResponses } from '../../mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your Vidyavantra AI assistant. I can help you with career guidance, startup advice, and entrepreneurship questions. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getLocalResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return mockChatbotResponses.greeting[Math.floor(Math.random() * mockChatbotResponses.greeting.length)];
    }
    
    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('work')) {
      return mockChatbotResponses.career[Math.floor(Math.random() * mockChatbotResponses.career.length)];
    }
    
    if (lowerMessage.includes('startup') || lowerMessage.includes('business') || lowerMessage.includes('entrepreneur')) {
      return mockChatbotResponses.startup[Math.floor(Math.random() * mockChatbotResponses.startup.length)];
    }
    
    if (lowerMessage.includes('funding') || lowerMessage.includes('money') || lowerMessage.includes('investment')) {
      return mockChatbotResponses.funding[Math.floor(Math.random() * mockChatbotResponses.funding.length)];
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('learn') || lowerMessage.includes('education')) {
      return mockChatbotResponses.skills[Math.floor(Math.random() * mockChatbotResponses.skills.length)];
    }
    
    return mockChatbotResponses.default[Math.floor(Math.random() * mockChatbotResponses.default.length)];
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Try to call backend AI API first
      const response = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          context: 'career and startup guidance'
        }),
      });

      let botResponse;
      if (response.ok) {
        const data = await response.json();
        botResponse = data.response;
      } else {
        // Fallback to local responses
        botResponse = getLocalResponse(inputMessage);
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      // Fallback to local responses on error
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: getLocalResponse(inputMessage),
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "How do I validate my startup idea?",
    "What skills should I learn for career growth?",
    "How to find a co-founder?",
    "Best ways to raise funding?",
    "How to transition to tech career?"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-16 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm">
              <Link to="/" className="flex items-center">
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Link>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">AI Career Assistant</h1>
                <p className="text-sm text-slate-600">Online • Ready to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-300px)] flex flex-col">
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-emerald-600' 
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-white" />
                    )}
                  </div>
                  
                  <div className={`rounded-lg px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-900'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-emerald-100' : 'text-slate-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-slate-100 rounded-lg px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Loader2 size={16} className="animate-spin text-slate-600" />
                      <span className="text-slate-600 text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-6 py-4 border-t bg-slate-50">
              <p className="text-sm text-slate-600 mb-3">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-emerald-50 hover:border-emerald-300"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-6 border-t">
            <div className="flex space-x-4">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about careers or startups..."
                disabled={isLoading}
                className="flex-1 h-12"
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="h-12 px-6 bg-emerald-600 hover:bg-emerald-700"
              >
                <Send size={16} />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              This AI assistant provides guidance on career and startup topics. Always consult professionals for important decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center border-none shadow-md">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot size={24} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">AI-Powered</h3>
              <p className="text-slate-600 text-sm">
                Advanced AI trained on career and startup knowledge
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-none shadow-md">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={24} className="text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Personalized</h3>
              <p className="text-slate-600 text-sm">
                Tailored advice based on your specific situation
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-none shadow-md">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot size={24} className="text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">24/7 Available</h3>
              <p className="text-slate-600 text-sm">
                Get instant guidance whenever you need it
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ChatbotPage;