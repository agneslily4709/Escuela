
import {React,useState,useEffect} from 'react';
import '../styles.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userName,setUserName] = useState('');
  const navigate = useNavigate();
  const [show ,setShow] = useState(false);
  function openModal() {
    navigate('/input')
  }
  function openSheet()
  {
    navigate('/sheet');

  }
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
      setShow(true);

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
<div class="my-container home">
{show?(
                <>
                <p className='h1'>Welcome to Escuela portal</p>
                <h1>Hello {userName} !!</h1>
                <div className='button-groups'>
                <button class="btn btn-success me-2 btn-lg" onClick={openModal}>Add certificate</button>
                <button className='btn btn-danger ms-2 btn-lg' onClick={openSheet}>Check Marks</button>
                </div>
                </>
        ):null}
</div>
  )
}

export default Home