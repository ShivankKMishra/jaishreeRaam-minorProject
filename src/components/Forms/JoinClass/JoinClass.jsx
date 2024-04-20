import React, { useState } from 'react';
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getUserToken } from "../../../utils/sessionStorage/sessionStorage";
import Home from '../../../pages/Home/Home';
function JoinClass({ isOpen, onClose, updateClasses }) {
  const db = getFirestore();
  const [classId, setClassId] = useState('');
  const userToken = getUserToken();

  const handleInputChange = (event) => {
    setClassId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Update the enrolledUsers array in the class document with the user's ID
      const classRef = doc(db, 'classes', classId);
      await updateDoc(classRef, {
        enrolledUsers: arrayUnion(userToken)
      });
      // Call the updateClasses function to refresh the classes on the home page
      updateClasses();
      // Optionally, you can perform additional actions after the user joins the class
      console.log('Successfully joined class:', classId);
      onClose();
    } catch (error) {
      console.error('Error joining class:', error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl mb-4">Join a Class</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="classId" className="block text-sm font-medium text-gray-700">
                  Class ID
                </label>
                <input
                  type="text"
                  id="classId"
                  name="classId"
                  value={classId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter class ID"
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
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default JoinClass;
