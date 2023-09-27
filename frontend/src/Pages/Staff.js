import React from 'react'
import '../styles.css'
import { useNavigate} from 'react-router-dom';
const Staff = () => {
    const navigate = useNavigate();

  return (
    <div className='my-container home'>

            <div className='home-text'>
            <h1>Good Day !!</h1>
            <h1>Check below</h1>
            </div>
            <div className='button-groups'>
            <button className='btn btn-success btn-lg me-2'onClick={()=>navigate("/upload")}>Announcements</button>
            <button className='btn btn-danger btn-lg ms-2' onClick={()=>navigate("/getAllUser")}>Certificates</button>
            </div>
        </div>
  )
}

export default Staff