import React from 'react'
import axios from "axios";
//import Styles from '../styles/Register.module.css'
import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function ChangePass() {

    const { email } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')


    const resetSubmit = async (e) => {
        e.preventDefault();

        try {

            if (password === newPassword) {
                const response = await axios.post('http://localhost:3017/auth/changePassword', { email, password });



                if (response.data.changed == true) {

                    alert("Password Changed Plese Loging again")
                    navigate('/login');
                } else {

                    alert("Password Not Changed Please Try again")
                    navigate('/fogotPassword');

                }

            }

        } catch (error) {

            alert("Something went wrong")
            console.log(error);
        }
    };

    const cancel = () => {

        navigate('/login');


    }


    return (
        <div style={{ height: "90vh" }} className="container d-flex justify-content-center align-items-center">
    <div className="col-md-6">
        <form method="post" encType="multipart/form-data">
            <h1 className="mb-4">Change Password</h1>

            <div className="mb-3">
                <label htmlFor="email">User Name</label>
                <input type="email" className="form-control" placeholder="Enter email" value={email} disabled />
            </div>

            <div className="mb-3">
                <label htmlFor="newPassword">New Password</label>
                <input type="password" className="form-control" placeholder="Enter new password" onChange={e => setNewPassword(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" className="form-control" placeholder="Confirm new password" onChange={e => setPassword(e.target.value)} />
            </div>

            <button type="button" className="btn btn-primary mr-2" onClick={resetSubmit}>
                Submit
            </button>

            <button type="button" className="btn btn-secondary" onClick={cancel}>
                cnacel
            </button>
        </form>
    </div>
</div>


    )



}