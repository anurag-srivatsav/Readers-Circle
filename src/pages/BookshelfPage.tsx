import React, { useState } from 'react';
import { useBookContext } from '../context/BookContext';
import { DonatedBook } from '../types';
import { BookPlus, Search, MapPin, Phone, User } from 'lucide-react';

const BookshelfPage: React.FC = () => {
  const { donatedBooks, addDonatedBook } = useBookContext();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newBook, setNewBook] = useState({
    title: '',
    donorName: '',
    contactNumber: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBook({
      ...newBook,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const book: DonatedBook = {
      ...newBook,
      id: `donated-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    addDonatedBook(book);
    
    // Reset form
    setNewBook({
      title: '',
      donorName: '',
      contactNumber: '',
      address: '',
    });
    
    setIsFormOpen(false);
  };

  const filteredBooks = donatedBooks.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Community Bookshelf</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse books available for donation or share your books with others who can't afford buying new ones.
            Help spread knowledge and make education accessible to everyone.
          </p>
        </div>

        {/* Search and Add Button */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search books by title, donor, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            />
          </div>
          
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center whitespace-nowrap"
          >
            <BookPlus className="w-5 h-5 mr-2" />
            Donate a Book
          </button>
        </div>

        {/* Donation Form */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Donate a Book</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Book Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="donorName" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name*
                  </label>
                  <input
                    type="text"
                    id="donorName"
                    name="donorName"
                    value={newBook.donorName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number*
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={newBook.contactNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address*
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={newBook.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    This will be visible to others. Include enough detail for someone to know if they can easily collect the book.
                  </p>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Donate Book
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Books List */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Available Books for Donation
            {filteredBooks.length > 0 && <span className="text-lg font-normal text-gray-500 ml-2">({filteredBooks.length})</span>}
          </h2>
          
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{book.title}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <User className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">{book.donorName}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">{book.contactNumber}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                      <span className="text-gray-700">{book.address}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Listed on: {new Date(book.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <BookPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">No books available for donation yet</p>
              <p className="text-gray-500">
                {searchQuery ? 'Try a different search term or ' : ''}
                Be the first to donate a book!
              </p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Donate a Book
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookshelfPage;