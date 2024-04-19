import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import deleteClass from '../../../class/DeleteClass/deleteClass'; // Import deleteClass function

function Cards({ classes, deleteClass, setClasses }) {
  const handleDelete = (class_id, creatorUid) => {
    deleteClass(class_id, creatorUid, classes, setClasses);
  };

  return (
    <div className="grid grid-cols-3 gap-4 m-16">
      {classes.map((classData) => (
        <div key={classData.id} className="border border-gray-300 rounded-md p-4 bg-orange-300 rounded-lg">
          {/* Render the content of each card here */}
          <h2 className="text-lg font-semibold bg-slate-700  rounded-lg flex justify-center text-white">{classData.name}</h2>
          <p>Subject: {classData.subjectName}</p>
          <p>Year: {classData.year}</p>
          <p>Semester: {classData.semester}</p>
          <p>Section: {classData.section}</p>
          <div>
            <button onClick={() => handleDelete(classData.id, classData.creatorUid)}>
              <DeleteIcon />
            </button>
          </div>
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
}

export default Cards;
