import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Popup = () => {
    const navigate = useNavigate();
    const [message,setMessage] = useState("")
    const handlePost = async (e) => {
        e.preventDefault();
      
        try {
          const res = await fetch(`https://escuela-be.onrender.com/api/postNotification`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
          });
      
          const data = await res.json();
      
          if (res.status === 400 || !data) {
            toast.error(data.error, {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 1000,
            });
          } else {
            toast.success('Announcement Posted', {
              position: toast.POSITION.BOTTOM_RIGHT,
              autoClose: 1000,
            });
            setTimeout(() => navigate('/staff'), 2000);
            setMessage('');
          }
        } catch (error) {
          console.error(error); // Handle fetch or JSON parsing errors here
        }
      };
      
  return (
    <div className="my-container">
            <form method='POST' className='form-component'>
    <h3 className='form-title'>Announcements</h3>
        <textarea rows={3}  onChange={(e)=>setMessage(e.target.value)}  placeholder="Enter Message"  type="text"  value={message}  name="mail"  required/> 
            <button className='my-button' value="login" onClick={handlePost}>Post Announcement</button>
    </form>
    <ToastContainer/>
    </div>
  )
}

export default Popup