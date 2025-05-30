import React from 'react';
import { Link } from 'react-router-dom';
import { Star, User } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const defaultCover = 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=600';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-100">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={book.coverUrl || defaultCover} 
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
            <Star className="w-3 h-3 mr-1" />
            {book.rating}
          </div>
          <div className="ml-2 text-xs text-gray-500">
            {book.publishYear}
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-1 text-gray-800 line-clamp-1">{book.title}</h3>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <User className="w-3 h-3 mr-1" />
          <p className="line-clamp-1">{book.author}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {book.language && (
            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
              {book.language}
            </span>
          )}
          {book.subject && (
            <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">
              {book.subject}
            </span>
          )}
        </div>
        
        <Link 
          to={`/book/${book.id}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;