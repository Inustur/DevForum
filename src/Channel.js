import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Channel.css';

const Channel = ({ username }) => {
  const [topics, setTopics] = useState([]);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const navigate = useNavigate();

  const addNewTopic = () => {
    // Check if user is logged in
    if (username === 'None') {
      setValidationMessage("Please log in to create a new topic.");
      return;
    }

    // Check if the topic title is entered
    if (!newTopicTitle.trim()) {
      setValidationMessage('Please enter a topic title.');
      return;
    }

    const newTopic = {
      title: newTopicTitle,
      author: username,  // Use the passed username
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      answers: "0 replies"
    };
    setTopics([...topics, newTopic]);
    setNewTopicTitle('');
    setValidationMessage('');
  };

  const goToTopicPage = (topic) => {
    navigate('/topic', { state: { title: topic.title, author: topic.author, time: topic.time } });
  };

  //Only for administration account a.k.a admin
  const handleDeleteTopic = (index) => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      const updatedTopics = topics.filter((_, idx) => idx !== index);
      setTopics(updatedTopics);
    }
  };

  return (
    <div className="channel-container">
      <div className='profile'>
        <h1>Hello, <span className="display-name">{username}</span>!</h1>
        <p><q><span>Sign-in</span> to use features</q></p>
        <h6>Ready to <span className="underline-word">engage your knowledge</span> or <span className="underline-word">start a question&#92;topic</span>?</h6>
        <div className='arrow-image'>
          <img src="/arrow-left.png" alt="Left Arrow" />
          <img src="/arrow-right.png" alt="Right Arrow" />
        </div>
      </div>

      <div className="options">
        <div className="c-search-container">
          <input type="text" placeholder="Search topic..." />
          <button><ion-icon name="search-outline"></ion-icon></button>
        </div>

        <div className="text">
          <h1>&lt; /or &gt;</h1>
        </div>

        <div className="create-bar">
          <input 
            type="text" 
            placeholder="Create topic..." 
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
          />
          <button onClick={addNewTopic}><ion-icon name="send-outline"></ion-icon></button>
        </div>
      </div>

      <div className="validate-container">
        {validationMessage && <div className="validation-message">{validationMessage}</div>}
      </div>

      <div className="topics-container">
        <div className="header">
          <h1>Latest Channels</h1>
        </div>

        <div className="topic-posts">
            <div className="topic-infor">
              <div className="topic">
                <h1>How to center &lt;div&gt;?</h1>
                <p>by <span className="sample-highlight">Example-User</span> at 11:59PM</p>
              </div>
              <div className="reply-count">
                <button onClick={goToTopicPage}>
                  <p>1 reply</p>
                  <ion-icon name="chevron-expand-outline"></ion-icon>
                </button>
              </div>
            </div>
          </div>

        {topics.map((topic, index) => (
          <div className="topic-posts" key={index}>
            <div className="topic-infor">
              <div className="topic">
                <h1>{topic.title}</h1>
                <p>by {topic.author} at {topic.time}</p>
              </div>
              <div className="reply-count">
                <button onClick={() => goToTopicPage(topic)}>
                  <p>{topic.answers}</p>
                  <ion-icon name="chevron-expand-outline"></ion-icon>
                </button>
              </div>
            </div>

            {username === 'admin' && (
                <button className="delete-button" onClick={() => handleDeleteTopic(index)}>
                  Delete
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channel;


