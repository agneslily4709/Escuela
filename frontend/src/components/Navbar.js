import React from 'react'
import { Link } from 'react-router-dom';
import { userContext } from '../App';
import { useContext } from 'react';
export default function Navbar(props) {
    const { authState } = useContext(userContext);
    const RenderMenu=()=>{
        if(authState.isAuthenticated){
            return(
                <>
                
                <nav className="navbar navbar-expand-lg my-navbar py-3 fixed-top">
                        <div className="container">
                        <a className="navbar-brand my-navbar-item" href="/">ESCUELA</a>
                            <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span style={{color:"white"}}>↓↓↓</span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li className="nav-item"><Link className="nav-link my-navbar-item" to="/profile" >Profile</Link></li>
                            <li className="nav-item"><Link className="nav-link my-navbar-item" to="/contact" >Contact</Link></li>
                            <li className="nav-item"><Link className="nav-link my-navbar-item" to="/announcements" >Announcements</Link></li>
                            <li className="nav-item"><Link className="nav-link my-navbar-item" to="/certificate" >Certificate</Link></li>
                            <li className="nav-item"><Link className="nav-link my-navbar-item" to="/logout" >Logout</Link></li>
                    </ul>
                    </div>
                </div>
                </nav>                    
                </>
            )
        }
        else{
            return(
                <>
                <nav className="navbar my-navbar py-3 fixed-top navbar-expand-lg">
                <div className="container">
                    <li className="navbar-brand my-navbar-item">ESCUELA</li>
                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span style={{color:"white"}}>↓↓↓</span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                    <li className="nav-item"><Link className="nav-link my-navbar-item" to="/register"> Register </Link></li>
                    <li className="nav-item"><Link className="nav-link my-navbar-item" to="/login" > Login</Link></li>
                    <li className="nav-item"><Link className="nav-link my-navbar-item" to="/staff" > Staff</Link></li>
                    </ul>
                    </div>
                </div>
                </nav>                    

                </>
            )
        }
    }

    return (
        <><RenderMenu /></>
    )
}