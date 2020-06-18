import React from 'react';
import moment from 'moment';
import './message.css';

const Message = (props) => {
  const {
    data,
    isMine,
    showTimestamp
  } = props;

  const currentDay = moment(data.timestamp);
  const time = moment(data.timestamp).format('HH:mm A');
  const dayDiff = moment().diff(currentDay, 'days');
  const day = dayDiff === 0 ? 'Today' : dayDiff === -1 ? 'Yesterday' : currentDay.format('dddd');
  return (
    <div className={`message mb-2 ${isMine ? 'mine' : ''}`}>
      {
        showTimestamp &&
        <div className='timestamp'>
          { day }
        </div>

      }

      <div className='bubble-container d-flex'>
        <div className='bubble' title={`${day}${time}`}>
          <div className="chat-user-msg">{ data.message }</div>
          <div className="chat-msg-time">{time}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;