import React from 'react';
import { useBookContext } from '../context/BookContext';

const courses = ['Computer Science', 'Engineering', 'Medicine', 'Business', 'Law', 'Arts', 'Humanities', 'Sciences'];
const subjects = [
  'Programming', 'Data Structures', 'Algorithms', 'Physics', 'Chemistry', 
  'Biology', 'Anatomy', 'Economics', 'Finance', 'Literature', 'History', 'Mathematics'
];

const EducationalFilters: React.FC = () => {
  const { searchFilters, setSearchFilters } = useBookContext();

  const handleFilterChange = (filterType: string, value: string) => {
    setSearchFilters({
      ...searchFilters,
      [filterType]: value
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter Educational Books</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Course Filter */}
        <div>
          <label htmlFor="course-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Course/Field of Study
          </label>
          <select
            id="course-filter"
            value={searchFilters.course}
            onChange={(e) => handleFilterChange('course', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Courses</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
        
        {/* Subject Filter */}
        <div>
          <label htmlFor="subject-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <select
            id="subject-filter"
            value={searchFilters.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default EducationalFilters;