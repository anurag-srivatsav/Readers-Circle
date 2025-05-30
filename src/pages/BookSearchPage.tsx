import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useBookContext } from '../context/BookContext';
import BookCard from '../components/BookCard';
import EntertainmentFilters from '../components/EntertainmentFilters';
import EducationalFilters from '../components/EducationalFilters';

const BookSearchPage: React.FC = () => {
  const { 
    books, 
    loading, 
    error, 
    searchBooks, 
    purpose,
    searchFilters
  } = useBookContext();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);

  // Effect to trigger search when filters change
  useEffect(() => {
    if (hasInteracted) {
      searchBooks(searchQuery);
    }
  }, [searchFilters, hasInteracted]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasInteracted(true);
    searchBooks(searchQuery);
  };

  // Initial search when purpose is selected
  useEffect(() => {
    if (purpose && !hasInteracted) {
      setHasInteracted(true);
      searchBooks();
    }
  }, [purpose]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {purpose ? `Find ${purpose === 'entertainment' ? 'Entertainment' : 'Educational'} Books` : 'Find Books'}
      </h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8">
        <div className="flex shadow-md rounded-lg overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for books by title, author, or subject (optional)..."
            className="flex-grow px-4 py-3 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 flex items-center hover:bg-blue-700 transition-colors duration-300"
          >
            <Search className="w-5 h-5 mr-2" />
            Search
          </button>
        </div>
      </form>

      {/* Filter Section */}
      <div className="mb-8">
        {purpose === 'entertainment' ? (
          <EntertainmentFilters />
        ) : purpose === 'educational' ? (
          <EducationalFilters />
        ) : (
          <div className="text-center p-6 bg-blue-50 rounded-lg max-w-3xl mx-auto">
            <p className="text-blue-700">
              Please select a purpose (Entertainment or Educational) from the home page to see relevant filters.
            </p>
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : books.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              {books.length} {books.length === 1 ? 'Book' : 'Books'} Found
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </>
        ) : hasInteracted ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No books found. Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              Use the filters above to discover books or enter a search term!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSearchPage;