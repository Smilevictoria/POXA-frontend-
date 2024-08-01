import React, { useState, useEffect } from 'react';
import styles from './ChatInput.module.css';

const ChatInput = ({onSendMessage}) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // sending message to your backend
    console.log(`有進來: ${message}`);
    if (message.trim() !== '') {
      console.log("執行");
      onSendMessage(message);
      setMessage(''); // 清空輸入欄位
    }
  };

  // 按下 enter 要呼叫 START
  const handleKeyPress = (event) => {
    console.log("偵測到按按鍵");
    if (event.key === 'Enter') {
      console.log("是按 enter");
      handleSendMessage();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  // 按下 enter 要呼叫 END

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Type something..."
        className={styles.input}
      />
      <button onClick={handleSendMessage} className={styles.button}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;