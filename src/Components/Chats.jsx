import React,{useState,useEffect} from 'react'

function Chats() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('Users')) || [];
        setUsers(storedUsers);
      }, [users]);


    const handleUserClick = (user) => {
        setSelectedUser(user);
      };

  return (
    <div className='chats'>
        <div className='userChat'>
            <div className="user-list">
            {/* <img 
            src='https://images.pexels.com/photos/4050312/pexels-photo-4050312.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' /> */}
            <div className='userChatInfo'>
            <h2>Contacts</h2>
        <ul>
          {users.map((user, index) => (
            <li
              key={index}
              className={selectedUser && user.email === selectedUser.email ? 'active' : ''}
              onClick={() => handleUserClick(user)}
            >
              {user.login_status !== 'login' && user.username}
            </li>
          ))}
        </ul>






                
                {/* <span>krishna</span>
                <p>Hello</p> */}
            </div>
            </div>
        </div>

        {/* <div className='userChat'>
            <img 
            src='https://images.pexels.com/photos/4050312/pexels-photo-4050312.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' />
            <div className='userChatInfo'>
                <span>akhil</span>
                <p>Hello</p>
            </div>
        </div>
      
        <div className='userChat'>
            <img 
            src='https://images.pexels.com/photos/4050312/pexels-photo-4050312.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' />
            <div className='userChatInfo'>
                <span>vishnu</span>
                <p>Hello</p>
            </div>
        </div> */}

    </div>
  )
}

export default Chats;

