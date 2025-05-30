import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookSearchPage from './pages/BookSearchPage';
import BookshelfPage from './pages/BookshelfPage';
import BookDetailsPage from './pages/BookDetailsPage';
import { BookProvider } from './context/BookContext';

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<BookSearchPage />} />
              <Route path="/bookshelf" element={<BookshelfPage />} />
              <Route path="/book/:id" element={<BookDetailsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;