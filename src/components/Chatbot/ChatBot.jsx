import React, { useState } from "react";

function ChatBot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const generateAnswer = async (e) => {
    e.preventDefault();
    setGeneratingAnswer(true);
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyApzJeI62wSuJTc4sYdDirPfX4WYETQO8o`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: "Give answer in 3 lines only\n" + question }] } // Concatenate the predefined prompt and the user's question
          ],
        }),
      });
      const data = await response.json();
      let generatedAnswer = data.candidates[0].content.parts[0].text;
      // Limit the answer to 10 lines
      generatedAnswer = generatedAnswer.split('\n').slice(0, 10).join('\n');
      setAnswer(generatedAnswer);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
    setGeneratingAnswer(false);
  };

  return (
    <div className="chat-bot bg-white rounded-lg shadow-md p-4">
      <div className="conversation">
        {answer && (
          <div className="message received bg-blue-100 text-blue-900 p-2 rounded-lg mb-2">
            <span className="text">{answer}</span>
          </div>
        )}
        <form onSubmit={generateAnswer} className="message sent flex items-center">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            disabled={generatingAnswer}
            className="flex-grow border rounded-l-md p-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button type="submit" disabled={generatingAnswer} className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring focus:border-blue-300">
            {generatingAnswer ? "Generating..." : "Ask"}
          </button>
        </form>
      </div>
    </div>
  );
}

function ChatButton() {
  const [showChatBot, setShowChatBot] = useState(false);

  const toggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    <div className="chat-button fixed bottom-4 right-4">
      <button className="round-button bg-blue-500 text-white text-xl w-12 h-12 flex items-center justify-center rounded-full shadow-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring focus:border-blue-300" onClick={toggleChatBot}>
        ?
      </button>
      {showChatBot && (
        <div className="chat-popup absolute bottom-20 right-4">
          <ChatBot />
        </div>
      )}
    </div>
  );
}

export default ChatButton;
