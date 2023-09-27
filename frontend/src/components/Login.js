import { useContext } from 'react';
import {React,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {userContext} from "../App.js"
import '../styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../reducer/authActions';
import Cookies from 'js-cookie';

const Login = () => {
        const token = Cookies.get('jwtoken');
  const {dispatch} = useContext(userContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const loginUser =async (e)=>{
    e.preventDefault();

    const res =await  fetch(`https://escuela-be.onrender.com/api/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials: 'include',
      body:JSON.stringify({
        email,
        password
      })
    });
    const data = await res.json();
    if(res.status === 400 || !data){
        toast.error(data.error,{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
      })
    }else{
        toast.success("Login Successful",{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
        })

        dispatch(login(token));
      setTimeout(()=>navigate("/"),2000)
    }
 }
  return (
   <>
   <div className='my-container'>
    <form method='POST' className='form-component'>
    <h3 className='form-title'>Login</h3>
        <input  onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter Mail"  type="email"  value={email}  name="mail"  required/> 
        <input onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" type="password" value={password} name="password" required/>
            <button className='my-button' value="login" onClick={loginUser}>Login</button>
    </form>
    </div>
    <ToastContainer/>
   </>
  )
}

export default Login