import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import DeleteIcon from '@mui/icons-material/Delete';
import CoPresentIcon from '@mui/icons-material/CoPresent';
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

            <Link to={`/Home/ClassRoom/${classData.id}`} >
            <button className=" text-white m-1 bg-slate-700 border  rounded-full border-slate-700 p-1">
              <CoPresentIcon/>
            </button>
            </Link>

            
            
            <button className=" text-white m-1 bg-slate-700 border  rounded-full border-slate-700 p-1" onClick={() => handleDelete(classData.id, classData.creatorUid)}>
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
