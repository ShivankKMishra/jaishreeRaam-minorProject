import React from 'react';

const ClassSelectionPopup = ({ classes, handleClassSelect }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select Class</h2>
        <ul>
          {classes.map((classItem) => (
            <li key={classItem.id}>
              <button onClick={() => handleClassSelect(classItem)}>
                {classItem.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassSelectionPopup;
