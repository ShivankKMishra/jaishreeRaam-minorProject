import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Import AnnotationLayer styles
import 'react-pdf/dist/esm/Page/TextLayer.css'; // Import TextLayer styles

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Books = ({ booksData }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleCardClick = (book) => {
    setSelectedBook(book);
    setIsPopupOpen(true);
  };

  return (
    <div>
      <h2>Books</h2>
      {booksData && booksData.length > 0 ? (
        booksData.map((book, index) => (
          <div className='m-10 bg-slate-500  w-32 text-white h-20 p-16 flex justify-center rounded-3xl  ' key={index} onClick={() => handleCardClick(book)} style={{ cursor: 'pointer' }}>
            <h3>{book.title}</h3>
          </div>
        ))
      ) : (
        <p>No books available</p>
      )}
      {isPopupOpen && selectedBook && (
        <div className="popup">
          <CVPopup book={selectedBook} onClose={() => setIsPopupOpen(false)} />
        </div>
      )}
    </div>
  );
};

const CVPopup = ({ book, onClose }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='popup-content flex justify-center'>
      <div className='popup-content flex justify-center flex-col'>
        <button className='bg-red-600 text-white flex justify-center w-16' onClick={onClose}>X</button>
        <iframe src={book.path} width={width > 786 ? 600 : 300} height={800} />
      </div>
    </div>
  );
};

export default Books;
