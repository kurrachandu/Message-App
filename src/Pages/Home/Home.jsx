import React,{useState,useEffect} from 'react';
import Chat from '../../Components/Chat'; // Update the path based on your project structure
import Sidebar from '../../Components/Sidebar'; // Update the path based on your project structure
import '../../../src/style.scss'; // Update the path for your CSS file
// import Search from '../../Components/Search';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Navbar from '../../Components/Navbar';
const Home=()=> {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('Users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const generateMessageId = (sender) => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `${sender}_${timestamp}_${random}`;
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== '' && selectedUser) {
      const loggedInUser = users.find(user => user.login_status === 'login');
      const chatMessage = {
        messageId: generateMessageId(loggedInUser.username),
        sender: loggedInUser.username,
        content: messageInput,
        timestamp: new Date().toLocaleString(),
        replies: []
      };
  
      const updatedUsers = users.map(user => {
        if (user.username === loggedInUser.username || user.username === selectedUser.username) {
          return {
            ...user,
            messages: [...user.messages, chatMessage]
          };
        }
        return user;
      });
  
      setUsers(updatedUsers);
      localStorage.setItem('Users', JSON.stringify(updatedUsers));
      setMessageInput('');
    }
  };
  
  const handleLogout = () => {
    // Find the user's data and set login_status to an empty string
    const updatedLocalData = users.map((userData) =>
      userData.login_status === "login"
        ? { ...userData, login_status: "" }
        : userData
    );

    // Save the updated data back to localStorage
    localStorage.setItem("Users", JSON.stringify(updatedLocalData));

    navigate("/");
  };
  const loggedInUser = users.find(user => user.login_status === 'login');

  return (
    <div className="home">
      <div className="container">
    <div className="chat">
    <div className="chat-app">
      {/* <Navbar/> */}
      
      <div className="sidebar">
      <div className='navbar'>

      <span className='logo'>Message Chat</span>
      <div className='user'>
        {/* <img src='https://images.pexels.com/photos/4050312/pexels-photo-4050312.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' />
        <span>Kiran</span> */}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
    <div className="userChat">
                <div className="userChatInfo">
                  <h2>Contacts</h2>
                  <ul>
                    {users.map((user, index) => (
                      user.login_status !== 'login' && user.username !== loggedInUser.username && (
                        <li
                          key={index}
                          className={selectedUser && user.email === selectedUser.email ? 'active' : ''}
                          onClick={() => handleUserClick(user)}
                        >
                          {user.username}
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              </div>
            </div>
      <div className="chat-area">
        <div className='chatInfo'>
      <div>{loggedInUser && loggedInUser.login_status === 'login' && loggedInUser.username}</div>
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
              <div className="send">
              <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          </>
        ) : (
          <p>Select a user to start chatting</p>
        )}
      </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Home;
