import React from 'react';
import Button from '@material-ui/core/Button';

const InputToolbar = (props) => {
    const {onSend, onTextChange, text} = props;

    return (
      <div className='chat-message-input d-flex py-3'>
        <input
          type='text'
          className="msg-input"
          placeholder='Type a message'
          onChange={(e) => onTextChange(e.target.value)}
          value={text}
        />
        <Button class="btn btn-primary" onClick={() => onSend && onSend(text)}>Send</Button>
      </div>
    );
};

export default InputToolbar;