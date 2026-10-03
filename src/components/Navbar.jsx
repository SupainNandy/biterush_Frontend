import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Utensils, Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${
      scrolled 
        ? 'bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-800/80 py-3 shadow-2xl' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
              <Utensils className="text-white w-5 h-5" />
            </div>
            <span className="text-white text-xl font-bold tracking-tight">
              Bite<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Rush</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 bg-neutral-800/40 backdrop-blur-md px-6 py-2 rounded-full border border-neutral-700/40">
            <button onClick={() => scrollToSection('hero')} className="text-sm font-medium text-neutral-300 hover:text-orange-400 transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => scrollToSection('categories')} className="text-sm font-medium text-neutral-300 hover:text-orange-400 transition-colors cursor-pointer">
              Menu
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium text-neutral-300 hover:text-orange-400 transition-colors cursor-pointer">
              How It Works
            </button>
            <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-neutral-300 hover:text-orange-400 transition-colors cursor-pointer">
              Features
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-sm font-medium text-neutral-300 hover:text-orange-400 transition-colors cursor-pointer">
              Reviews
            </button>
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/signin" 
              className="text-sm font-semibold text-neutral-300 hover:text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-all"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-bold rounded-full transition-all shadow-lg shadow-orange-500/25 flex items-center gap-1.5 transform hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-900/95 backdrop-blur-2xl border-b border-neutral-800 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <button onClick={() => scrollToSection('hero')} className="block w-full text-left text-neutral-300 hover:text-white font-medium py-1">Home</button>
          <button onClick={() => scrollToSection('categories')} className="block w-full text-left text-neutral-300 hover:text-white font-medium py-1">Menu</button>
          <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left text-neutral-300 hover:text-white font-medium py-1">How It Works</button>
          <button onClick={() => scrollToSection('features')} className="block w-full text-left text-neutral-300 hover:text-white font-medium py-1">Features</button>
          <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left text-neutral-300 hover:text-white font-medium py-1">Reviews</button>
          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
            <Link to="/signin" className="w-full text-center py-2.5 text-neutral-300 hover:text-white font-semibold rounded-xl bg-neutral-800/60">Sign In</Link>
            <Link to="/signup" className="w-full text-center py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
