import React,{useState, useEffect} from 'react';


import  {BrowserRouter,Routes,Route, Link} from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Create from './Pages/Auth/Create';
import Home from './Pages/Home/Home';
function App(){
  return(
    <div className='navbar'>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Create/>}/>
        <Route path='/chatpage' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;