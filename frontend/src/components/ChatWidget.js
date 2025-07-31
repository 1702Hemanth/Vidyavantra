import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </div>

      {/* Chat Preview Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 bg-white rounded-lg shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-300">
          <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-t-lg">
            <h3 className="text-white font-semibold">AI Career Assistant</h3>
            <p className="text-emerald-100 text-sm">Get instant guidance and advice</p>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <div className="bg-slate-100 rounded-lg p-3 mb-2">
                <p className="text-sm text-slate-700">
                  👋 Hi! I'm your Vidyavantra AI assistant. I can help you with:
                </p>
              </div>
              <div className="space-y-1 text-xs text-slate-600">
                <div>• Career guidance and planning</div>
                <div>• Startup advice and resources</div>
                <div>• Skill development recommendations</div>
                <div>• Job search strategies</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button asChild className="w-full" size="sm">
                <Link to="/chatbot">Start Conversation</Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;