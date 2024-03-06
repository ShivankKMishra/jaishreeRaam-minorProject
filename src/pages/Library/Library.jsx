import React from 'react';
import Books from './Books/Books';

export const Library = () => {
  // Example data for demonstration
  const booksData1 = [
    { title: 'Book1', path: '/src/pages/Library/Books/book/book1.pdf' },
    { title: 'Book2', path: '/src/pages/Library/Books/book/CV.pdf' },

     {title: 'computerScience', path: '/src/pages/Library/Books/book/ComputerScienceOne.pdf' },
     { title: 'computing', path: '/src/pages/Library/Books/book/FullText.pdf' }
  ];

  const booksData2 = []; // Empty books data

  return (
    <div className='flex flex'>
      <h1>Library</h1>
      <Books booksData={booksData1} />
    
    </div>
  );
};
