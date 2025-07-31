import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Users, BookOpen, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import { mockNews, mockTestimonials } from '../mock';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const heroSlides = [
    {
      title: "Dream. Build. Succeed",
      subtitle: "with Vidyavantra",
      description: "Your comprehensive platform for career growth and startup success",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop"
    },
    {
      title: "Launch Your Startup",
      subtitle: "with Expert Guidance",
      description: "From idea validation to funding - we've got you covered",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=500&fit=crop"
    },
    {
      title: "Accelerate Your Career",
      subtitle: "with AI-Powered Insights",
      description: "Get personalized job recommendations and skill development paths",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop"
    }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % mockTestimonials.length);
    }, 4000);

    return () => {
      clearInterval(slideTimer);
      clearInterval(testimonialTimer);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Slideshow */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroSlides[currentSlide].image}
            alt="Hero background"
            className="w-full h-full object-cover transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40"></div>
        </div>
        
        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-in fade-in duration-1000">
                {heroSlides[currentSlide].title}
              </h1>
              <h2 className="text-3xl md:text-5xl font-semibold text-emerald-400 mb-6 animate-in fade-in duration-1000 delay-200">
                {heroSlides[currentSlide].subtitle}
              </h2>
              <p className="text-xl text-slate-200 mb-8 animate-in fade-in duration-1000 delay-400">
                {heroSlides[currentSlide].description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in duration-1000 delay-600">
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-4">
                  <Link to="/register">Get Started <ArrowRight className="ml-2" size={20} /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-slate-900 text-lg px-8 py-4">
                  <Link to="/tutorials">Explore Tutorials</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-emerald-400 transition-colors z-10"
        >
          <ChevronLeft size={48} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-emerald-400 transition-colors z-10"
        >
          <ChevronRight size={48} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-emerald-400' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Vidyavantra?</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We provide comprehensive guidance and resources to accelerate your career and startup journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow duration-300 border-none bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">Career Growth</h3>
                <p className="text-slate-600 mb-6">
                  Get personalized career advice, skill recommendations, and job opportunities tailored to your goals.
                </p>
                <Button asChild variant="outline">
                  <Link to="/dashboard">Explore Jobs</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300 border-none bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">Startup Guidance</h3>
                <p className="text-slate-600 mb-6">
                  From idea validation to funding, learn everything you need to build a successful startup.
                </p>
                <Button asChild variant="outline">
                  <Link to="/tutorials">Start Learning</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300 border-none bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">AI Assistant</h3>
                <p className="text-slate-600 mb-6">
                  Get instant answers and personalized guidance from our AI-powered career and startup assistant.
                </p>
                <Button asChild variant="outline">
                  <Link to="/chatbot">Chat Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Latest Career & Startup News</h2>
            <p className="text-xl text-slate-600">Stay updated with the latest trends and opportunities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockNews.slice(0, 3).map((article) => (
              <Card key={article.id} className="hover:shadow-xl transition-shadow duration-300 border-none overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="text-sm text-emerald-600 font-medium mb-2">{article.category}</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{article.title}</h3>
                  <p className="text-slate-600 mb-4">{article.excerpt}</p>
                  <div className="text-sm text-slate-500">{article.date}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/news">View All News <ArrowRight className="ml-2" size={20} /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-emerald-100">Students Guided</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-emerald-100">Startups Launched</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-emerald-100">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-emerald-100">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Success Stories</h2>
            <p className="text-xl text-slate-600">Hear from our community of successful entrepreneurs and professionals</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-none bg-white shadow-xl">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={24} />
                  ))}
                </div>
                <blockquote className="text-xl text-slate-700 mb-8 italic">
                  "{mockTestimonials[currentTestimonial].content}"
                </blockquote>
                <div className="flex items-center justify-center">
                  <img
                    src={mockTestimonials[currentTestimonial].image}
                    alt={mockTestimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{mockTestimonials[currentTestimonial].name}</div>
                    <div className="text-slate-600">{mockTestimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Future?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Join thousands of successful professionals and entrepreneurs who have accelerated their careers with Vidyavantra
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-4">
              <Link to="/register">Start Your Journey <ArrowRight className="ml-2" size={20} /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-slate-900 text-lg px-8 py-4">
              <Link to="/chatbot">Talk to AI Assistant</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default HomePage;