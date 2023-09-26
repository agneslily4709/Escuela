import React, { useEffect, useState } from 'react'
import '../styles.css'
const Certificates = () => {
  const [data,setData] = useState([]);
  const [reset,setReset] = useState(false);
  let cert;
  const callCertificate = async ()=>{
    try {
      const res = await fetch('http://localhost:5000/api/getData',{
        method:"GET",
        headers:{
          Accept:"appllication/json",
          "Content-Type":"application/json"
        },
        credentials:"include" 
      });
      cert = await res.json();
      setData(cert.certificates);

      setReset(false)
    } catch (error) {
      console.log(error);
    }
  } 
if(reset)
  <p>Loading...</p>
  useEffect(()=>{
    setReset(true)
    callCertificate ();
  },[])
  return (
    <div className='certificate'>
        <div className='certificate-gallery'>
      {data && data.map((m,i)=>(
        <>
        <div className='certificate-card' key={i}>
          <h5 className='certificate-title'>{m.title}</h5>
          <img className='certificate-img' src={m.selectedFile} alt={`${m.title} Certificate`}/>
        </div>
        </>
      ))}
      </div>

    </div>
  )
}
export default Certificates