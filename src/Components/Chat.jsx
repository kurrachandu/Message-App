import React,{useState,useEffect} from 'react'
import Messages from '../Components/Messages';
import Input from '../Components/Input';

const  Chat = () =>{
    const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('Users')) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const selectedUserMessages = selectedUser.messages || [];
      setChatMessages(selectedUserMessages);
    }
  }, [selectedUser]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== '' && selectedUser) {
      const loggedInUser = users.find((user) => user.login_status === 'login');
      const newMessage = {
        sender: loggedInUser.username,
        content: messageInput,
        timestamp: new Date().toLocaleString(),
      };

      const updatedSelectedUser = {
        ...selectedUser,
        messages: [...chatMessages, newMessage],
      };

      const updatedUsers = users.map((user) =>
        user.username === loggedInUser.username || user.username === selectedUser.username
          ? updatedSelectedUser
          : user
      );

      setUsers(updatedUsers);
      localStorage.setItem('Users', JSON.stringify(updatedUsers));

      setChatMessages([...chatMessages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <div className='chat'>
        <div className='chatInfo'>
            <span>Kiran</span>
        </div>

        <div className="chat-area">
        <div className='header-chat'>
      {/* <div>{loggedInUser && loggedInUser.login_status === 'login' && loggedInUser.username}</div> */}
        {/* <div  onClick={handleLogout}>Logout</div> */}
        </div>
        {selectedUser ? (
          <>
            <div className="header">{selectedUser.username}</div>
            <div className="messages">
              {selectedUser.messages.map((message, index) => (
                <div key={message.messageId} className={`message ${message.sender === selectedUser.username ? 'received' : 'sent'}`}>
                  <span>{message.sender === selectedUser.username ? message.sender :  'You'}</span>
                  <p>{message.content}</p>
                  <span>{message.timestamp}</span>
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>




      {/* <Messages/> */}
      {/* <Input/> */}
    </div>
  )
};

export default Chat;