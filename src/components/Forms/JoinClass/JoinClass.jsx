// src/components/Forms/JoinClass/JoinClass.jsx
import React, { useState } from 'react';

function JoinClass({ isOpen, onClose }) {
  const [classCode, setClassCode] = useState('');

  const handleInputChange = (event) => {
    setClassCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can handle the form submission logic
    // For now, let's just log the class code
    console.log('Class Code:', classCode);
    // You can also close the popup after form submission
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl mb-4">Join a Class</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="classCode" className="block text-sm font-medium text-gray-700">
                  Class Code
                </label>
                <input
                  type="text"
                  id="classCode"
                  name="classCode"
                  value={classCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter class code or Link"
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
