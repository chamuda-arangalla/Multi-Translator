import React from 'react'
import axios from "axios";
//import Styles from '../styles/Register.module.css'
import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import '../css/FogotPassword.css';
import u_png from '../images/u.png'
import e_png from '../images/e.png'
import EM_png from '../images/EM.png'
import ps_png from '../images/ps.png'

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
        <div className="container d-flex justify-content-center align-items-center">

        <div className="Card" style={{ height: "65vh", width: "30 rem" }}>

        <div className="row g-0 container d-flex justify-content-center align-items-center">
                    <div className="col-md-5 mb-3">
                        <img src={u_png} className="img-fluid rounded-start" alt="Login" />
                        <img src={e_png} className="img-fluid rounded-start" style={{width: "5rem"}} alt="Login" />
                    </div>
    <div className="col-md-9 mx-auto container d-flex justify-content-center align-items-center">
        <form method="post" encType="multipart/form-data">
            <h1 className="mb-4">Change Password</h1>

            <div className="form-outline11 mb-3">
                {/*<label htmlFor="email">User Name</label>*/}
                <input type="email" className="control" placeholder="Username" value={email} disabled />
                <img src={EM_png} className="img-fluid rounded-start" alt="Login" />
            </div>

            <div className="form-outline14 mb-3">
                {/*<label htmlFor="newPassword">New Password</label>*/}
                <input type="password" className="control" placeholder="Enter new password" onChange={e => setNewPassword(e.target.value)} />
                <img src={ps_png} className="img-fluid rounded-start"  alt="Login" />
            </div>

            <div className="form-outline15 mb-3">
                {/*<label htmlFor="confirmPassword">Confirm Password</label>*/}
                <input type="password" className="control" placeholder="Confirm new password" onChange={e => setPassword(e.target.value)} />
                <img src={ps_png} className="img-fluid rounded-start"  alt="Login" />
            </div>

            <button type="button" className="btn btn-secondary mr-2" style={{width: "8rem"}} onClick={resetSubmit}>
                Submit
            </button>

            <button type="button" className="cancel btn btn-secondary" onClick={cancel}>
                cancel
            </button>
        </form>
    </div>
    </div>
</div>
</div>


    )



}