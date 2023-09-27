import {React,useState,useEffect} from 'react'
import '../styles.css'
const Profile = () => {
  const [userData,setUserData] = useState({});
  const callAboutPage = async () =>{
    try{
      const res =await fetch('http://localhost:5000/api/profile',{
          method:"GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:"include"
      });
      const data = await res.json();
      setUserData(data);
      if(!res.status===200){
        const error = new Error (res.error);
        throw error;
      }
    }catch(err){
      console.log(err);
    }
  }
useEffect(() => {
  callAboutPage();
}, [])
  return (
   <>
   <div className="my-container">
        <div className='profile-details'>
        <h3 className='profile-title'>Profile</h3>
            <p className='profile-item'>Name : {userData.name}</p>
            <p className='profile-item'>Email : {userData.email}</p>
            <p className='profile-item'>Reg No : {userData.regno}</p>
            <p className='profile-item'>Department : {userData.dept}</p>
            <p className='profile-item'>Year : {userData.year}</p>
        </div>
   </div>
   </>
  )
}

export default Profile;