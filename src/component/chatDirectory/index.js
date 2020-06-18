import React from 'react';
import {directory} from "../megaChat/data";
import Avatar from "@material-ui/core/Avatar";

const ChatDirectory = (props) => {
  const renderUserData = (data, index) => {
    return (
      <div className={'user-list d-flex align-items-center ' + (props.userId === data.id ? 'active' : '')} key={`user${index}`} onClick={() => props.onUserClick(data)}>
        <Avatar>{data.name.substr(0,1).toUpperCase()}</Avatar>
        <span>{data.name}</span>
      </div>
    );
  };

  return (
    <div className="chat-listing-wrapper">
      {
        directory.map(renderUserData)
      }
    </div>
  )
};

export default ChatDirectory;