// src/components/ChatbotPage.js
import React, { useState } from 'react';
import userAvatar from '../assets/user-avatar.png'; // Replace with your user avatar image path
import botAvatar from '../assets/bot-avatar.png'; // Replace with your bot avatar image path

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (userMessage.trim() === '') return;

    // Update chat messages with user's message
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: userMessage }]);

    // Send message to backend API
    const response = await fetch('http://localhost:8000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();

    // Update chat messages with bot's response
    setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: data.response }]);
    
    setUserMessage(''); // Clear input after sending
  };

  return (
    <div className="chatbot-page container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-4 text-center">Chat with our Support Bot</h2>

      {/* Chat messages area */}
      <div id="chat-messages" className="chat-messages bg-gray-100 border rounded-lg p-4 mb-4" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`message-item flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`flex items-center ${msg.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
              {msg.sender === 'user' ? (
                <img src={userAvatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
              ) : (
                <img src={botAvatar} alt="Bot Avatar" className="w-8 h-8 rounded-full" />
              )}
            </div>
            <div className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input for user message */}
      <form onSubmit={handleSendMessage} className="flex">
        <input 
          type="text"
          value={userMessage}
          placeholder="Type your message..."
          onChange={(e) => setUserMessage(e.target.value)}
          className='flex-grow p-2 border rounded-md mr-2'
          style={{ minWidth: '200px', maxWidth: '400px' }} // Responsive width
        />
        <button type="submit" className='bg-blue-600 text-white px-4 py-2 rounded-md'>Send</button>
      </form>

      <style jsx>{`
        .chatbot-page {
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        .chat-messages {
          background-color: #ffffff;
        }
        .message-item {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default ChatbotPage;