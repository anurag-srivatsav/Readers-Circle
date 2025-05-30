import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ExternalLink, User, Calendar, BookOpen, Globe } from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import { Book, Review } from '../types';

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { books, loading, error, searchBooks } = useBookContext();
  const [book, setBook] = useState<Book | null>(null);
  const [newReview, setNewReview] = useState<Omit<Review, 'id' | 'date'>>({
    username: '',
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    // Try to find the book in the current state first
    const foundBook = books.find(b => b.id === id);
    if (foundBook) {
      setBook(foundBook);
    } else if (id) {
      // If not found, fetch the book by ID
      searchBooks(id);
    }
  }, [id, books]);

  // Set the book once the search results are updated
  useEffect(() => {
    if (!loading && books.length > 0) {
      const foundBook = books.find(b => b.id === id);
      if (foundBook) {
        setBook(foundBook);
      }
    }
  }, [loading, books, id]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!book) return;
    
    const review: Review = {
      ...newReview,
      id: `review-${Date.now()}`,
      date: new Date().toISOString(),
    };
    
    // Update the book with the new review
    const updatedBook = {
      ...book,
      reviews: [...book.reviews, review],
    };
    
    setBook(updatedBook);
    
    // Reset the form
    setNewReview({
      username: '',
      rating: 5,
      comment: '',
    });
  };

  const defaultCover = 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=600';

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-red-600 mb-4">{error}</div>
        <Link to="/search" className="text-blue-600 hover:underline">
          Return to search
        </Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-gray-600 mb-4">Book not found</div>
        <Link to="/search" className="text-blue-600 hover:underline">
          Return to search
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/search" className="text-blue-600 hover:underline flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Search
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="md:flex">
          {/* Book Cover and Details */}
          <div className="md:w-1/3 p-6">
            <div className="rounded-lg overflow-hidden shadow-md mb-6 max-w-xs mx-auto">
              <img 
                src={book.coverUrl || defaultCover} 
                alt={`Cover of ${book.title}`}
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Book Details</h3>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm">Author: {book.author}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">Published: {book.publishYear}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <Globe className="w-4 h-4 mr-2" />
                  <span className="text-sm">Language: {book.language}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span className="text-sm">Subject: {book.subject}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <a 
                  href={`https://openlibrary.org/works/${book.id}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Open Library
                </a>
              </div>
            </div>
          </div>
          
          {/* Book Content and Reviews */}
          <div className="md:w-2/3 p-6 border-t md:border-t-0 md:border-l border-gray-100">
            <div className="flex items-center mb-2">
              <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                <Star className="w-4 h-4 mr-1" />
                {book.rating}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{book.title}</h1>
            
            <div className="prose max-w-none mb-8">
              <p className="text-gray-600">
                This book is part of the {book.subject} category and was written by {book.author}.
                It was first published in {book.publishYear} and is available in {book.language}.
              </p>
            </div>
            
            <div className="border-t border-gray-100 pt-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Reviews</h2>
              
              {book.reviews.length > 0 ? (
                <div className="space-y-6 mb-8">
                  {book.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-800">{review.username}</div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span>{review.rating}/5</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                      <div className="text-xs text-gray-500 mt-2">
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-8">No reviews yet. Be the first to review this book!</p>
              )}
              
              {/* Review Form */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Write a Review</h3>
                
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={newReview.username}
                      onChange={(e) => setNewReview({ ...newReview, username: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                      Rating
                    </label>
                    <select
                      id="rating"
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value={5}>5 - Excellent</option>
                      <option value={4}>4 - Very Good</option>
                      <option value={3}>3 - Good</option>
                      <option value={2}>2 - Fair</option>
                      <option value={1}>1 - Poor</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Review
                    </label>
                    <textarea
                      id="comment"
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;