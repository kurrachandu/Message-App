import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedGroupUsers, setSelectedGroupUsers] = useState([]);
  const [groupname, setGroupName] = useState('');
  const [groupMessages, setGroupMessages] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('Users')) || [];
    setUsers(storedUsers);

    const userWithoutLogin = storedUsers.find(
      (user) => user.login_status !== 'login'
    );
    if (userWithoutLogin) {
      setSelectedUser({ ...userWithoutLogin, messages: [] });
    }

    const storedGroupMessages = JSON.parse(localStorage.getItem('Groupmessages')) || [];
    setGroupMessages(storedGroupMessages);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const storedMessages = JSON.parse(localStorage.getItem('Messages')) || [];
      
      const userMessages = storedMessages.filter(
        (message) =>
          (message.sender === selectedUser.username &&
            message.receiver === loggedInUser.username) ||
          (message.sender === loggedInUser.username &&
            message.receiver === selectedUser.username)
      );
      setSelectedUser({ ...selectedUser, messages: userMessages });
    }
  }, [selectedUser]);

  const handleSendMessage = () => {
    if (messageInput.trim() !== '' && (selectedUser || selectedGroup)) {
      const loggedInUser = users.find((user) => user.login_status === 'login');
      const receiverUser = selectedUser
        ? users.find(
            (user) =>
              user.username === selectedUser.username && user.login_status !== 'login'
          )
        : null;

      if (selectedGroup) {
        const groupChat = {
          sender: loggedInUser.username,
          receiver: selectedGroup.members,
          content: messageInput,
          timestamp: new Date().toLocaleString(),
        };
        const updatedGroup = { ...selectedGroup, messages: [...selectedGroup.messages, groupChat] };
        const updatedGroupMessages = groupMessages.map((group) =>
          group.name === selectedGroup.name ? updatedGroup : group
        );
        setGroupMessages(updatedGroupMessages);
        localStorage.setItem('Groupmessages', JSON.stringify(updatedGroupMessages));
        setSelectedGroup(updatedGroup); // Display the message in the sender's chat area
      } else {
        const chatMessage = {
          sender: loggedInUser.username,
          receiver: receiverUser.username,
          content: messageInput,
          timestamp: new Date().toLocaleString(),
        };
        const storedMessages = JSON.parse(localStorage.getItem('Messages')) || [];
        const updatedMessages = [...storedMessages, chatMessage];
        localStorage.setItem('Messages', JSON.stringify(updatedMessages));

        setSelectedUser({
          ...selectedUser,
          messages: [...selectedUser.messages, chatMessage],
        });
      }

      setMessageInput('');
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

  const loggedInUser = users.find((user) => user.login_status === 'login');

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setSelectedGroup(null);
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setSelectedUser(null);
  };

  const toggleGroupModal = () => {
    setShowGroupModal(!showGroupModal);
  };

  const toggleUserSelection = (user) => {

    setSelectedGroupUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(user.username)) {
        return prevSelectedUsers.filter((username) => username !== user.username);
      } else {
        return [...prevSelectedUsers, user.username];
      }
    });
  };

  const handleCreateGroup = () => {
    const newGroup = {
      name: groupname,
      members: selectedGroupUsers,
      messages: [],
    };
    const updatedGroupMessages = [...groupMessages, newGroup];

    setGroupMessages(updatedGroupMessages);
    
    localStorage.setItem('Groupmessages', JSON.stringify(updatedGroupMessages));
    toggleGroupModal();
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
                <div className='headers' onClick={() => toggleGroupModal()}>Create a Group</div>
                  <h2>Contacts</h2>
                  
                  <ul>
                    {users
                      .filter((user) => user.login_status !== 'login')
                      .map((user, index) => (
                        <li
                          key={index}
                          className={
                            selectedUser && user.username === selectedUser.username ? 'active' : ''
                          }
                          onClick={() => handleUserClick(user)}
                        >
                          {user.username}
                        </li>
                      ))}
                  
                  <div className='header3'>Groups</div>
                  {groupMessages.map((group, groupIndex) => (
                    <li
                      key={groupIndex}
                      onClick={() => handleGroupClick(group)}
                      className={selectedGroup === group ? 'active-group' : ''}
                    >
                      <p>{group.name}</p>
                    </li>
                  ))}
                  </ul>
                </div>
              </div>
              {showGroupModal && (
                <div className="group-modal">
                  <h2>Select Users for Group Chat</h2>
                  <ul>
                    {users.map((user) => (
                      <li key={user.email}>
                        <label>
                          <input
                            type="checkbox"
                            onChange={() => toggleUserSelection(user)}
                            checked={selectedGroupUsers.includes(user.username)}
                          />
                          {user.username}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    value={groupname}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Group Name...."
                  />
                  <button onClick={() => handleCreateGroup()}>Create Group</button>
                  <button onClick={toggleGroupModal}>Cancel</button>
                </div>
              )}
            </div>
            <div className="chat-area">
              {selectedUser || selectedGroup ? (
                <>
                  <div className="header">
                    {selectedGroup ? selectedGroup.name : selectedUser.username}
                  </div>
                  <div className="messages">
                    {(selectedGroup ? selectedGroup.messages : selectedUser.messages) ? (
                      (selectedGroup ? selectedGroup.messages : selectedUser.messages).map(
                        (message, index) => (
                          <div
                            key={index}
                            className={`message ${
                              message.sender === loggedInUser.username ? 'sent' : 'received'
                            }`}
                          >
                            <p>
                              {message.sender === loggedInUser.username ? 'You' : message.sender}
                            </p>
                            <p>{message.content}</p>
                            <p>{message.timestamp}</p>
                          </div>
                        )
                      )
                    ) : (
                      <p>No messages to display</p>
                    )}
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
                <p>No Contacts or Groups to display</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
