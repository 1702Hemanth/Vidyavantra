import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Home, BookOpen, MessageCircle, HelpCircle, Newspaper } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick || (() => setIsOpen(false))}
      className="text-slate-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="ml-2 text-xl font-bold text-slate-800">Vidyavantra</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/"><Home size={16} />Home</NavLink>
            <NavLink to="/news"><Newspaper size={16} />News</NavLink>
            <NavLink to="/tutorials"><BookOpen size={16} />Tutorials</NavLink>
            <NavLink to="/faq"><HelpCircle size={16} />FAQ</NavLink>
            <NavLink to="/chatbot"><MessageCircle size={16} />Chat</NavLink>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <NavLink to="/dashboard"><User size={16} />Dashboard</NavLink>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <LogOut size={16} />Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-slate-900 focus:outline-none focus:text-slate-900 transition duration-150 ease-in-out"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/"><Home size={16} />Home</NavLink>
            <NavLink to="/news"><Newspaper size={16} />News</NavLink>
            <NavLink to="/tutorials"><BookOpen size={16} />Tutorials</NavLink>
            <NavLink to="/faq"><HelpCircle size={16} />FAQ</NavLink>
            <NavLink to="/chatbot"><MessageCircle size={16} />Chat</NavLink>
            
            {user ? (
              <>
                <NavLink to="/dashboard"><User size={16} />Dashboard</NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-slate-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <LogOut size={16} />Logout
                </button>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-3 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-3 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;