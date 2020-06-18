import React, {useEffect, useRef, useState} from 'react';
import {directory} from './data';
import InputToolbar from '../inputToolbar';
import Message from '../message';
import moment from 'moment';

const MY_ID = '1';
let skipMessges = 0;

const MegaChat = (props) => {
  const [orgMessages, setOrgMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const scroll = useRef();

  useEffect(() => {
    setMessages([]);
    skipMessges = 0;
    setTimeout(() => {
      fetchMessages();
    }, 1000);
  }, [props.userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    scroll.current && scroll.current.scrollTo({ y: scroll.current.scrollHeight, behavior: 'smooth' });
  };

  const _onScroll = () => {
    if ((scroll.current.scrollTop + scroll.current.clientHeight) >= (scroll.current.scrollHeight - 50)) {
      fetchMessages(10, skipMessges);
    }
  };

  const fetchMessages = (amount = 10, skip = 0) => {
    let data = directory.find((obj) => obj.id.toString() === props.userId.toString());
    !skip && data && data.messages && setOrgMessages(data.messages);
    let paginateData = data && data.messages && data.messages.slice((skip), (skip + amount));
    paginateData && paginateData.length > 0 && setMessages(skip ? [...messages, ...paginateData] : [...paginateData]);
    skipMessges = (skip + amount);
  };

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];

      let isMine = current.author === MY_ID;
      let currentMoment = moment(current.timestamp);
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));

        if (previousDuration.as('minutes') < 10) {
          showTimestamp = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      i += 1;
    }

    return tempMessages;
  };

  const onTextChange = (newText) => {
    setText(newText);
  };

  const onSend = (newMsg) => {
    if (!newMsg) return;
    let allMessages = [...orgMessages];
    skipMessges = allMessages.length;

    let newMsgObj = {
      id: allMessages.length,
      author: MY_ID,
      message: newMsg,
      timestamp: new Date().getTime()
    };

    allMessages.push(newMsgObj);
    setMessages(allMessages);
    setText('');
  };

  return (
    <div className={'full-height h-100'}>
      {
        props.userId ?
          <div className="chat-message-block-wrapper h-100 d-flex flex-column">
            <div className="chat-message-block py-3" ref={scroll} onScroll={_onScroll}>
              {renderMessages()}
            </div>
            <InputToolbar
              onSend={onSend}
              onTextChange={onTextChange}
              text={text}
            />
          </div> :
          <div className="chat-message-block-icon justify-content-center d-flex">
            <img src={require('../../assets/chat-icon.png')} alt={'Chat Icon'} />
          </div>
      }
    </div>
  );
};

export default MegaChat;