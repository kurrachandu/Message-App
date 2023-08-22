/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("use")
    alert('Successfully Logged Out');
    navigate('/');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return null;
}

export default Success;
