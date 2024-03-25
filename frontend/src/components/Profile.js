import React from "react"
import axios from "axios";
//import Styles from '../styles/Register.module.css'
import { useState, useEffect } from 'react';
import jwt from 'jwt-decode'
import { Link } from "react-router-dom";
 
import Avatar_png from '../images/Avatar.png'
 
 
export default function Profile() {
 
 
 
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
 
 
    useEffect(() => {
 
        const fetchProfileDetails = async () => {
            const token = localStorage.getItem('token')
            const decoded = jwt(token);
            const userId = decoded.userId;
 
            try {
 
 
                const response = await axios.post("http://localhost:3017/auth/profile", { userId });
 
 
                setFirstName(response.data.firstname)
                setLastName(response.data.lastname)
                setAge(response.data.age)
                setEmail(response.data.email)
                setDob(response.data.dob)
                setPassword(response.data.password)
                setRole(response.data.role)
 
                //window.location.reload(true);
            } catch (error) {
                alert('Data Load Unsuccessfull' + error);
                console.log(error);
            }
        };
        fetchProfileDetails();
        // alert(firstname);
 
    }, [])
 
 
 
 
    const deleteProfileDetails = async () => {
 
        const token = localStorage.getItem('token')
        const decoded = jwt(token);
        const userId = decoded.userId;
 
        try {
 
            const response = await axios.post("http://localhost:3017/auth/deleteUser", { userId });
 
            alert(response)
 
            localStorage.clear();
            window.location.href = '/login';
 
 
 
            //window.location.reload(true);
        } catch (error) {
            alert('Delete unsuccessful' + error);
            console.log(error);
        }
    };
 
 
 
    const updateProfileDetails = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')
        const decoded = jwt(token);
        const userId = decoded.userId;
 
        try {
 
 
            const response = await axios.put("http://localhost:3017/auth/updateUser", { userId, firstname, lastname, age, dob });
 
 
 
 
            //window.location.reload(true);
        } catch (error) {
            alert('Update unsuccessful' + error);
            console.log(error);
        }
    };
 
    return (
 
        <div className="container d-flex justify-content-center align-items-center">
        <div className="Card col-md-6" style={{width: "50rem", height: "45rem"}}>
                <div className="col-md-7 mb-3 container d-flex justify-content-center align-items-center">
                    <img src={Avatar_png} className="img-fluid rounded-start" style={{width: "10rem"}} alt="Login" />
                </div>
 
            <div className="col-md-8 mx-auto">
                <div className="text-center">
                    <h1><b>Hello {firstname}</b></h1>
                   
                </div><br />
 
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="firstNameInput">First Name</label>
                        <input type="text" className="form-control col-md-10" value={firstname} id="firstNameInput" onChange={e => setFirstName(e.target.value)} placeholder="Enter First Name" />
                    </div>
 
                    <div className="col-md-6">
                        <label htmlFor="LastNameInput">Last Name</label>
                        <input type="text" className="form-control col-md-10" value={lastname} id="LastNameInput" onChange={e => setLastName(e.target.value)} placeholder="Enter Last Name" />
                    </div>
                </div>
 
                <div className="row mt-3">
                    <div className="col-md-6">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="text" className="form-control col-md-10" value={email} id="exampleInputEmail1" onChange={e => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter email" readOnly />
                    </div>
 
                    <div className="col-md-6">
                        <label htmlFor="AgeInput">Age</label>
                        <input type="number" className="form-control col-md-10" value={age} id="AgeInput" onChange={e => setAge(e.target.value)} placeholder="Enter Age" />
                    </div>
                </div>
 
                 <div className="row mt-3">
                   {/* <div className="col-md-6">
                        <label htmlFor="DobInput">DOB</label>
                        <input type="date" className="form-control col-md-10" value={dob} id="DobInput" onChange={e => setDob(e.target.value)} />
                    </div>*/}
 
                    <div className="col-md-6">
                        <label htmlFor="RoleInput">Role</label>
                        <input type="text" className="form-control col-md-10" value={role} id="RoleInput" onChange={e => setRole(e.target.value)} placeholder="Role" readOnly />
                    </div>
                </div>
 
                <div className="row mt-3">
                    <div className="col-md-4">
                        <button className="btn btn-primary" onClick={updateProfileDetails}>Update</button>
                    </div>
 
                    <div className="col-md-4">
                        <button className="btn btn-danger" onClick={deleteProfileDetails}>Delete</button>
                    </div>
 
                    <div className="col-md-auto">
                       <a href="/translatorhistory">
                       <button className="btn btn-secondary btn-block">
                        View History
                       </button>
                       </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
   
   
 
 
 
 
 
 
 
    )
}