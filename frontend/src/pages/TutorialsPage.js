import React, { useState } from 'react';
import { BookOpen, Clock, BarChart3, ChevronDown, ChevronRight, CheckCircle, Play } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import { mockTutorials } from '../mock';

const TutorialsPage = () => {
  const [openTutorials, setOpenTutorials] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});

  const toggleTutorial = (tutorialId) => {
    setOpenTutorials(prev => ({
      ...prev,
      [tutorialId]: !prev[tutorialId]
    }));
  };

  const toggleStep = (tutorialId, stepIndex) => {
    const stepKey = `${tutorialId}-${stepIndex}`;
    setCompletedSteps(prev => ({
      ...prev,
      [stepKey]: !prev[stepKey]
    }));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen size={40} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Startup Tutorials</h1>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Master the fundamentals of entrepreneurship with our comprehensive step-by-step guides
            </p>
            <div className="flex justify-center space-x-8 text-emerald-100">
              <div className="text-center">
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm">Tutorials</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">20+</div>
                <div className="text-sm">Steps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">90m</div>
                <div className="text-sm">Content</div>
              </div>
            </div>
          </div>




        </div>
      </section>

      {/* Tutorials Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {mockTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="shadow-lg border-none">
                <Collapsible 
                  open={openTutorials[tutorial.id]} 
                  onOpenChange={() => toggleTutorial(tutorial.id)}
                >
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="text-white" size={24} />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-slate-900">{tutorial.title}</CardTitle>
                            <p className="text-slate-600 mt-1">{tutorial.description}</p>
                          </div>
                        </div>
                        {openTutorials[tutorial.id] ? (
                          <ChevronDown size={24} className="text-slate-400" />
                        ) : (
                          <ChevronRight size={24} className="text-slate-400" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-4">
                        <Badge className={getDifficultyColor(tutorial.difficulty)}>
                          <BarChart3 size={14} className="mr-1" />
                          {tutorial.difficulty}
                        </Badge>
                        <div className="flex items-center text-slate-500">
                          <Clock size={14} className="mr-1" />
                          {tutorial.duration}
                        </div>
                        <div className="flex items-center text-slate-500">
                          <BookOpen size={14} className="mr-1" />
                          {tutorial.steps.length} steps
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="bg-slate-50 rounded-lg p-6">
                        <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                          <Play size={16} className="mr-2" />
                          Tutorial Steps
                        </h4>
                        <div className="space-y-3">
                          {tutorial.steps.map((step, index) => (
                            <div
                              key={index}
                              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${
                                completedSteps[`${tutorial.id}-${index}`]
                                  ? 'bg-emerald-50 border border-emerald-200'
                                  : 'bg-white hover:bg-slate-50 border border-slate-200'
                              }`}
                              onClick={() => toggleStep(tutorial.id, index)}
                            >
                              <div className="flex-shrink-0">
                                {completedSteps[`${tutorial.id}-${index}`] ? (
                                  <CheckCircle className="text-emerald-600" size={20} />
                                ) : (
                                  <div className="w-5 h-5 border-2 border-slate-300 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-semibold text-slate-500">
                                      {index + 1}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className={`font-medium ${
                                  completedSteps[`${tutorial.id}-${index}`]
                                    ? 'text-emerald-700 line-through'
                                    : 'text-slate-900'
                                }`}>
                                  {step}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-6 flex justify-between items-center">
                          <div className="text-sm text-slate-600">
                            {tutorial.steps.filter((_, index) => 
                              completedSteps[`${tutorial.id}-${index}`]
                            ).length} of {tutorial.steps.length} steps completed
                          </div>
                          <Button 
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            Start Tutorial
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Recommended Learning Path</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Follow this structured path to build your startup knowledge from foundation to funding
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-slate-300"></div>
              
              <div className="space-y-8">
                {mockTutorials.map((tutorial, index) => (
                  <div key={tutorial.id} className="relative flex items-start space-x-6">
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    
                    {/* Content */}
                    <Card className="flex-1 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-semibold text-slate-900">{tutorial.title}</h3>
                          <Badge className={getDifficultyColor(tutorial.difficulty)}>
                            {tutorial.difficulty}
                          </Badge>
                        </div>
                        <p className="text-slate-600 mb-4">{tutorial.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              {tutorial.duration}
                            </div>
                            <div className="flex items-center">
                              <BookOpen size={14} className="mr-1" />
                              {tutorial.steps.length} steps
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => toggleTutorial(tutorial.id)}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Join thousands of successful entrepreneurs who started with our tutorials
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Start First Tutorial
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900">
              Get Personalized Plan
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default TutorialsPage;