import React from 'react'
import axios from "axios";
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

        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{width: "50rem", height: "30rem"}}>
            <div className="row g-0">
                <div className="col-md-6">
                    <img src={verification_img } className="img-fluid rounded-start" alt="Login" />
                </div>
    <div className="col-md-6 mx-auto">
        <form>
            <h1 className="mb-4">Change Password</h1>

            <div className="mb-3">
                <label htmlFor="userName" className="form-label">User Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="userName"
                    placeholder="Enter Your Email"
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>

            <button
                type="button"
                className="btn btn-primary mb-3"
                onClick={sendVerificationCode}
            >
                Send Verification Code
            </button>

            <div className="mb-3">
                <label htmlFor="verificationCode" className="form-label">Verification Code</label>
                <input
                    type="text"
                    className="form-control"
                    id="verificationCode"
                    placeholder="Enter Verification Code"
                    onChange={(e) => setEnteredvalue(e.target.value)}
                />
            </div>

            <button
                type="button"
                className="btn btn-primary mb-3"
                onClick={keySubmit}
            >
                Submit
            </button>

            <button
                type="button"
                className="btn btn-secondary"
                onClick={cancel}
            >
                Cancel
            </button>
        </form>
    </div>
</div>
</div>
</div>

    )



}