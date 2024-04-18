import React, { useState, useEffect } from "react";
import { getFirestore, collection, onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";

function ChatDisplay() {
  const db = getFirestore();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [solution, setSolution] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const unsubscribe = onSnapshot(
          collection(db, "messages"),
          (snapshot) => {
            const messagesData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setMessages(messagesData);
            setLoading(false);
          }
        );

        return () => unsubscribe();
      } catch (err) {
        console.error("Error fetching messages:", err);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [db]);

  const handleSolutionSubmit = async (messageId) => {
    try {
      const messageRef = doc(db, "messages", messageId);
      await updateDoc(messageRef, {
        solutions: arrayUnion(solution),
      });
      console.log("Solution added successfully!");
      setSolution("");
    } catch (err) {
      console.error("Error adding solution:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((message) => (
            <li key={message.id} className="bg-gray-100 p-4 rounded-md">
              <p className="text-lg">{message.message}</p>
              <p className="text-gray-500 mt-2">
                Posted on {message.timestamp ? `at ${message.timestamp.toDate().toLocaleString()}` : ""}
              </p>
              {message.solutions && message.solutions.length > 0 ? (
                <div>
                  <p className="text-green-500 mt-2">Solutions:</p>
                  <ul>
                    {message.solutions.map((solution, index) => (
                      <li key={index} className="text-gray-500">{solution}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mt-2">
                  <input
                    type="text"
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="Enter solution"
                    className="block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleSolutionSubmit(message.id)}
                    className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Submit Solution
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ChatDisplay;
