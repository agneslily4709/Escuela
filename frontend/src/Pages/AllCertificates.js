import React, { useState,useEffect } from 'react'
import '../styles.css'
const AllCertificates = () => {
  const[allCert,setAllCert] = useState([]);
  const[loading,setLoading] = useState(false);
  const callAllCertificates = async () =>{
    try {
      const res = await fetch('http://localhost:5000/api/getAllData',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"        
      })
      const info = await res.json();
      setAllCert(info);
      if(!res.status===200){
        const error = new Error (res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  }
  if(loading)
  <p>Loading...</p>
  useEffect (()=>{
    setLoading(true);
    callAllCertificates();
    setLoading(false);
  },[])
  return (
    <div className='certificate-container'>
        <div className='all-students'>
        {allCert && allCert.map((cert,index)=>(
          <div key={index}>
          <h2 className='students-name'>{cert.name} - {cert.regno}</h2>
          <div className='certificate-gallery'>
          {cert.certificates.map((c,index) =>(
            <div className='certificate-card'key={index}>
              <h5 className='certificate-title'>{c.title}</h5>
              <img className="certificate-img"src={c.selectedFile} alt=""/>
            </div>
          ))}            
          </div>
          </div>
        ))}
        </div>
    </div>
  )
}

export default AllCertificates