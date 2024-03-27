import React from 'react'
import axios from "axios";
import '../css/Login.css';
//import Styles from '../styles/Register.module.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import login_img from '../images/Login.jpg'
import u_png from '../images/u.png'
import e_png from '../images/e.png'
import user_png from '../images/user.png'
import ps_png from '../images/ps.png'
import fb_png from '../images/fb.png'
import google_png from '../images/google.png'
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
       
        <div className="container d-flex justify-content-center align-items-center">
           
            <div className="Card" style={{width: "30rem"}}>
                <div className="row g-0 container d-flex justify-content-center align-items-center">
                    <div className="col-md-7 mb-2">
                        <img src={u_png} className="img-fluid rounded-start" alt="Login" />
                        <img src={e_png} className="img-fluid rounded-start" style={{width: "5rem"}} alt="Login" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title text-center mb-4"> Login </h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-3">
                                    {/*<label htmlFor="email" className="form-label">Username</label>*/}
                                    <input type="email" className="control" id="email" placeholder="Username" onChange={(e) => setEmail(e.target.value)} required />
                                    <img src={user_png} className="img-fluid rounded-start"  alt="Login" />
                                </div>
                                <div className="form-outline2 mb-4">
                                    {/*<label htmlFor="password" className="form-label">Password</label>*/}
                                    <input type="password" className="control" id="password" placeholder="&nbsp;Password" onChange={(e) => setPassword(e.target.value)} required />
                                    <img src={ps_png} className="img-fluid rounded-start"  alt="Login" />
                                </div>
                                <div className="mb-4 d-grid gap-2 container d-flex justify-content-center align-items-center">
                                    <button type="submit" className="btn btn-secondary" style={{width: "8rem"}}>Login</button>
                                    {/*<a href="/register" className="btn btn-primary">Register</a>*/}
                                </div>
 
                                <div className="text-center">
                                    <span class="text-center fw-bold mx-4 mb-0">
                                         Don't have an account? <Link to="/Register">Register</Link>
                                    </span>
                                   </div>
 
                                <div class="divider d-flex align-items-center my-1">
                                      <p class="text-center fw-bold mx-3 mb-0">or continue with</p>
                                </div>
 
                                <div className="mx-2 my-1 container d-flex justify-content-center align-items-center">
                                <a class="nav-link" href="https://facebook.com/?_rdc=1&_rdr"><img src={fb_png} className="img-fluid rounded-start" style={{width: "5rem"}} alt="Login" /></a>
                                <a class="nav-link" href="https://accounts.google.com/v3/signin/identifier?ifkv=ARZ0qKIB7iY3gBASX5q1QnqJtovIixK_BmGD8oziA-47TUGuhb9R45HnmHciTqDzvDWIf3I5MzU0&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-2113908948%3A1711027852069384&theme=mn&ddm=0"><img src={google_png} className="img-fluid rounded-start" style={{width: "6.5rem"}} alt="Login" /></a>
                                </div>
                               
                                {/* Forgot password link */}
                                <div className="mb-2 text-center">
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