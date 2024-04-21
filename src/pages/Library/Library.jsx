import React from 'react';
import Books from './Books/Books';

export const Library = () => {
  // Example data for demonstration
  const booksData1 = [
    { title: 'Book1', path: '/src/pages/Library/Books/book/book1.pdf' },
    { title: 'Book2', path: '/src/pages/Library/Books/book/CV.pdf' },
    { title: 'computerScience', path: '/src/pages/Library/Books/book/ComputerScienceOne.pdf' },
    { title: 'computing', path: '/src/pages/Library/Books/book/FullText.pdf' }
  ];

  const booksData2 = []; // Empty books data

  return (
    <div className='library'>
      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8 text-center">Library</h1>
      <div className="flex flex-col items-center justify-center">
        {/* Display books using flexbox */}
        <Books booksData={booksData1} />
      </div>
    </div>
  );
};
