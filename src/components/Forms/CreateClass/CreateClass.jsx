import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { createDialogAtom } from "../../../utils/atom";

function CreateClass({ isOpen, onClose }) {
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "className":
        setClassName(value);
        break;
      case "subjectName":
        setSubjectName(value);
        break;
      case "year":
        setYear(value);
        break;
      case "semester":
        setSemester(value);
        break;
      case "section":
        setSection(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Add a new document to the "classes" collection
      const newClassRef = await addDoc(collection(db, "classes"), {
        creatorUid: user.uid,
        name: className,
        enrolledUsers: [user.uid], // Include the creator's ID in the enrolledUsers array
        creatorName: user.displayName,
        creatorPhoto: user.photoURL,
        posts: [],
        subjectName,
        year,
        semester,
        section,
      });

      // Handle success, close dialog, show message, etc.
      handleClose();
      // alert("Classroom created successfully!");
      navigate(0);
    } catch (err) {
      // Handle error
      alert(`Cannot create class - ${err.message}`);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl mb-4">Create a New Class</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="className" className="block text-sm font-medium text-gray-700">
                  Class Name
                </label>
                <input
                  type="text"
                  id="className"
                  name="className"
                  value={className}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter class name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subjectName" className="block text-sm font-medium text-gray-700">
                  Subject Name
                </label>
                <input
                  type="text"
                  id="subjectName"
                  name="subjectName"
                  value={subjectName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter subject name"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                    Year
                  </label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={year}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter year"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                    Semester
                  </label>
                  <input
                    type="text"
                    id="semester"
                    name="semester"
                    value={semester}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter semester"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="section" className="block text-sm font-medium text-gray-700">
                  Section
                </label>
                <input
                  type="text"
                  id="section"
                  name="section"
                  value={section}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter section"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateClass;
