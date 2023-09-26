import React from 'react'
import { useEffect ,useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {userContext} from "../App"

const Logout = () => {

    const {state,dispatch} = useContext(userContext);

    const navigate = useNavigate();
    useEffect(()=>{
        fetch('http://localhost:5000/api/logout',{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            credentials:'include'
        }).then((res)=>{
            dispatch({type:"USER",payload:false});
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