import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-blue-600 transition-all duration-300 hover:text-blue-700"
          >
            <BookOpen className="w-8 h-8" />
            <span className="text-xl font-bold">Readers Circle</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors duration-300 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`font-medium transition-colors duration-300 ${
                isActive('/search') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Find Books
            </Link>
            <Link 
              to="/bookshelf" 
              className={`font-medium transition-colors duration-300 ${
                isActive('/bookshelf') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Donation Shelf
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600 focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-2 flex flex-col space-y-4 border-t border-gray-100">
            <Link 
              to="/" 
              className={`font-medium transition-colors duration-300 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`font-medium transition-colors duration-300 ${
                isActive('/search') ? 'text-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Find Books
            </Link>
            <Link 
              to="/bookshelf" 
              className={`font-medium transition-colors duration-300 ${
                isActive('/bookshelf') ? 'text-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Donation Shelf
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;