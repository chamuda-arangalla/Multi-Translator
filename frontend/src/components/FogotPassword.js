import React from 'react'
import axios from "axios";
 
import '../css/FogotPassword.css';
import u_png from '../images/u.png'
import e_png from '../images/e.png'
import EM_png from '../images/EM.png'
import Role_png from '../images/Role.png'
 
//import Styles from '../styles/Register.module.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import verification_img from '../images/verification.jpg'
export default function FogotPassword() {
 
 
    const navigate = useNavigate();
 
    const [email, setUserName] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [enteredvalue, setEnteredvalue] = useState('')
 
    const keySubmit = async (e) => {
        e.preventDefault();
        try {
 
 
            if (enteredvalue === verificationCode) {
 
                alert(enteredvalue + verificationCode)
                navigate('/changePassword/' + email);
 
            } else {
 
                alert("Your Varification code not valid Please try Again")
                navigate('/login');
 
            }
 
 
        } catch (error) {
 
            alert("Something went wrong")
            console.log(error);
        }
    };
 
    const sendVerificationCode = async (e) => {
        e.preventDefault();
 
        try {
 
            const key = generateVerificationCode();
 
            const response = await axios.post('http://localhost:3017/auth/sendVerificationCode', { email, key });
 
            const verificationCode = response.data.Digits;
            alert("Verification code sent: ");
 
            setVerificationCode(verificationCode);
 
 
        } catch (error) {
 
            alert("Something went wrong" + error)
            console.log(error);
        }
    };
 
    const cancel = () => {
 
 
        navigate('/login')
 
    }
 
    const generateVerificationCode = () => {
        const codeLength = 6; // Length of the verification code
        return nanoid(codeLength);
    };
 
 
    return (
 
        <div className="container d-flex justify-content-center align-items-center">
        <div className="Card" style={{width: "30rem"}}>
        <div className="row g-0 container d-flex justify-content-center align-items-center">
                    <div className="col-md-7 mb-3">
                        <img src={u_png} className="img-fluid rounded-start" alt="Login" />
                        <img src={e_png} className="img-fluid rounded-start" style={{width: "5rem"}} alt="Login" />
                    </div>
    <div className="col-md-9 mx-auto ">
        <form>
            <h1 className="mb-4">Change Password</h1>
 
            <div className="form-outline12 mb-3">
               {/*<label htmlFor="userName" className="form-label">User Email</label>*/}
                <input
                    type="email"
                    className="control"
                    id="userName"
                    placeholder="Enter Your Email"
                    onChange={(e) => setUserName(e.target.value)}
                />
                <img src={EM_png} className="img-fluid rounded-start" alt="Login" />
            </div>
 
            <button
                type="button"
                className="vb btn btn-secondary mb-3" style={{width: ""}}
                onClick={sendVerificationCode}
            >
                Send Verification Code
            </button>
 
            <div className="form-outline13 mb-3">
                {/*<label htmlFor="verificationCode" className="form-label">Verification Code</label>*/}
                <input
                    type="text"
                    className="control"
                    id="verificationCode"
                    placeholder="Enter Verification Code"
                    onChange={(e) => setEnteredvalue(e.target.value)}
                />
                <img src={Role_png} className="img-fluid rounded-start" alt="Login" />
            </div>
 
            <button
                type="button"
                className="btn btn-secondary" style={{width: "8rem"}}
                onClick={keySubmit}
            >
                Submit
            </button>
 
            <button
                type="button"
                className="cancel btn btn-secondary"
                onClick={cancel}
            >
                Cancel
            </button>
        </form>
        <br></br>
    </div>
</div>
</div>
</div>
 
    )
 
 
 
}