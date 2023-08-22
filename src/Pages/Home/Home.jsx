import React from 'react';
import Chat from '../../Components/Chat'; // Update the path based on your project structure
import Sidebar from '../../Components/Sidebar'; // Update the path based on your project structure
import '../../../src/style.scss'; // Update the path for your CSS file
// import Search from '../../Components/Search';

function Home() {
  return (
    <div className='home'>
      <div className='container'>
         <Sidebar />
        
        <Chat/>
        
      </div>
    </div>
  );
}

export default Home;
