import React, { useState, useEffect } from 'react';
import { sus } from '../assets/index';

const Community = () => {
  const [comments, setComments] = useState(() => {
    // Retrieve saved comments from localStorage on initial load
    const savedComments = localStorage.getItem('comments');
    return savedComments ? JSON.parse(savedComments) : [
      { name: 'Alice', text: 'Sustainability means reducing waste and reusing resources whenever possible!' },
      { name: 'John', text: 'I love the idea of ethical fashion. It’s time we care about what we wear!' },
      { name: 'Priya', text: 'For me, sustainability is about leaving a better planet for future generations.' },
    ];
  });

  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('');

  // Save comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() && userName.trim()) {
      const newComment = { name: userName, text: commentText };
      setComments([...comments, newComment]);
      setCommentText('');
      setUserName('');
    }
  };

  return (
    <div className="community-container">
      <div className="header">
        <h2>Welcome to the Future Threads Community</h2>
        <p>
          <strong>Future Threads</strong> is dedicated to promoting sustainability through ethical and eco-friendly fashion.
          By joining us, you’re supporting a movement that values the planet, ethical practices, and a greener tomorrow.
        </p>
        <img src={sus} alt="Sustainability" className="hero-image" />
      </div>
      <div className="content">
        <p>
          Your voice matters! Share your thoughts, ideas, or personal stories about sustainability in the comments below.
          Let’s work together to inspire change and create a community that believes in making a difference.
        </p>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="input-name"
            required
          />
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="What does sustainability mean to you? Leave a comment!"
            rows="4"
            required
            className="input-comment"
          />
          <button type="submit" className="submit-button">Send Comment</button>
        </form>
        <div className="comments-list">
          <h3>Community Comments</h3>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <strong>{comment.name}:</strong> {comment.text}
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to leave one!</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .community-container {
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 12px;
          max-width: 900px;
          margin: 40px auto;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          animation: fadeIn 1s ease-in-out;
        }

        .header {
          text-align: center;
        }

        h2 {
          font-size: 32px;
          color: #2c3e50;
          margin-bottom: 10px;
        }

        p {
          font-size: 18px;
          line-height: 1.6;
          color: #34495e;
        }

        .hero-image {
          width: 100%;
          border-radius: 10px;
          margin-top: 20px;
          animation: zoomIn 1.5s ease;
        }

        .content {
          margin-top: 30px;
        }

        .comment-form {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .input-name,
        .input-comment {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }

        .input-name:focus,
        .input-comment:focus {
          outline: none;
          border-color: #2ecc71;
        }

        .submit-button {
          padding: 12px 20px;
          border-radius: 8px;
          border: none;
          background-color: #27ae60;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-button:hover {
          background-color: #2ecc71;
        }

        .comments-list {
          margin-top: 30px;
        }

        .comment-item {
          background-color: #ecf0f1;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 10px;
          animation: slideIn 0.6s ease;
        }

        .comment-item strong {
          color: #2ecc71;
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.8);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          h2 {
            font-size: 26px;
          }

          p {
            font-size: 16px;
          }

          .hero-image {
            height: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Community;
