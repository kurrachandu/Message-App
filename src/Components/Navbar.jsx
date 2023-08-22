import React from 'react';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };
  return (
    <div className='navbar'>
      <span className='logo'>Message Chat</span>
      <div className='user'>
        <img src='https://images.pexels.com/photos/4050312/pexels-photo-4050312.jpeg?auto=compress&cs=tinysrgb&w=600' alt='' />
        <span>Kiran</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
