import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
//import "../App.css";
import { IconContext } from "react-icons";
import "./navbar.css"

import homeI_png from '../images/homeI.png'
import trans1_png from '../images/trans1.png'
import com1_png from '../images/com1.png'

import Reg_png from '../images/Reg.png'
import MyAcc_png from '../images/MyAcc.png'
import logout_png from '../images/logout.png'
import Mlogo1_jpg from '../images/Mlogo1.jpg'
import e_png from '../images/e.png'

import { IoLanguage } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { MdConstruction, MdOutlineImageSearch } from "react-icons/md";

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

        <nav class="navbar navbar-expand-lg navbar-light">
        <div className="container">
   
          <a className="menu-bars" href="#">
          {/*<FaIcons.FaBars onClick={showSidebar} />*/}
           </a>

           <a href="/home">
             <img className="navbarlogo" src={Mlogo1_jpg} alt="logo" width="70px"/>
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
                        <li class="nav-item">
                            <a class="Home nav-link" href="/home">
                            <button class="hom btn btn-green">
                                Home
                            </button>
                            </a>
                            <a class="nav-link" href="/home"><img src={homeI_png} className="homI img-fluid rounded-start" alt="Login" /></a>
                        </li>

                        {/*<li class="nav-item">
                            <a class="Translate nav-link" href="/allpost">
                                Translation
                            </a>
                           </li>*/}

                        <div class="dropdown">
                            <button class="Trans btn btn-green dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Translation
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="home"><IoLanguage/>&nbsp;Translate</a>
                                <a class="dropdown-item" href="imageRecognition"><MdOutlineImageSearch/>&nbsp;Image to Text Translation</a>
                                <a class="dropdown-item" href="voicetotexttage"><MdConstruction/>&nbsp;Voice To Text</a>
                                {/*<a class="dropdown-item" href="translatorhistory"><FaHistory/>&nbsp;My History</a>*/}
                                
                            </div>
                            <a class="nav-link" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={trans1_png} className="transI img-fluid rounded-start" alt="Login" /></a>
                        </div>
                        
                        
                        
                        <li class="nav-item">
                            <a class="Community nav-link"  href="/allpost">
                                <button class="com btn btn-green">
                                Community
                                </button>
                            </a>
                            <a class="nav-link" href="/allpost"><img src={com1_png} className="comI img-fluid rounded-start" alt="Login" /></a>
                        </li>
                        
                        <li class="profile nav-item">
                            <a class="nav-link" href="/profile">
                                Profile
                            </a>
                            <a class="nav-link" href="/profile"><img src={MyAcc_png} className="MyAcc img-fluid rounded-start" alt="Login" /></a>
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
                            <a class="nav-link" href="#" onClick={() => logOut()}><img src={logout_png} className="logout img-fluid rounded-start" alt="Login" /></a>
                        </li>

                        {/*<li class="nav-item">
                            <a class="nav-link" href="#" onClick={() => logOut()}>
                                Translate
                            </a>
                            <a class="nav-link" href="#" onClick={() => logOut()}><img src={logout_png} className="logout img-fluid rounded-start" alt="Login" /></a>
                    </li>*/}
                    </>
                )}
                {!role && (
                    <>
                        <li class="nav-item">
                            <a class="Login nav-link" href="/login">
                                Login
                            </a>
                            <a class="nav-link" href="/login"><img src={MyAcc_png} className="LoginI img-fluid rounded-start" alt="Login" /></a>
                        </li>
                        <li class="nav-item">
                            <a class="Reg nav-link" href="/register">
                                Register
                            </a>
                            <a class="nav-link" href="/register"><img src={Reg_png} className="RegI img-fluid rounded-start" alt="Login" /></a>
                        </li>
                    </>
                )}
            </ul>
        </div>
    </div>
</nav>
        
        {/*<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <a className="menu-bars2" href="#">
                <AiIcons.AiOutlineClose />
              </a>
              <img className="sidebarlogo" src={Mlogo1_jpg} alt="logo" width="70px"/>
            </li>

            {/*SidebarData.map((item, index) => {
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
        </nav>*/}
      </IconContext.Provider>
    </>
  );
}

export default Navbar;