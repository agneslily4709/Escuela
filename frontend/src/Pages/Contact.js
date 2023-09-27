import {React,useState,useEffect} from 'react'
import emailjs from 'emailjs-com';
import '../styles.css';

const Contact = () => {
  const [userData,setUserData] = useState({});
  const fetchData = async () =>{
    try{
      const res =await fetch('http://localhost:5000/api/profile',{
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
// const [data, setData] = useState({
//         from_name:'',
//   subject: '',
//   email: '',
//   regno: '',
//   dept: '',
//   message:'',
// })
const submitHandler = (e) => {
        e.preventDefault();
      
        emailjs
          .sendForm('service_x1botxp', 'template_fzn1boi', e.target, '1ueGVojCge8VE1EvM')
          .then((result) => {
            console.log(result.text);
          })
          .catch((error) => {
            console.error('Email sending error:', error);
          });
      
        e.target.reset();
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

    </div>
  )
}
export default Contact;