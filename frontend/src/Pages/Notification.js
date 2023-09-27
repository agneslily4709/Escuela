import {React,useState,useEffect} from 'react'
import emailjs from 'emailjs-com';
import '../styles.css';

const Notification = () => {
const [notification,setNotification] = useState([])
        const fetchData = async () =>{
    try{
      const res =await fetch('http://localhost:5000/api/getAllNotifications',{
          method:"GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
      });
      const data = await res.json();
      setNotification(data)
    }catch(err){
      console.log(err);
    }
  }
useEffect(() => {
  fetchData();
}, [])

      
  return (
    <div className='my-container'>
        
    </div>
  )
}
export default Notification;