import {React,useState,useEffect} from 'react'
import '../styles.css';

const Notification = () => {
const [notification,setNotification] = useState([])
        const fetchData = async () =>{
    try{
      const res =await fetch('https://escuela-be.onrender.com/api/getAllNotifications',{
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
  const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
      
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
      
        return `Date: ${day}-${month}-${year} Time: ${hours}:${minutes}`;
      };
useEffect(() => {
  fetchData();
}, [])

      
  return (
    <div className='my-notification'>
        <h1 className='form-title'>Announcements</h1>
{notification ? notification.map((message, index) => (
  <div key={index} className='notification'>
    <p>{message.message}</p>
    <small>{formatDateTime(message.createdAt)}</small>
  </div>
)) : <></>}
    </div>
  )
}
export default Notification;