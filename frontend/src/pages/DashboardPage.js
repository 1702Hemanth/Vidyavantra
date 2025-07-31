import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Briefcase, 
  BookOpen, 
  Newspaper, 
  HelpCircle, 
  LogOut,
  Calendar,
  Star,
  Clock,
  MapPin,
  DollarSign,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import { useAuth } from '../contexts/AuthContext';
import { mockJobs, mockNews } from '../../mock';

const DashboardPage = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { icon: User, label: 'Profile', href: '/dashboard', active: true },
    { icon: Briefcase, label: 'Job Recommendations', href: '#jobs' },
    { icon: BookOpen, label: 'Startup Tutorials', href: '/tutorials' },
    { icon: Newspaper, label: 'Career News', href: '/news' },
    { icon: HelpCircle, label: 'FAQ', href: '/faq' },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-slate-900 text-white">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <span className="ml-2 text-xl font-bold">Vidyavantra</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-emerald-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon size={20} className="mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 fixed h-full">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 h-full">
            <SidebarContent />
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md hover:bg-slate-100"
                >
                  <Menu size={24} />
                </button>
                <h1 className="text-2xl font-bold text-slate-900 ml-2 lg:ml-0">Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-slate-600">Welcome back, {user?.name || 'User'}!</span>
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Welcome Card */}
          <Card className="mb-8 bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-none">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'User'}!</h2>
                  <p className="text-emerald-100 text-lg">
                    Ready to take the next step in your career journey?
                  </p>
                  <div className="flex space-x-4 mt-4 text-sm">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      Joined {new Date(user?.joinDate || Date.now()).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <BookOpen size={16} className="mr-2" />
                      3 Tutorials Completed
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                    alt="Welcome"
                    className="w-32 h-32 rounded-full border-4 border-white/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="text-blue-600" size={24} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Job Recommendations</h3>
                <p className="text-slate-600 text-sm mb-4">5 new matches</p>
                <Button size="sm" variant="outline" className="w-full">View Jobs</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-emerald-600" size={24} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Startup Tutorials</h3>
                <p className="text-slate-600 text-sm mb-4">4 lessons available</p>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link to="/tutorials">Start Learning</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Newspaper className="text-orange-600" size={24} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Career News</h3>
                <p className="text-slate-600 text-sm mb-4">Latest updates</p>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link to="/news">Read News</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="text-purple-600" size={24} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">FAQs</h3>
                <p className="text-slate-600 text-sm mb-4">Get quick answers</p>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link to="/faq">Browse FAQ</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Job Recommendations */}
            <Card id="jobs">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2" size={20} />
                  Recommended Jobs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockJobs.slice(0, 3).map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-slate-900">{job.title}</h4>
                        <Badge variant="secondary">{job.type}</Badge>
                      </div>
                      <p className="text-slate-600 mb-2">{job.company}</p>
                      <div className="flex items-center text-sm text-slate-500 mb-3">
                        <MapPin size={14} className="mr-1" />
                        <span className="mr-4">{job.location}</span>
                        <DollarSign size={14} className="mr-1" />
                        <span className="mr-4">{job.salary}</span>
                        <Clock size={14} className="mr-1" />
                        <span>{job.posted}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" className="w-full">Apply Now</Button>
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link to="/jobs">View All Jobs <ArrowRight size={16} className="ml-2" /></Link>
                </Button>
              </CardContent>
            </Card>

            {/* Latest News */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Newspaper className="mr-2" size={20} />
                  Latest News
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNews.slice(0, 3).map((article) => (
                    <div key={article.id} className="flex space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <Badge variant="secondary" className="text-xs mb-1">
                          {article.category}
                        </Badge>
                        <h4 className="font-medium text-slate-900 text-sm leading-tight mb-1">
                          {article.title}
                        </h4>
                        <p className="text-xs text-slate-500">{article.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link to="/news">Read All News <ArrowRight size={16} className="ml-2" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  );
};

export default DashboardPage;