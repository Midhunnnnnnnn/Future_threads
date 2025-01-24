// src/components/HelpAndSupport.js
import React from 'react';

const HelpAndSupport = () => {
  return (
    <div className="help-support-container">
      <h2>Help and Support</h2>
      <p>If you have any questions or need assistance, feel free to reach out to our chatbot!</p>
      <a href="/chatbot" className="chatbot-link">Open Chatbot</a>

      <style jsx>{`
        .help-support-container {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .chatbot-link {
          display: inline-block;
          margin-top: 10px;
          padding: 10px;
          border-radius: 5px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
        }
        .chatbot-link:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default HelpAndSupport;