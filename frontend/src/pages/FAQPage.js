import React, { useState } from 'react';
import { Search, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import { mockFAQs } from '../../mock';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (itemId) => {
    setOpenItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const filteredFAQs = mockFAQs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { name: 'Getting Started', icon: '🚀', count: 2 },
    { name: 'Career Development', icon: '💼', count: 2 },
    { name: 'Startup Funding', icon: '💰', count: 2 },
    { name: 'Common Mistakes', icon: '⚠️', count: 1 }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle size={40} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Find answers to common questions about careers, startups, and entrepreneurship
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-slate-900 bg-white border-none shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-none">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-slate-900 mb-2">{category.name}</h3>
                  <p className="text-slate-600 text-sm">{category.count} questions</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <Card key={faq.id} className="shadow-md border-none">
                  <Collapsible 
                    open={openItems[faq.id]} 
                    onOpenChange={() => toggleItem(faq.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardContent className="p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <HelpCircle size={16} className="text-emerald-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 text-left">
                              {faq.question}
                            </h3>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            {openItems[faq.id] ? (
                              <ChevronUp size={20} className="text-slate-400" />
                            ) : (
                              <ChevronDown size={20} className="text-slate-400" />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="px-6 pb-6 pt-0">
                        <div className="ml-12">
                          <div className="bg-slate-50 rounded-lg p-4">
                            <p className="text-slate-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={48} className="text-slate-400" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">No FAQs found</h3>
              <p className="text-slate-600 mb-6">
                Try adjusting your search terms or browse by category
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-none">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Still have questions?</h2>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our AI assistant is here to help you 24/7
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                  Ask AI Assistant
                </button>
                <button className="px-8 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium">
                  Contact Support
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Popular Topics</h2>
            <p className="text-xl text-slate-600">Most searched questions by our community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Business Plan Basics</h3>
                <p className="text-slate-600 text-sm mb-4">Learn how to create a winning business plan</p>
                <div className="flex items-center text-emerald-600 text-sm font-medium">
                  <span>3 related questions</span>
                  <ChevronDown size={16} className="ml-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Career Transitions</h3>
                <p className="text-slate-600 text-sm mb-4">Navigate career changes successfully</p>
                <div className="flex items-center text-emerald-600 text-sm font-medium">
                  <span>5 related questions</span>
                  <ChevronDown size={16} className="ml-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-none">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Funding Options</h3>
                <p className="text-slate-600 text-sm mb-4">Explore different ways to fund your startup</p>
                <div className="flex items-center text-emerald-600 text-sm font-medium">
                  <span>4 related questions</span>
                  <ChevronDown size={16} className="ml-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default FAQPage;