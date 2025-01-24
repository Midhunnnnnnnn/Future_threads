import React, { useState } from "react";
import { ImGithub } from "react-icons/im";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaHome,
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsPersonFill, BsPaypal } from "react-icons/bs";
import { logoLight, paymentLogo } from "../assets";
import { Link } from 'react-router-dom'; // Import Link for navigation

const Footer = () => {
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (userMessage.trim() === '') return;

    // Update chat messages with user's message
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: userMessage }]);

    // Send message to backend API
    const response = await fetch('http://localhost:5000/api/chat', {
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
    <div className="bg-black text-[#949494] py-10 font-titleFont">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="flex flex-col gap-7">
          <img className="w-32" src={logoLight} alt="logoLight" />
          <p className="text-white text-sm tracking-wide">© Midhunsm.com</p>
          <img className="w-56" src={paymentLogo} alt="paymentLogo" />
          <div className="flex gap-5 text-lg text-gray-400">
            <a href="https://github.com/Midhunsm" target="_blank" rel="noopener noreferrer">
              <ImGithub className="hover:text-white duration-300 cursor-pointer" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="hover:text-white duration-300 cursor-pointer" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="hover:text-white duration-300 cursor-pointer" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-white duration-300 cursor-pointer" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-white duration-300 cursor-pointer" />
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Locate us</h2>
          <div className="text-base flex flex-col gap-2">
            <p>SOE,CUSAT</p>
            <p>Mobile: 9188725204</p>
            <p>Phone: 7907742219</p>
            <p>e-mail: futurethreads@gmail.com</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Profile</h2>
          <div className="text-base flex flex-col gap-2">
            <a href="/account" className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg"><BsPersonFill /></span> My account
            </a>
            <a href="/checkout" className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg"><BsPaypal /></span> Checkout
            </a>
            <a href="/order-tracking" className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg"><FaHome /></span> Order tracking
            </a>

            {/* Updated Help & Support section to Receive Messages */}
            {/* Link to Chatbot page */}
            <Link to="/chatbot" className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
              <span className="text-lg"><MdLocationOn /></span> Help and Support
            </Link>

          </div>

          {/* Chatbot UI (optional if you want to keep it) */}
          {chatVisible && (
            <div className="chatbot bg-gray-800 p-4 rounded-md mt-4">
              <h3 className="text-white mb-2">Chat with us!</h3>

              {/* Chat messages area */}
              <div id="chat-messages" style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                  <p key={index} className={msg.sender === 'user' ? 'text-blue-400' : 'text-green-400'}>
                    {msg.sender === 'user' ? 'User: ' : 'Bot: '}
                    {msg.text}
                  </p>
                ))}
              </div>

              {/* Input for user message */}
              <form onSubmit={handleSendMessage}>
                <input 
                  type="text"
                  value={userMessage}
                  placeholder="Type your message..."
                  onChange={(e) => setUserMessage(e.target.value)}
                  className='w-full p-2 rounded-md mt-2'
                />
                <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md mt-2'>Send</button>
              </form>
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4">Newsletter</h2>
          <div className="text-base flex flex-col gap-2">
            <p>Subscribe to our newsletter to get updates on our latest offers!</p>
            <div className="flex items-center justify-between border border-gray-500 rounded-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none text-white px-4 py-2 w-full"
              />
              <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;