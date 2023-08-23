/* eslint-disable no-unused-vars */
import React, { useState,useEffect} from 'react';
import FormInput from '../Auth/FormInput';
import "../../../src/App.css";
import { useNavigate } from 'react-router-dom';

const PostLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    mobileNumber: "",
    // dateOfBirth: "",
    login_status : "",
    messages : [],
  });

  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("Users");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData)) {
        setLocalData(parsedData);
      }
    }
  }, []);

  const { email, username, password, mobileNumber, dateOfBirth, login_status, messages  } = data;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "email" && value) {
      if (!validateemail(value)) {
        errorMessage = "Invalid email address";
      }
    }

    if (name === "username") {
      if (value !== "" && !validateUsername(value)) {
        errorMessage = "Invalid username";
      }
    }

    if (name === "password") {
      if (value !== "" && !validatePassword(value)) {
        errorMessage = "Invalid Password";
      }
    }

    if (name === "mobileNumber") {
      if (value.length === 10 && !validateMobileNumber(value)) {
        errorMessage = "Invalid mobile number";
      }
    }

    setData({ ...data, [name]: value, [`${name}Error`]: errorMessage });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newFormData = {
      email,
      username,
      password,
      mobileNumber,
      // dateOfBirth,
      login_status ,
      messages,
    };

    const existingUser = localData.find((item) => item.username === username);
    if (existingUser) {
      alert("User already exists");
      return;
    }

    const updatedData = [...localData, newFormData];
    localStorage.setItem("Users", JSON.stringify(updatedData));
    setLocalData(updatedData);
    setData({
      email: "",
      username: "",
      password: "",
      mobileNumber: "",
      // dateOfBirth: "",
      messages : [],
    });

    console.log(data);
    navigate("/");
  };

  const validateemail = (email) => {
    const emailPattern = /^[A-Za-z0-9_.]+\@([a-z])+\.[a-z]{3}$/;
    return emailPattern.test(email);
  };

  const validateUsername = (username) => {
    const usernamePattern = /^[a-zA-Z\s]+$/;
    return usernamePattern.test(username);
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    return passwordPattern.test(password);
  };

  const validateMobileNumber = (mobileNumber) => {
    const mobileNumberPattern = /^[0-9]{10}$/;
    return mobileNumberPattern.test(mobileNumber);
  };
  // const navigate = useNavigate();
  // const [values, setValues] = useState({
  //   username: "",
  //   email: "",
  //   // DateofBirth: "",
  //   password: "",
  //   confirmPassword: "",
  //   login_status:"",
  //   messages : [],
  //   // gender : ""
  // });
  // const [localData, setLocalData] = useState([]);

  // useEffect(() => {
  //   const storedData = localStorage.getItem("UsersData");
  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     if (Array.isArray(parsedData)) {
  //       setLocalData(parsedData);
  //     }
  //   }
  // }, []);

  // const { email, username, password, mobileNumber, dateOfBirth, login_status, messages  } = values;

  // const [duplicateError, setDuplicateError] = useState(false);
  
  // const handleSubmit = (e) => 
  // {
  //   e.preventDefault();

  //   const newFormData = {
  //     email,
  //     username,
  //     password,
  //     mobileNumber,
  //     dateOfBirth,
  //     login_status ,
  //     messages,
  //   };


  //   const existingUser = localData.find((item) => item.username === username);
  //   if (existingUser) {
  //     alert("User already exists");
  //     return;
  //   }

  //   const updatedData = [...localData, newFormData];
  //   localStorage.setItem("UsersData", JSON.stringify(updatedData));
  //   setLocalData(updatedData);
  //   setValues({
  //     email: "",
  //     username: "",
  //     password: "",
  //     mobileNumber: "",
  //     dateOfBirth: "",
  //     messages : [],
  //   });

  //   console.log(values);
  //   navigate("/");
  // };

  //   // Retrieve existing data from local storage
  //   // const existingData = JSON.parse(localStorage.getItem('RegisterData')) || []; // Set default value as an empty array if no existing data
  
  //   // // Check if the new values already exist in the existing data
  //   // const isDuplicate = existingData.some((data) => 
  //   // {
  //   //   console.log("DATA"+data)
  //   //   console.log("VALUES"+values)
  //   //   // Compare the values of the objects
  //   //   return JSON.stringify(data.username) === JSON.stringify(values.username);

  //   // });
  
  //   // if (isDuplicate) 
  //   // {
  //   //   // Handle the case when the values already exist in the form data
  //   //   alert('Data already exists and pls login');
  //   //   navigate('/');
  //   //   return;
  //   // }
  //   // Merge the new data with the existing data
  //   // const newData = [...existingData, values];
  
  //   // // Store the updated data in local storage
  //   // localStorage.setItem('RegisterData', JSON.stringify(newData));
  
  //   // // Redirect or perform any other actions after submitting the form
  //   // navigate('/');
  
  

  // const onChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  //   setDuplicateError(false); // Reset the duplicate error when the input values change
  // };

  return (
    <div className="app">
      <form onSubmit={submitHandler}>
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
          value={username}
          onChange={changeHandler}
        />
        {data.usernameError && (
            <span className="error">{data.usernameError}</span>
          )}
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          errorMessage="It should be a valid email address"
          label="Email"
          required={true}
          value={email}
          onChange={changeHandler}
        />
        {data.emailError && <span className="error">{data.emailError}</span>}
        <FormInput
         name="mobileNumber"
         type="text"
         placeholder="Mobile Number"
         errorMessage="Mobile number should be 10 digits"
         label="Mobile Number"
         maxLength={10}
         required={true}
         value={mobileNumber}
         onChange={changeHandler}
        />
        {data.mobileNumberError && (
            <span className="error">{data.mobileNumberError}</span>
          )}

        
        {/* <FormInput
          name="dateofBirth"
          type="date"
          placeholder="Date of Birth"
          label="Date of Birth"
          required={true}
          value={dateOfBirth}
          onChange={changeHandler}
        /> */}
        
        <FormInput
          name="password"
          type="text"
          placeholder="Password"
          errorMessage="Password should be 8 characters"
          pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
          label="Password"
          required={true}
          value={password}
          onChange={changeHandler}
        />
        {data.passwordError && (
            <span className="error">{data.passwordError}</span>
          )}
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

        {/* <FormInput
          name="confirmPassword"
          type="text"
          placeholder="Confirm Password"
          errorMessage="Passwords do not match"
          label="Confirm Password"
          pattern={values.password}
          required={true}
          value={values.confirmPassword}
          onChange={onChange}
        /> */}


        <button  className = "btn" type="submit" onClick={() => navigate("/login")}>Submit</button>
      </form >
    </div>
  );
};

export default PostLogin;
