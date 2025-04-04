import React, { useState } from 'react';
import './styles/Chatbot.css';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const questionsAndAnswers = {
    'How do I pay my fines?': 'You can pay your fines online through the payment portal on our website.',
    'What documents can I download after paying fines?': 'You can download clearance certificates and receipts after paying your fines.',
    'Who do I contact for more help?': 'You can contact our support team at support@cfms.com for more help.'
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    const userMessage = input.trim();
    if (!userMessage) return;

    setConversation((prev) => [...prev, { sender: 'user', message: userMessage }]);
    setInput('');

    const botMessage = questionsAndAnswers[userMessage] || "I'm sorry, I don't have an answer for that.";
    setConversation((prev) => [...prev, { sender: 'bot', message: botMessage }]);
  };

  return (
    <div className="container chatbot-container">
      <h2 className="text-center">Chatbot</h2>
      <div className="chat-window">
        {conversation.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.sender}`}>
            {chat.message}
          </div>
        ))}
      </div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your question here..."
        />
        <button className="btn btn-primary" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;