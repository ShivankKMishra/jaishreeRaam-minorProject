import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import ChatDisplay from "./ChatDisplay/ChatDisplay";

function Chat() {
  const auth = getAuth();
  const db = getFirestore();

  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Add a new document to the "messages" collection
      await addDoc(collection(db, "messages"), {
        authorUid: user.uid,
        message: message,
        timestamp: new Date(),
      });

      // Clear the input field after submission
      setMessage("");

      // Handle success, show message, etc.
      console.log("Message sent successfully!");
    } catch (err) {
      // Handle error
      console.error(`Cannot send message - ${err.message}`);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 overflow-y-auto mr-4">
        <ChatDisplay />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-stretch w-72 p-4 bg-white border-t border-gray-200"
      >
        <h1>Ask question?</h1>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter message"
          rows={4}
          required
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Chat;
