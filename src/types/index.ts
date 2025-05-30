export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string | null;
  publishYear: string | number;
  language: string;
  subject: string;
  rating: string;
  reviews: Review[];
}

export interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

export interface DonatedBook {
  id: string;
  title: string;
  donorName: string;
  contactNumber: string;
  address: string;
  createdAt: string;
}

export interface SearchFilters {
  language: string;
  genre: string;
  author: string;
  course: string;
  subject: string;
}