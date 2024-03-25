import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
//import "../App.css";
import { IconContext } from "react-icons";
import "./navbar.css"

import Logo from "../images/ceylonetranslater_logo.png";


function Navbar() {
  const [sidebar, setSidebar] = useState(false);

const showSidebar = () => setSidebar(!sidebar);
  const [user, setUser] = useState({});
    const [role, setRole] = useState("");
    
    const logOut = () => {
        localStorage.clear();
        window.location.href = '/login';
    }

    useEffect(() => {
        const data = localStorage.getItem("user");
        setUser(JSON.parse(data));
        setRole(localStorage.getItem("role"));
    }, []);

  return (
    <>

    <IconContext.Provider value={{ color: "undefined" }}>
        {/* <div className="navbar">
          <a className="menu-bars" href="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </a>
          <img className="navbarlogo" src={Logo} alt="logo" width="50px"/>

        </div> */}

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
   
          <a className="menu-bars" href="#">
          <FaIcons.FaBars onClick={showSidebar} />
         </a>



        {/* <a class="navbar-brand" href="/allpost">
        <img className="navbarlogo" src={Logo} alt="logo" width="50px"/>
        </a> */}


        {/* <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button> */}
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                {role === 'admin' && (
                    <>
                        <li class="nav-item">
                            <a class="nav-link" href="/adminHome">
                                Admin Home
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/profile">
                                Profile
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/resetPassword">
                                Change Password
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"  onClick={() => logOut()}>
                                LogOut
                            </a>
                        </li>
                    </>
                )}
                {role === 'user' && (
                    <>
                        {/* <li class="nav-item">
                            <a class="nav-link" href="/allpost">
                                Home
                            </a>
                        </li> */}
                        <li class="nav-item">
                            <a class="nav-link" href="/profile">
                                Profile
                            </a>
                        </li>
                        {/* <li class="nav-item">
                            <a class="nav-link" href="/resetPassword">
                                Change Password
                            </a>
                        </li> */}
                        <li class="nav-item">
                            <a class="nav-link" href="#" onClick={() => logOut()}>
                                LogOut
                            </a>
                        </li>
                    </>
                )}
                {!role && (
                    <>
                        <li class="nav-item">
                            <a class="nav-link" href="/login">
                                Login
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/register">
                                Register
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </div>
    </div>
</nav>
        
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <a className="menu-bars2" href="#">
                <AiIcons.AiOutlineClose />
              </a>
              <img className="sidebarlogo" src={Logo} alt="logo" width="50px"/>

            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <a href={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                </li>
              );
            })}

          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;