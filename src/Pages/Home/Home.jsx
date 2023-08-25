import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('Users')) || [];
    setUsers(storedUsers);

    const userWithoutLogin = storedUsers.find(
      (user) => user.login_status !== 'login'
    );
    if (userWithoutLogin) {
      setSelectedUser({ ...userWithoutLogin, messages: [] });
    }
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const updatedUsers = users.map((user) =>
        user.username === selectedUser.username ? selectedUser : user
      );
      localStorage.setItem('Users', JSON.stringify(updatedUsers));
    }
  }, [selectedUser, users]);

  const handleSendMessage = (userWithoutLogin) => {
    if (messageInput.trim() !== '' && selectedUser) {
      const loggedInUser = users.find((user) => user.login_status === 'login');
      const userWithoutLogin = users.find( (user) => user.login_status !== 'login');
      const chatMessage = {
        messageId: generateMessageId(loggedInUser.username),
        sender: loggedInUser.username,
        receiver:userWithoutLogin.username,
        content: messageInput,
        time: new Date().toLocaleString(),
      };

      const updatedSelectedUser = {
        ...selectedUser,
        messages: [...selectedUser.messages],
      };

      setSelectedUser(updatedSelectedUser);
      setMessageInput('');

      const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
      storedMessages.push(chatMessage);
      localStorage.setItem('messages', JSON.stringify(storedMessages));
    }
  };

  const handleLogout = () => {
    const updatedLocalData = users.map((userData) =>
      userData.login_status === 'login'
        ? { ...userData, login_status: '' }
        : userData
    );

    localStorage.setItem('Users', JSON.stringify(updatedLocalData));
    navigate('/');
  };

  const generateMessageId = (sender) => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `${sender}_${timestamp}_${random}`;
  };

  const loggedInUser = users.find((user) => user.login_status === 'login');

  const userWithoutLogin = users.find( (user) => user.login_status !== 'login');
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="home">
      <div className="container">
        <div className="chat">
          <div className="chat-app">
            <div className="sidebar">
              <div className="navbar">
                <div className="user">
                  <div>
                    Login Status:{' '}
                    {loggedInUser && loggedInUser.login_status === 'login' && loggedInUser.username}
                  </div>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
              <div className="userChat">
                <div className="user-list">
                  <h2>Contacts</h2>
                  <ul>
                    {users
                      .filter((user) => user.login_status !== 'login')
                      .map((user, index) => (
                        <li
                          key={index}
                          className={
                            selectedUser && user.email === selectedUser.email ? 'active' : ''
                          }
                          onClick={() => handleUserClick(user)}
                        >
                          {user.username}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="chat-area">
              {selectedUser && selectedUser.messages ? (
                <>
                  <div className="header">{selectedUser.username}</div>
                  <div className="messages">
                    {selectedUser.messages.map((message, index) => (
                      <div
                        key={message.messageId}
                        className={`message ${
                          message.sender === loggedInUser.username ? 'sent' : 'received'
                        }`}
                      >
                        <p>{message.receiver}</p>
                        <p>{message.content}</p>
                        <p>{message.time}</p>
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
                <p>No Contacts to display</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
