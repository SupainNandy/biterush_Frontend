import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 top-0 bg-neutral-900/50 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <Utensils className="text-orange-500 w-8 h-8" />
            <span className="text-white text-xl font-bold tracking-tight">FoodieExpress</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/signin" className="text-neutral-300 hover:text-white transition-colors font-medium">Log In</Link>
            <Link to="/signup" className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full font-semibold transition-all shadow-lg shadow-orange-500/25">Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
