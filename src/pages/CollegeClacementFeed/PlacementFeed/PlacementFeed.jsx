import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import PlacementFeedDisplay from './placementFeeddataToShow/PlacementFeedDisplay';

function PlacementFeed() {
  const auth = getAuth();
  const db = getFirestore();

  const [user] = useAuthState(auth);
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Add a new document to the "Placement-feed" collection
      await addDoc(collection(db, "Placement-feed"), {
        authorUid: user.uid,
        content: content,
        createdAt: new Date(),
      });

      // Clear the input field after submission
      setContent("");

      // Handle success, show message, etc.
      alert("Placement feed posted successfully!");
    } catch (err) {
      // Handle error
      alert(`Cannot post placement feed - ${err.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Placement Feed</h2>
      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter placement feed content"
            rows={4}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Post Placement Feed
          </button>
          <button
            onClick={() => setShowForm(false)} // Hide the form when this button is clicked
            className="mt-2 w-full bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)} // Show the form when this button is clicked
          className="w-24 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          New Post
        </button>
      )}
      <PlacementFeedDisplay />
    </div>
  );
}

export default PlacementFeed;
