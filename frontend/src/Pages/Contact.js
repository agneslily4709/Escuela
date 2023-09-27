import {React,useState,useEffect} from 'react'
import emailjs from 'emailjs-com';
import '../styles.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Contact = () => {
        const navigate  = useNavigate()
  const [userData,setUserData] = useState({});
  const fetchData = async () =>{
    try{
      const res =await fetch('http://localhost:5000/api/getData',{
          method:"GET",
          headers:{
            Accept:"appllication/json",
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
  fetchData();
}, [])

const submitHandler = (e) => {
        e.preventDefault();
        emailjs
          .sendForm('service_x1botxp', 'template_fzn1boi', e.target, '1ueGVojCge8VE1EvM')
          .then((result) => {
          })
          .catch((error) => {
            toast.error(error,{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
      })
          });
      
        e.target.reset();
        toast.success("Mail sent successfullt",{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
        })
        setTimeout(()=>navigate("/"),2000)
      };
      
  return (
    <div className='my-container'>
<form onSubmit={submitHandler} className="form-component">
    <h1 className='form-title'>Contact Admin</h1>
      <input  placeholder='Name' type='text' value={userData.name} name='from_name' />
      <input    placeholder='Email' type="email" value={userData.email}  name="reply_to"/>
        <div className='row'>
        <input className='col ms-3 me-3' placeholder='Number' type="number" name="regno" value={userData.regno} />
      <input className='col me-3 ms-3' placeholder='Department' type="text" name="dept" value={userData.dept}/>
        </div>
      <input   placeholder='Subject'  type="text" name="subject"/>
      <textarea  name="message" placeholder='Message' id=""></textarea>
   <button className='my-button' type='submit'>Send</button>
</form>
<ToastContainer/>
    </div>
  )
}
export default Contact;