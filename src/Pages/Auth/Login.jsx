/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import FormInput from '../Auth/FormInput';
import "../../../src/App.css";
import { useNavigate } from 'react-router-dom';

const PostLogin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    // DateofBirth: "",
    password: "",
    confirmPassword: "",
    // gender : ""
  });
  const [duplicateError, setDuplicateError] = useState(false);
  
  const handleSubmit = (e) => 
  {
    e.preventDefault();
    // Retrieve existing data from local storage
    const existingData = JSON.parse(localStorage.getItem('RegisterData')) || []; // Set default value as an empty array if no existing data
  
    // Check if the new values already exist in the existing data
    const isDuplicate = existingData.some((data) => 
    {
      console.log("DATA"+data)
      console.log("VALUES"+values)
      // Compare the values of the objects
      return JSON.stringify(data.username) === JSON.stringify(values.username);

    });
  
    if (isDuplicate) 
    {
      // Handle the case when the values already exist in the form data
      alert('Data already exists and pls login');
      navigate('/');
      return;
    }
    // Merge the new data with the existing data
    const newData = [...existingData, values];
  
    // Store the updated data in local storage
    localStorage.setItem('RegisterData', JSON.stringify(newData));
  
    // Redirect or perform any other actions after submitting the form
    navigate('/');
  };
  

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setDuplicateError(false); // Reset the duplicate error when the input values change
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Registration</h1>

        {/* Render the duplicate error message */}
        {/* {duplicateError && <p>User already exists. Please login.</p>} */}

        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          errorMessage="Username should be a combination of letters and digits of 3 to 16 characters"
          label="Username"
          pattern="^[A-Za-z]{3,16}$"
          required={true}
          value={values.username}
          onChange={onChange}
        />

        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          errorMessage="It should be a valid email address"
          label="Email"
          required={true}
          value={values.email}
          onChange={onChange}
        />
        <FormInput
         name="mobileNumber"
         type="text"
         placeholder="Mobile Number"
         errorMessage="Mobile number should be 10 digits"
         label="Mobile Number"
         pattern="[0-9]{10}"
         required={true}
         value={values.mobileNumber}
         onChange={onChange}
/>

        
        {/* <FormInput
          name="DateofBirth"
          type="date"
          placeholder="Date of Birth"
          label="Date of Birth"
          required={true}
          value={values.DateofBirth}
          onChange={onChange}
        /> */}
        
        <FormInput
          name="password"
          type="text"
          placeholder="Password"
          errorMessage="Password should be 8 characters"
          pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
          label="Password"
          required={true}
          value={values.password}
          onChange={onChange}
        />
        {/* <div className='gender'>
          <p>Gender</p>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={onChange}
          />
          <label For="Male">Male</label>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={onChange}
          />
          <label For="female">Female</label>
        </div> */}

        <FormInput
          name="confirmPassword"
          type="text"
          placeholder="Confirm Password"
          errorMessage="Passwords do not match"
          label="Confirm Password"
          pattern={values.password}
          required={true}
          value={values.confirmPassword}
          onChange={onChange}
        />


        <button  className = "btn" type="submit" onClick={() => navigate("/login")}>Submit</button>
      </form >
    </div>
  );
};

export default PostLogin;
