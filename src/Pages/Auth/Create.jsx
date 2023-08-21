import FormInput from "./FormInput";
import '../../../src/App.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Create = () => {
    const navigate = useNavigate();
    const [UnameOrEmail, setUnameOrEmail] = useState({
      username: "", 
      password: ""
    });
    

    const handleSubmit = (e) => 
    {
        e.preventDefault();
        const existingData = JSON.parse(localStorage.getItem('LoginData')) || [];
        const userData = existingData.find(data => 
          data.username === UnameOrEmail.username || data.email === UnameOrEmail.username
        );

        if (!userData || userData.password !== UnameOrEmail.password) {
          alert('Invalid credentials');
          return;
        }
        else{
          localStorage.setItem('loggedUserData',JSON.stringify(UnameOrEmail));
          navigate('/chatpage'); 
        }
        // navigate('/home'); 
    };
  
    const onChange = (e) =>
     {
      setUnameOrEmail({ ...UnameOrEmail, [e.target.name]: e.target.value });
    };
  
    return (
      <div className="app">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <FormInput
            name="username" // Changed to "identifier"
            type="text"
            placeholder="Username or Email" 
            errorMessage="Username or email should be valid"
            label="Username or Email" // Updated label
            required={true}
            value={UnameOrEmail.username}
            onChange={onChange}
          />
  
          <FormInput
            name="password"
            type="password" 
            placeholder="Password"
            errorMessage="Password should be 8 characters"
            pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
            label="Password"
            required={true}
            value={UnameOrEmail.password}
            onChange={onChange}
          />
          <button  className = "btn" type="submit">Login</button>
          <p className = "Login-btn" onClick={() => navigate("/login")}>Don't have an account? Register Here</p>
        </form>
      </div>
    );
};

export default Create;
