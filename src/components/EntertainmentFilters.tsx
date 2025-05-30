import React from 'react';
import { useBookContext } from '../context/BookContext';

const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian', 'Arabic'];
const genres = ['Fiction', 'Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 'Romance', 'Horror', 'Biography'];
const authors = ['J.K. Rowling', 'Stephen King', 'George R.R. Martin', 'Jane Austen', 'Agatha Christie', 'Ernest Hemingway'];

const EntertainmentFilters: React.FC = () => {
  const { searchFilters, setSearchFilters } = useBookContext();

  const handleFilterChange = (filterType: string, value: string) => {
    setSearchFilters({
      ...searchFilters,
      [filterType]: value
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter Entertainment Books</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Language Filter */}
        <div>
          <label htmlFor="language-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            id="language-filter"
            value={searchFilters.language}
            onChange={(e) => handleFilterChange('language', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Languages</option>
            {languages.map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>
        
        {/* Genre Filter */}
        <div>
          <label htmlFor="genre-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Genre
          </label>
          <select
            id="genre-filter"
            value={searchFilters.genre}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
        
        {/* Author Filter */}
        <div>
          <label htmlFor="author-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <select
            id="author-filter"
            value={searchFilters.author}
            onChange={(e) => handleFilterChange('author', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Authors</option>
            {authors.map(author => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentFilters;