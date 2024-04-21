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
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {booksData && booksData.length > 0 ? (
          booksData.map((book, index) => (
            <div
              className='bg-gray-300 rounded-xl cursor-pointer overflow-hidden'
              key={index}
              onClick={() => handleCardClick(book)}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <h3 className='text-center text-lg'>{book.title}</h3>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center col-span-full'>No books available</p>
        )}
      </div>
      {isPopupOpen && selectedBook && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-10'>
          <div className='bg-white p-4 rounded-lg w-full h-full md:max-w-lg'>
            <button
              className='absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full'
              onClick={() => setIsPopupOpen(false)}
            >
              X
            </button>
            <iframe src={selectedBook.path} className='w-full h-full' />
          </div>
        </div>
      )}
    </>
  );
};

export default Books;
