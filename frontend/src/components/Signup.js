import {React,useState} from 'react';
import '../styles.css'
import {Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({name:"",email:"",password:"",regno:"",dept:"",year:""})
  let name,value;
  const handleInputs = (e) =>{
      console.log(e);
      name = e.target.name;
      value=e.target.value;
      setUser({...user,[name]:value});
}

const PostData = async (e) =>{
  e.preventDefault();

  const {name,email,password,regno,dept,year} = user;

  const res = await fetch("http://localhost:5000/api/register",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,email,password,regno,dept,year
    })
  });
  const data = await res.json();
    if(res.status=== 422  || !data){
        toast.error(data.error,{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
      })
    }else{
        toast.success("Signup Successful",{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1000,
        })
        setTimeout(()=>navigate("/login"),2000)
    }
}
  return (
    <>
        <div className='my-container'>
        <form method="POST"  className='form-component'> 
        <h3 className='form-title'>Register</h3>
            <input placeholder="Enter Name"    type="text"    value={user.name}    onChange={handleInputs}    name="name"/>
            <input onChange={handleInputs}  placeholder="Enter Mail" type="text" value={user.email} name="email"/>
            <input onChange={handleInputs}  placeholder="Enter Password" type="text" value={user.password} name="password"/>
            <div className='row' >
            <input className='col ms-3 me-3' onChange={handleInputs}  placeholder="Enter Reg No" type="text" value={user.regno} name="regno"/>
            <input className='col me-3 ms-3'  onChange={handleInputs} placeholder="Enter Dept"    type="text"    value={user.dept}    name="dept"/>
            </div>
          <select className='registerdropdown' name='year' onChange={handleInputs} value={user.year || ""}>
            <option value="none" selected  hidden>Select your year</option>
            <option value="1">I year</option>
            <option value="2">II year</option>
            <option value="3">III year</option>
            <option value="4">IV year</option>
          </select>
          <button className='my-button ' value="register" onClick={PostData}>Register</button>
        </form>
    </div>
<ToastContainer/>
    
    </>
  )
}

export default Signup