import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, BookMarked } from 'lucide-react';
import { useBookContext } from '../context/BookContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setPurpose } = useBookContext();

  const handlePurposeSelection = (purpose: 'entertainment' | 'educational') => {
    setPurpose(purpose);
    navigate('/search');
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-20 px-4 text-white">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Discover, Review, and Share Books with Others
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-3xl mx-auto">
            Find the perfect book for your needs and help others access knowledge through our donation platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/search')}
              className="px-8 py-3 bg-white text-blue-700 font-medium rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Find Books
            </button>
            {/* <button 
              onClick={() => navigate('/bookshelf')}
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors duration-300"
            >
              Donate Books
            </button> */}
             <a
  href="https://Radhakrishna04-donation.hf.space"
  className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors duration-300 inline-block"
>
  Donate Booook
</a>
          </div>
        </div>
      </section>

      {/* Purpose Selection Section */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            What type of book are you looking for?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Entertainment Card */}
            <div 
              onClick={() => handlePurposeSelection('entertainment')}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Entertainment</h3>
                <p className="text-gray-600 mb-6">
                  Looking for novels, fiction, or leisure reading? Find books based on language, genre, and author preferences.
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>Browse entertainment books</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Educational Card */}
            <div 
              onClick={() => handlePurposeSelection('educational')}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                  <GraduationCap className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Educational</h3>
                <p className="text-gray-600 mb-6">
                  Need textbooks or study materials? Find educational resources based on your course and subject requirements.
                </p>
                <div className="flex items-center text-indigo-600 font-medium">
                  <span>Browse educational books</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Donation Section */}
      <section className="w-full py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Share Your Books with Others</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Have books you no longer need? List them on our donation shelf and help others who can't afford to buy new books.
              </p>
              <button 
                onClick={() => navigate('/bookshelf')}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 inline-flex items-center"
              >
                <BookMarked className="w-5 h-5 mr-2" />
                Donate Books
              </button>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-gray-800">How It Works</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-blue-600 font-medium text-sm">1</span>
                    </div>
                    <p className="text-gray-600">List your book with your contact information and location</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-blue-600 font-medium text-sm">2</span>
                    </div>
                    <p className="text-gray-600">Interested readers will contact you directly</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-blue-600 font-medium text-sm">3</span>
                    </div>
                    <p className="text-gray-600">Arrange a meeting to handover the book</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-blue-600 font-medium text-sm">4</span>
                    </div>
                    <p className="text-gray-600">Spread knowledge and help those in need!</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;