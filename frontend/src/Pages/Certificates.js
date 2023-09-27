import React, { useEffect, useState } from 'react'
import '../styles.css'
const Certificates = () => {
  const [data,setData] = useState([]);
  const [reset,setReset] = useState(false);

if(reset)
  <p>Loading...</p>
  useEffect(()=>{
        let cert;
        const callCertificate = async ()=>{
                try {
                  const res = await fetch('https://escuela-be.onrender.com/api/getData',{
                    method:"GET",
                    headers:{
                      Accept:"application/json",
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
    setReset(true)
    callCertificate ();
  },[])
  return (
    <div className='certificate'>
        <div className='certificate-gallery'>
      {data && data.map((m,i)=>(
        <div className='certificate-card' key={i}>
          <h5 className='certificate-title'>{m.title}</h5>
          <img className='certificate-img' src={m.selectedFile} alt={`${m.title} Certificate`}/>
        </div>
      ))}
      </div>

    </div>
  )
}
export default Certificates