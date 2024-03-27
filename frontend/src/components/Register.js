
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Register.css';
 
import u_png from '../images/u.png'
import e_png from '../images/e.png'
import FN_png from '../images/FN.png'
import Age_png from '../images/Age.png'
import EM_png from '../images/EM.png'
import ps_png from '../images/ps.png'
 
export default function Register() {
  const navigate = useNavigate();
 
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const role = 'user';
  const [error, setError] = useState('');
 
  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  /*const validatePasswordStrength = (password) => {
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };*/
 
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    // Validation
    if (!firstname || !lastname || !email || !age || !password) {
      setError('All fields are required.');
      return;
    }
 
    if (!validateEmail(email)) {
   
      setError('Invalid email format.');
      return;
    }
    /*if (!validatePasswordStrength(password)) {
        setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return;
      }*/
 
    try {
      await axios.post('http://localhost:3017/auth/register', {
        firstname,
        lastname,
        email,
        age,
        dob,
        password,
        role,
      });
 
      alert('success');
      navigate('/login');
    } catch (error) {
      setError('Registration failed. Please try again later.');
      console.error(error);
    }
  };
 
  return (
    <div className="container d-flex justify-content-center align-items-center">
     
        <div className="RCard" style={{width: "30rem"}}>
        <div className="row g-0  container d-flex justify-content-center align-items-center">
                    <div className="col-md-7 mb-2">
                        <img src={u_png} className="img-fluid rounded-start" alt="Login" />
                        <img src={e_png} className="img-fluid rounded-start" style={{width: "5rem"}} alt="Login" />
                    </div>
         
          <div className="col-md-8">
          <div className="card-body">
          <h1 className="Rcard-title text-center mb-4">Registration</h1>
          <form onSubmit={handleSubmit}>
                <div className="Rform-outline mb-3">
                  {/*<label htmlFor="firstName" className="form-label">
                    First Name
                     </label>*/}
                  <input
                    type="text"
                    className="control"
                    id="First Name"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <img src={FN_png} className="img-fluid rounded-start"  alt="Login" />
                </div>
                <div className="Rform-outline2 mb-3">
                  {/*<label htmlFor="lastName" className="form-label">
                    Last Name
                    </label>*/}
                  <input
                    type="text"
                    className="control"
                    id="lastName"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <img src={FN_png} className="img-fluid rounded-start"  alt="Login" />
                </div>
 
             
                <div className="Rform-outline3 mb-3">
                  {/*<label htmlFor="age" className="form-label">
                    Age
                  </label>*/}
                  <input
                    type="number"
                    className="control"
                    id="age"
                    placeholder="Age"
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                  <img src={Age_png} className="img-fluid rounded-start"  alt="Login" />
                </div>
                {/*<div className="col">
                  <label htmlFor="dob" className="form-label">
                    Entered date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </div>*/}
              <div class="Rform-outline4 mb-3">
                        {/*<label for="email" class="form-label">Email</label>*/}
                        <input type="email" class="control" id="email" placeholder="Email*" onChange={(e) => setEmail(e.target.value)} required />
                        <img src={EM_png} className="img-fluid rounded-start"  alt="Login" />
                    </div>
              <div class="Rform-outline5 mb-3">
                        {/*<label for="password" class="form-label">Password</label>*/}
                        <input type="password" class="control" id="password" placeholder="Password*" onChange={(e) => setPassword(e.target.value)} required />
                        <img src={ps_png} className="img-fluid rounded-start"  alt="Login" />
                    </div>
 
                    <div class="Rform-outline6 mb-4">
                        {/*<label for="password" class="form-label">Password</label>*/}
                        <input type="password" class="control" id="password" placeholder="Confirm Password*" onChange={(e) => setPassword(e.target.value)} required />
                        <img src={ps_png} className="img-fluid rounded-start"  alt="Login" />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
           
 
              {/* ... other form fields ... */}
 
              <div className="mb-4 d-grid gap-2 container d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-secondary" style={{width: "8rem"}}>
                  Submit
                </button>
              </div>
              <div className="text-center">
                <span>
                  Already have an account? <Link to="/login">Login</Link>
                </span>
              </div>
            </form>
          </div>
          </div>
          </div>
        </div>
    </div>
  );
}
 