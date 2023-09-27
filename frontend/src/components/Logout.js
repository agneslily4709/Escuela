import React from 'react'
import { useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {userContext} from "../App"
import { logout } from '../reducer/authActions';
const Logout = () => {

    const {dispatch} = useContext(userContext);

    const navigate = useNavigate();
    useEffect(()=>{
        fetch('https://escuela-be.onrender.com/api/logout',{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            credentials:'include'
        }).then((res)=>{
        //     dispatch({type:"USER",payload:false});
        dispatch(logout());
            navigate('/login');
            if(res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        });
    });
  return (
    <>
    <h1>Logout</h1>
    </>
  )
}

export default Logout;