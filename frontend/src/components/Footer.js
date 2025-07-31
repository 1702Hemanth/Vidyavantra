import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="ml-2 text-xl font-bold">Vidyavantra</span>
            </div>
            <p className="text-slate-300 mb-4">
              Empowering careers and startups through expert guidance, resources, and community support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/tutorials" className="text-slate-300 hover:text-emerald-400 transition-colors">Tutorials</Link></li>
              <li><Link to="/news" className="text-slate-300 hover:text-emerald-400 transition-colors">Career News</Link></li>
              <li><Link to="/faq" className="text-slate-300 hover:text-emerald-400 transition-colors">FAQ</Link></li>
              <li><Link to="/chatbot" className="text-slate-300 hover:text-emerald-400 transition-colors">AI Assistant</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-slate-300">Career Guidance</span></li>
              <li><span className="text-slate-300">Startup Mentoring</span></li>
              <li><span className="text-slate-300">Job Recommendations</span></li>
              <li><span className="text-slate-300">Skill Development</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center text-slate-300">
                <Mail size={16} className="mr-2" />
                hello@vidyavantra.com
              </div>
              <div className="flex items-center text-slate-300">
                <Phone size={16} className="mr-2" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center text-slate-300">
                <MapPin size={16} className="mr-2" />
                San Francisco, CA
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2025 Vidyavantra. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;