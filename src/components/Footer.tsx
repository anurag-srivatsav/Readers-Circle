import React from 'react';
import { Heart, Github as GitHub, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">BookBridge</h3>
            <p className="text-gray-300 text-sm">
              Connecting readers and sharing knowledge with those who need it most.
              Our mission is to make books accessible to everyone.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="/" className="hover:text-blue-400 transition-colors duration-300">Home</a></li>
              <li><a href="/search" className="hover:text-blue-400 transition-colors duration-300">Find Books</a></li>
              <li><a href="/bookshelf" className="hover:text-blue-400 transition-colors duration-300">Donation Shelf</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 text-sm mb-4">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <GitHub className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm flex items-center justify-center">
          <p>Made with</p>
          <Heart className="w-4 h-4 mx-1 text-red-500" />
          <p>by BookBridge Team © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;