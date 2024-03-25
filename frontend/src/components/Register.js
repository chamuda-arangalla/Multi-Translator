import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
  const validatePasswordStrength = (password) => {
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!firstname || !lastname || !email || !age || !dob || !password) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
    
      setError('Invalid email format.');
      return;
    }
    if (!validatePasswordStrength(password)) {
        setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return;
      }

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
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card" style={{width: "50rem", height: "40rem"}}>
          <h1 className="card-header text-center">Translator Registration</h1>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <div className="col">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <div className="col">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    placeholder="Age"
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
                <div className="col">
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
                </div>
              </div>
              <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
              <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>

              {/* ... other form fields ... */}

              <div className="mb-3 d-grid gap-2">
                <button type="submit" className="btn btn-primary">
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
  );
}
