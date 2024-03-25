import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function UpdateUser() {

    const { userId } = useParams();

    const navigate = useNavigate();


    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [role, setRole] = useState('');


    useEffect(() => {

        const fetchProfileDetails = async () => {

            try {

                const response = await axios.post("http://localhost:3017/auth/profile", { userId });


                setFirstName(response.data.firstname)
                setLastName(response.data.lastname)
                setAge(response.data.age)
                setEmail(response.data.email)
                setDob(response.data.dob)
                setRole(response.data.role)

                //window.location.reload(true);
            } catch (error) {
                alert('Data Load Unsuccessfull' + error);
                console.log(error);
            }
        };
        fetchProfileDetails();
        //alert(firstname);

    }, [])




    const handleSubmit = async () => {

        try {

            const response = await axios.put("http://localhost:3017/auth/updateUser", { userId, firstname, lastname, age, dob });

            alert("Update success")
            //window.location.reload(true);
        } catch (error) {
            alert('Update unsuccessful' + error);
            console.log(error);
        }

    }

    const cancel = () => {
        navigate(`/getUsers`);

    }


    return (

        <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
    <div className="bg-white p-4 rounded shadow-lg max-w-md w-100">
        <h1 className="text-center text-primary mb-4">Update User Details</h1>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                    First Name
                </label>
                <input
                    type="text"
                    id="firstName"
                    className="form-control"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                    Last Name
                </label>
                <input
                    type="text"
                    id="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">
                    Age
                </label>
                <input
                    type="number"
                    id="age"
                    className="form-control"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="dob" className="form-label">
                    Date of Birth
                </label>
                <input
                    type="date"
                    id="dob"
                    className="form-control"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="role" className="form-label">
                    Role
                </label>
                <input
                    type="text"
                    id="role"
                    className="form-control"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                />
            </div>
            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
                <button
                    type="button"
                    onClick={cancel}
                    className="btn btn-secondary"
                >
                    Cancel
                </button>
                
            </div>
        </form>
    </div>
</div>




    )



}