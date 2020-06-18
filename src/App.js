import React, {useState} from 'react';
import './App.css';
import MegaChat from './component/megaChat';
import ChatDirectory from './component/chatDirectory';

const App = () => {
  const [userId, setUserId] = useState('');

  const onUserClick = (data) => {
    setUserId(data.id);
  };

  return (
    <div className="chat-section">
      <div className="container">
        <div className="row">
          <div className="col-md-2 chat-list-wrapper">
            <ChatDirectory onUserClick={onUserClick} userId={userId} />
          </div>
          <div className="col-md-10 chat-msg-wrapper">
            <MegaChat userId={userId}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
