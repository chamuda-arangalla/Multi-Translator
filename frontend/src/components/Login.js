import React from 'react'
import axios from "axios";
//import Styles from '../styles/Register.module.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import login_img from '../images/Login.jpg'
import { Link } from 'react-router-dom';

export default function Login() {


    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [jwtToken, setJwtToken] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            // Send login request to the backend API
            const response = await axios.post('http://localhost:3017/auth/login', { email, password });
            const token = response.data.token;
            const role = response.data.role
            const userIdd = response.data.userIdd

            // Store the token in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('userid', userIdd);

            // alert("Login success" + role)

            window.location.reload(true);


        } catch (error) {

            alert("Login Unsuccess")
            console.log(error);

        }
    };


    const googleAuth = async () => {

        try {

            const popup = window.open("http://localhost:3017/auth/google", "_blank", "width=600,height=600");


            const receiveMessage = (event) => {
                if (event.origin === "http://localhost:3017" && event.data.token && event.data.role) {
                    const { token, role } = event.data;


                    // Store the token in local storage
                    localStorage.setItem('token', token);
                    localStorage.setItem('role', role);
                   



                    // Close the popup
                    popup.close();
                    window.removeEventListener("message", receiveMessage);

                    window.location.reload(true);
                }
            };



            // Add event listener to receive messages from the popup
            window.addEventListener("message", receiveMessage);

        } catch (error) {

            alert("Invalid Credentials")
            console.log(error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('role') === 'admin') {
            navigate('/adminHome');

        } else if (localStorage.getItem('role') === 'user') {
            navigate('/home');
        }
        else {
            navigate('/login')
        }
    }, []);


    return (
        
        <div className="container d-flex justify-content-center align-items-center vh-100">
            
            <div className="card" style={{width: "50rem", height: "30rem"}}>
                <div className="row g-0">
                    <div className="col-md-6">
                        <img src={login_img} className="img-fluid rounded-start" alt="Login" />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <h1 className="card-title text-center mb-4"> Translator Login </h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="mb-3 d-grid gap-2">
                                    <button type="submit" className="btn btn-success">Login</button>
                                    <a href="/register" className="btn btn-primary">Register</a>
                                </div>
                                {/* Forgot password link */}
                                <div className="mb-3 text-center">
                                    <span>Forgot Password? <a href='/fogotPassword'>Reset</a></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
    

    )

}