import React, { useState } from 'react';

const Books = ({ booksData }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleCardClick = (book) => {
    setSelectedBook(book);
    setIsPopupOpen(true);
  };

  return (
    <>
      <div className='grid grid-cols-4 gap-4'>
        {booksData && booksData.length > 0 ? (
          booksData.map((book, index) => (
            <div
              className='bg-gray-300 rounded-xl flex items-center justify-center cursor-pointer'
              key={index}
              onClick={() => handleCardClick(book)}
            >
              <h3 className='text-center'>{book.title}</h3>
            </div>
          ))
        ) : (
          <p className='text-center col-span-full'>No books available</p>
        )}
      </div>
      {isPopupOpen && selectedBook && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-10'>
          <div className='bg-white p-4 rounded-lg'>
            <button
              className='absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full'
              onClick={() => setIsPopupOpen(false)}
            >
              X
            </button>
            <iframe src={selectedBook.path} className='w-screen h-screen' />
          </div>
        </div>
      )}
    </>
  );
};

export default Books;
