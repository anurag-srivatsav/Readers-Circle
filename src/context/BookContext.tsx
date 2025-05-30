import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book, DonatedBook, SearchFilters } from '../types';

interface BookContextType {
  books: Book[];
  donatedBooks: DonatedBook[];
  loading: boolean;
  error: string | null;
  searchFilters: SearchFilters;
  purpose: 'entertainment' | 'educational' | null;
  setBooks: (books: Book[]) => void;
  setDonatedBooks: (books: DonatedBook[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPurpose: (purpose: 'entertainment' | 'educational' | null) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  addDonatedBook: (book: DonatedBook) => void;
  searchBooks: (query?: string) => Promise<void>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [donatedBooks, setDonatedBooks] = useState<DonatedBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [purpose, setPurpose] = useState<'entertainment' | 'educational' | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    language: '',
    genre: '',
    author: '',
    course: '',
    subject: '',
  });

  const addDonatedBook = (book: DonatedBook) => {
    setDonatedBooks((prev) => [...prev, book]);
    localStorage.setItem('donatedBooks', JSON.stringify([...donatedBooks, book]));
  };

  const buildSearchQuery = (baseQuery?: string) => {
    let queryParts: string[] = [];
    
    if (baseQuery?.trim()) {
      queryParts.push(baseQuery.trim());
    }

    if (purpose === 'entertainment') {
      if (searchFilters.language) {
        queryParts.push(`language:${searchFilters.language}`);
      }
      if (searchFilters.genre) {
        queryParts.push(`subject:${searchFilters.genre}`);
      }
      if (searchFilters.author) {
        queryParts.push(`author:${searchFilters.author}`);
      }
    } else if (purpose === 'educational') {
      if (searchFilters.course) {
        queryParts.push(`subject:${searchFilters.course}`);
      }
      if (searchFilters.subject) {
        queryParts.push(`subject:${searchFilters.subject}`);
      }
    }

    // If no query parts, use a wildcard search
    if (queryParts.length === 0) {
      queryParts.push('*');
    }

    return queryParts.join(' ');
  };

  const searchBooks = async (query?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const finalQuery = buildSearchQuery(query);
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(finalQuery)}&limit=50`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data = await response.json();
      
      const transformedBooks: Book[] = data.docs
        .filter((doc: any) => {
          // Apply filters based on purpose
          if (purpose === 'entertainment') {
            const matchesLanguage = !searchFilters.language || 
              (doc.language && doc.language.some((lang: string) => 
                lang.toLowerCase().includes(searchFilters.language.toLowerCase())));
            const matchesGenre = !searchFilters.genre || 
              (doc.subject && doc.subject.some((sub: string) => 
                sub.toLowerCase().includes(searchFilters.genre.toLowerCase())));
            const matchesAuthor = !searchFilters.author || 
              (doc.author_name && doc.author_name.some((author: string) => 
                author.toLowerCase().includes(searchFilters.author.toLowerCase())));
            
            return matchesLanguage && matchesGenre && matchesAuthor;
          } else if (purpose === 'educational') {
            const matchesCourse = !searchFilters.course || 
              (doc.subject && doc.subject.some((sub: string) => 
                sub.toLowerCase().includes(searchFilters.course.toLowerCase())));
            const matchesSubject = !searchFilters.subject || 
              (doc.subject && doc.subject.some((sub: string) => 
                sub.toLowerCase().includes(searchFilters.subject.toLowerCase())));
            
            return matchesCourse && matchesSubject;
          }
          return true;
        })
        .map((doc: any) => ({
          id: doc.key?.replace('/works/', '') || '',
          title: doc.title || 'Unknown Title',
          author: doc.author_name?.[0] || 'Unknown Author',
          coverUrl: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
          publishYear: doc.first_publish_year || 'Unknown',
          language: doc.language?.[0] || 'Unknown',
          subject: doc.subject?.[0] || 'Unknown',
          rating: (Math.random() * 4 + 1).toFixed(1),
          reviews: [],
        }));
      
      setBooks(transformedBooks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const storedBooks = localStorage.getItem('donatedBooks');
    if (storedBooks) {
      setDonatedBooks(JSON.parse(storedBooks));
    }
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        donatedBooks,
        loading,
        error,
        purpose,
        searchFilters,
        setBooks,
        setDonatedBooks,
        setLoading,
        setError,
        setPurpose,
        setSearchFilters,
        addDonatedBook,
        searchBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};