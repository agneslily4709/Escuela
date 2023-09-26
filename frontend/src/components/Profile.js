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
            <h5 className='profile-item'>Name : {userData.name}</h5>
            <h5 className='profile-item'>Email : {userData.email}</h5>
            <h5 className='profile-item'>Reg No : {userData.regno}</h5>
            <h5 className='profile-item'>Department : {userData.dept}</h5>
            <h5 className='profile-item'>Year : {userData.year}</h5>
        </div>
   </div>
   </>
  )
}

export default Profile;