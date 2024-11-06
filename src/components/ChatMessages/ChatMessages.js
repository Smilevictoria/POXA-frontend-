import React, {useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './ChatMessages.module.css';

const ChatMessages = ({ messages, onSetIntent, onSetFlow }) => {
  // 使用 ref 來獲取 messages 容器
  const messagesEndRef = useRef(null);

  // 每次 messages 更新時滾動到最下面
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' }); // 平滑滾動到底部
    }
  }, [messages]); // 當 messages 改變時觸發

  return (
    <div className={styles.container}>
      {messages.map((message, messageIndex) => (
        <Message
          key={messageIndex} 
          message={message}
          onSetIntent={onSetIntent} 
          onSetFlow={onSetFlow}/>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

const Message = ({ message, onSetIntent, onSetFlow }) => {

  const [lastClickedIndex, setLastClickedIndex] = useState(null);

  const handleButtonClick = (index) => {
    // 取消上一個被點擊的按鈕樣式
    if (lastClickedIndex !== null) {
      setLastClickedIndex(null);
    }

    // 設置新被點擊的按鈕樣式
    setLastClickedIndex(index);

    // 處理按鈕點擊的邏輯
    // console.log('Button clicked:', index);
  };

  return (
    <div className={`${styles.message} ${message.from === 'system' ? styles.systemMessage : styles.userMessage}`}>
      <div className={`${styles.avatar} ${message.from === 'system' ? styles.systemAvatar : styles.userAvatar}`}>
        {message.from === 'system' ? (
          <FontAwesomeIcon icon={faRobot} />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>
      {/* {message.text && <div className={`${styles.text} ${message.from === 'system' ? styles.systemText : styles.userText}`} dangerouslySetInnerHTML={{ __html: message.text }}></div>} */}
      {message.text && <div className={`${styles.text} ${message.from === 'system' ? styles.systemText : styles.userText}`}> {message.text} </div>}

      {message.buttonData && (
        <div className={`${styles.text} ${styles.systemText}`}>
          {message.buttonData.map((button, index) => (
                <button
                  key={index}
                  className={`${index === lastClickedIndex ? styles.button_click : styles.button}`}
                  onClick={() => {
                    onSetFlow(button.content);
                    onSetIntent(button.content); // 處理 button 的資料流
                    // handleButtonClick(index); // 處理 button 的樣式
                  }}>
                  {button.content}
                </button>
              ))
            }
        </div>
      )}
    </div>
  );
};

export default ChatMessages;