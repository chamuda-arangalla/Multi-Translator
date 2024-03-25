import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import jsPdf from 'jspdf';
import 'jspdf-autotable';

export default function ViewAllUsers() {


    const navigate = useNavigate();


    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch the list of courses from your server when the component mounts
        async function getUsers() {
            try {
                const response = await axios.post('http://localhost:3017/auth/getAllUsers'); // Adjust the endpoint based on your API route
                setUsers(response.data);


            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        getUsers();
    }, []);


    const [filter, setFilter] = useState("");
    const [filterRole, setfilterRole] = useState("");

    function handleFilterChange(e) {
        setFilter(e.target.value);
    }

    function filterRoleOp(e) {
        setfilterRole(e.target.value);
    }

    const filteredReports = users.filter((rep) => {
        return rep.firstname.toLowerCase().includes(filter.toLowerCase()) & rep.role.toLowerCase().includes(filterRole.toLowerCase());
    })


    function generatePdf() {
        const unit = "pt";
        const size = "A3";
        const orientation = "portrait";
        const marginLeft = 40;
        const doc = new jsPdf(orientation, unit, size);

        // Assuming you have an image for the logo
        // const imageData = logo;

        doc.setFontSize(15);

        const title = "Application Users";

        const headers = [
            ["First Name", "Last Name", "Age", "Email", "DOB", "Role"]
        ];

        const data = filteredReports.map((user) => [
            user.firstname,
            user.lastname,
            user.age,
            user.email,
            user.dob,
            user.role
        ]);

        let content = {
            startY: 50,
            head: headers,
            body: data,
        };

        // Uncomment this if you have an image for the logo
        // doc.addImage(imageData, "JPEG", 10, 10, 50, 50);

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("UserDetails.pdf");
        //toast("Doctor Appointments Report Download");
    }


    async function deleteUser(userId) {

        try {

            const response = await axios.post("http://localhost:3017/auth/deleteUser", { userId });
            alert("Success Delete User")
            window.location.reload();

        } catch (error) {
            alert('Delete unsuccessful' + error);
            console.log(error);
        }

    }




    return (

        <div className="container mx-auto p-4">
        <div className="bg-primary p-3 mb-2 bg-warning text-dark">
            <h1 className="text-4xl mb-4">All Users</h1>
            <div className="row">
                <div className="col-md-3">
                    <div className="form-group">
                        <label for="roleFilter">Role Filter</label>
                        <select className="form-control" id="roleFilter" onChange={filterRoleOp}>
                            <option value="">All</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group">
                        <label for="search">Search Name</label>
                        <input type="text" className="form-control" placeholder="Search by Name" onChange={handleFilterChange} />
                    </div>
                </div>
                <div className="col-md-3">
                    <br />
                    <button type="button" className="btn btn-light" onClick={() => { generatePdf() }}>Download All Details</button>
                </div>
                {/* <div className="col-md-3">
                        <br />
                     <button type="button" className="btn btn-light" onClick={() => { navigate(`/adminRegister`) }}>Add New User</button>
                    </div> */}
            </div>
        </div>
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Email</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Role</th>
                        <th scope="col">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports.map((user) => (
                        <tr key={user._id}>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.age}</td>
                            <td>{user.email}</td>
                            <td>{user.dob}</td>
                            <td>{user.role}</td>
                            <td className="space-x-2">
                                <a href={'/updateUsers/' + user._id}><button className="btn btn-sm text-white bg-primary">Update</button></a>
                                <button className="btn btn-sm text-white bg-danger" onClick={() => deleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    




    )



}