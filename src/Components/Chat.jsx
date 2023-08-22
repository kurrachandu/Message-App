import React from 'react'
import Messages from '../Components/Messages';
import Input from '../Components/Input';

const  Chat = () =>{
  return (
    <div className='chat'>
        <div className='chatInfo'>
            <span>Kiran</span>
        </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat;
