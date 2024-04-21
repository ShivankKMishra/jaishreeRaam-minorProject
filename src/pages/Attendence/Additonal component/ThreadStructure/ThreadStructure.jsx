import React from 'react';

const ThreadStructure = ({ dates, handleDateClick }) => {
  return (
    <div className="flex flex-col items-center">
      {dates.map((date, index) => (
        <button key={index} onClick={() => handleDateClick(date)}>
          {date}
        </button>
      ))}
    </div>
  );
};

export default ThreadStructure;
