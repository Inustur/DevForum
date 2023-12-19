// TopicPage.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./TopicPage.css";

const TopicPage = ({ username }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);
  const [validationMessage, setValidationMessage] = useState('');
  const [modalImage, setModalImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const topicTitle = location.state?.title || 'Unknown Topic'; // Default title if not provided
  const topicAuthor = location.state?.author || 'Anonymous';
  const topicTime = location.state?.time || 'Unknown Time';

  const handleLikeSample = () => {
    setLikes(likes + 1);
  };

  const handleDislikeSample = () => {
    setDislikes(dislikes + 1);
  };

  const formatDateAndTime = () => {
    const now = new Date();
    return now.toLocaleDateString() + ' @ ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'None') {
      setValidationMessage("Please sign in first to reply.");
      return;
    }

    if (!replyText.trim()) {
      setValidationMessage("Please enter a reply.");
      return;
    }
 
    const newReply = {
      author: username || 'Anonymous',
      text: replyText,
      time: formatDateAndTime(),
      likes: 0,
      dislikes: 0
    };

    setReplies([...replies, newReply]);
    setReplyText('');
    setValidationMessage('');
  };

  const handleLike = (index) => {
    const newReplies = [...replies];
    newReplies[index].likes += 1;
    setReplies(newReplies);
  };

  const handleDislike = (index) => {
    const newReplies = [...replies];
    newReplies[index].dislikes += 1;
    setReplies(newReplies);
  };

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="reply-container">
      <div className="topic-hero">
        <div className="topic-header">
          <h1>{topicTitle}</h1>
          <p><p>Created by {topicAuthor} at {topicTime}</p></p>
        </div>
      </div>

      {/* Reply form */}
      <div className='reply-form'>
        <form onSubmit={handleSubmit}>
          <h1>Share your solution?</h1>

          <textarea 
            placeholder="Write your reply here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          ></textarea>

          {validationMessage && <div className="validation-message">{validationMessage}</div>}

          <div className="reply-buttons">
            <input type="file" />
            <button type="submit">Send</button>
          </div>
          
        </form>
      </div>

      <div className="intersection">
        <p>--------------------- &lt;reply-section&gt; ---------------------</p>
      </div>

      {/* Existing reply section */}
      <div className="user-reply">
        <div className="reply-icon">
          <ion-icon name="return-down-forward-outline"></ion-icon>
        </div>

        <div className="reply-section">
          <div className="reply-header">
            <h1>Example-User</h1>
            <p>Reply to Topic on 1/1/2023 @11:59PM</p>
          </div>

          <div className="reply-content">
            <p><span className="sample-highlight">&#40;SAMPLE REPLY&#41;</span> Lorem ipsum dolor sit amet. Ea atque quasi eos ipsa quis qui voluptatibus nulla in aperiam quod est ipsum iure et rerum delectus sit quaerat voluptate.</p>
            <img src="/devforum-bg.png" alt="reply" />
          </div>

          <div className="reply-buttons">
            <button onClick={handleLikeSample}>
              <p className="like">{likes}</p> 
              <ion-icon name="thumbs-up-outline"></ion-icon>
            </button>
            <button onClick={handleDislikeSample}>
              <p className="dislike">{dislikes}</p>
              <ion-icon name="thumbs-down-outline"></ion-icon>
            </button>
          </div>
        </div>
      </div>

      {/* Displaying new replies */}
      {replies.map((reply, index) => (
        <div key={index} className="user-reply">
          <div className="reply-icon">
            <ion-icon name="return-down-forward-outline"></ion-icon>
          </div>

          <div className="reply-section">
            <div className="reply-header">
              <h1>{reply.author}</h1>
              <p>Reply to Topic on {reply.time}</p>
            </div>

            <div className="reply-content">
              <p>{reply.text}</p>
              <img 
              src="/devforum-bg.png" 
              alt="reply"
              onClick={() => openModal('/devforum-bg.png')}
              />
            </div>

            <div className="reply-buttons">
              <button onClick={() => handleLike(index)}>
                <p className="like">{reply.likes}</p> 
                <ion-icon name="thumbs-up-outline"></ion-icon>
              </button>
              <button onClick={() => handleDislike(index)}>
                <p className="dislike">{reply.dislikes}</p>
                <ion-icon name="thumbs-down-outline"></ion-icon>
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="intersection">
        <p>--------------------- &lt;/reply-section&gt; ---------------------</p>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={modalImage} alt="Modal" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicPage;
