import React from 'react';
import './styles/Chatbot.css';

const Chatbot = () => {
  return (
    <div className="container chatbot-container">
      <h2 className="text-center">Chatbot</h2>
      <p className="text-center">How can I help you today?</p>
      <ul className="list-group">
        <li className="list-group-item">How do I pay my fines?</li>
        <li className="list-group-item">What documents can I download after paying fines?</li>
        <li className="list-group-item">Who do I contact for more help?</li>
      </ul>
    </div>
  );
};

export default Chatbot;