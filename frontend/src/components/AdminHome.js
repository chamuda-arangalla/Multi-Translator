import React from "react";
import '../css/adminhome.css';
import User_manage from '../images/user management.jpg'
import User_Posts from '../images/user posts.jpg'

export default function AdminHome() {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="row">
           
                <div className="card" style={{ width: "30rem", height: "30rem"}}>
                <img class="card-img-top" src={User_manage} alt="Card image cap"  style={{ width: "20rem", height: "20rem"}}/>
                    <div className="card-body">
                        <h2 className="card-title">User Management</h2>
                        <p className="card-text">Manage user accounts</p>
                        <a href="/getUsers" className="btn btn-primary mb-3">Go to User Management</a>
                    </div>
                </div>
           
        </div>
        
        <div className="row">
            
        <div className="card" style={{ width: "30rem", height: "30rem"}}>
        <img class="card-img-top" src={User_Posts} alt="Card image cap"  style={{ width: "20rem", height: "20rem"}}/>
    <div className="card-body">
        <h2 className="card-title">View Posts</h2>
        <p className="card-text">Manage user posts</p>
        <a href="/allpost" className="btn btn-primary mb-3">Go to User Posts</a>
    </div>
    </div>

            
        </div>
    </div>
    
    
    );
}


