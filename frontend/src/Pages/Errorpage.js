import React from 'react';
import { Link } from 'react-router-dom';
import ErrorImg from "../Assets/error.png"
import '../styles.css'
const Errorpage = () => {
  return (
    <div className="my-container">
        <img src={ErrorImg} className='error-img' alt='404 Page not found'/>
    <Link to="/login"><button  className="mt-5 my-button">Home Page</button> </Link>
    </div>
  )
}
export default Errorpage