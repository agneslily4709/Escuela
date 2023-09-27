import React,{useState} from 'react'
import "../styles.css"
import { useNavigate } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Input = () => {
    const [data,setData] = useState({title:"",selectedFile:""});
    const navigate = useNavigate();
    const putData = async(e)=>{
        e.preventDefault();
        const {title,selectedFile} = data;
        const result = await fetch('https://escuela-be.onrender.com/api/certificate',{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({
              title,selectedFile
            })
        });
        const out = await result.json();
        if(result.status ===201)
        {
                toast.success("Upload success",{
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1000,
                })
                setTimeout(()=>navigate("/certificate"),2000)
        }
        else{
                toast.error(out.error,{
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 1000,
              })
            setData({...data,selectedFile:"",title:""})
        }
    }
  return (
    <div className='my-container'>
        <form method='POST' className='form-component'>
            <h3 className='form-title'>Certificate Details</h3>
        <input
                placeholder="Enter title"
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}    
                name="title"            
            />
            <FileBase  className="file-upload"
                name="selectedFile" type="file" multiple={false}
                onDone={({ base64 }) => setData({
                    ...data, selectedFile: base64 })} />
        <button className='my-button' value="put" onClick={putData}>Post</button>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Input