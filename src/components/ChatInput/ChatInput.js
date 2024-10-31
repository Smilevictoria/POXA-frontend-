import React, { useState, useEffect } from 'react';
import styles from './ChatInput.module.css';

const ChatInput = ({onSendMessage}) => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false); // 新增状态来跟踪输入法状态

  const handleCompositionStart = () => {
    setIsComposing(true); // 進入輸入法的選字狀態
  };

  const handleCompositionEnd = () => {
    setTimeout(() => {
      setIsComposing(false); // 延遲重置組字狀態
    }, 0); // 退出輸入法的選字狀態
  };

  const handleMessageChange = (event) => {
    // console.log(`進來改: ${event.target.value}`)
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);  // 发送消息
      setMessage('');  // 清空输入框
    }
  };

  // 按下 enter 要呼叫 START
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isComposing && !event.isComposing) {
      event.preventDefault();
      handleSendMessage();
    }
  };
  // 按下 enter 要呼叫 END

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart} // 開始輸入法的選字狀態
        onCompositionEnd={handleCompositionEnd} // 結束輸入法的選字狀態
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