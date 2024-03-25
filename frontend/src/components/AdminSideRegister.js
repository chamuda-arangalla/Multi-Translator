import React, { useEffect } from 'react'
import axios from "axios";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminSideRegister() {


    const navigate = useNavigate();


    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();

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

            alert("User add success")
            navigate('/adminHome')
        } catch (error) {
            alert(error)
            console.log(error);
        }
    };

    useEffect(() => {

        setRole('admin')


    }, []);


    return (
        <div className='container d-flex justify-content-center align-items-center' style={{ height: "90vh" }}>
            <form className='mt-5 border border-secondary border-2 rounded p-4 shadow'>
                <h1 className='text-primary text-center mb-4'>Register Form</h1>

                <div className='row mb-3'>
                    <div className='col-md-6'>
                        <label>First Name</label>
                        <input type='text' className='form-control' placeholder='First Name' onChange={e => setFirstName(e.target.value)} required />
                    </div>
                    <div className='col-md-6'>
                        <label>Last Name</label>
                        <input type='text' className='form-control' placeholder='Last Name' onChange={e => setLastName(e.target.value)} required />
                    </div>
                </div>

                <div className='row mb-3'>
                    <div className='col-md-6'>
                        <label>Email</label>
                        <input type='email' className='form-control' placeholder='Enter email' onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className='col-md-6'>
                        <label>Age</label>
                        <input type='number' className='form-control' placeholder='Age' onChange={e => setAge(e.target.value)} required />
                    </div>
                </div>

                <div className='row mb-3'>
                    <div className='col-md-6'>
                        <label>Date Of Birth</label>
                        <input type='date' className='form-control' onChange={e => setDob(e.target.value)} required />
                    </div>
                    <div className='col-md-6'>
                        <label><b>Password</b></label>
                        <input type='password' className='form-control' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                    </div>
                </div>

                <div className='row mb-3'>
                    <div className='col-md-12'>
                        <label><b>Role</b></label>
                        <select name='role' className='form-control' onChange={e => setRole(e.target.value)} required>
                            <option value='admin'>Admin</option>
                            <option value='user'>User</option>
                        </select>
                    </div>
                </div>

                <button type='submit' className='btn btn-primary w-100' onClick={handleSubmit}>Submit</button>
                <br />
                <br />
                <Link to='/login' className='btn btn-danger w-100'>Cancel</Link>
            </form>
        </div>

    )



}