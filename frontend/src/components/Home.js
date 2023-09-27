
import {React,useState,useEffect,useContext} from 'react';
import '../styles.css'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';

const Home = () => {
        const { authState } = useContext(userContext);
  const [userName,setUserName] = useState('');
  const navigate = useNavigate();
  const userHomePage = async () =>{
    try{
      const res =await fetch('http://localhost:5000/api/getData',{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          },
          credentials: 'include',
      });
      const data = await res.json();
      setUserName(data.name);

      if(!res.status===200){
        const error = new Error (res.error);
        throw error;
      }
    }catch(err){
      console.log(err);
    }
  }
useEffect(() => {
  userHomePage();
}, [])
  return (
<div className="my-container home">
{authState.isAuthenticated?(
                <>
                <div className='home-text'>
                <h1>Welcome to Escuela portal</h1>
                <h1>Hello {userName} !!</h1>
                </div>
                <div className='button-groups'>
                <button className="btn btn-success me-2 btn-lg" onClick={()=>navigate('/input')}>Add certificate</button>
                <button className='btn btn-danger ms-2 btn-lg' onClick={()=>navigate('/sheet')}>Check Marks</button>
                </div>
                </>
        ):
        <p className='welcome-text'>Please login to your Escuela portal</p>
        }
</div>
  )
}

export default Home