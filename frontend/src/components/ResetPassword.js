import React from 'react'
import axios from "axios";
//import Styles from '../styles/Register.module.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ResetPassword() {


    const [email, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')


    const resetSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send login request to the backend API
            const response = await axios.post('http://localhost:3017/auth/resetPassword', { email, password, oldPassword });


            alert(response)

            if (response.data.pass == true) {

                alert("Password Changed Plese Loging again")
                window.location.reload('/login');
            } else {

                alert("Password Not Changed Please Try again")
                window.location.reload('/resetPassword');

            }


        } catch (error) {

            alert("Something went wrong")
            console.log(error);
        }
    };

    const cancel = () => {

        window.location.reload('/profile')

    }



    return (

        <div class="container d-flex justify-content-center mt-5">
        <form class="border border-gray-300 rounded-lg shadow-lg p-4 w-80">
            <h1 class="text-2xl font-bold text-center text-primary mb-4">Change Password</h1>
    
            <div class="mb-3">
                <label for="userName" class="form-label">User Name</label>
                <input type="email" class="form-control" id="userName" placeholder="Enter your email" onChange={(e) => setUserName(e.target.value)} />
            </div>
    
            <div class="mb-3">
                <label for="oldPassword" class="form-label">Old Password</label>
                <input type="password" class="form-control" id="oldPassword" placeholder="Enter your old password" onChange={(e) => setOldPassword(e.target.value)} />
            </div>
    
            <div class="mb-3">
                <label for="newPassword" class="form-label">New Password</label>
                <input type="password" class="form-control" id="newPassword" placeholder="Enter your new password" onChange={(e) => setPassword(e.target.value)} />
            </div>
    
            <div class="d-flex justify-content-between align-items-center">
                <button type="submit" class="btn btn-primary" onClick={resetSubmit}>Submit</button>
    
                <div ></div> 
    
                <a href="/profile" class="btn btn-danger" onClick={cancel}>Cancel</a>
            </div>
        </form>
    </div>
    
    )



}