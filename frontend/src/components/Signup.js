import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import './signup.css'

const Signup = () => {


  const navigate = useNavigate();
  const handleOnClick = () => {
    let ele = document.getElementById('form');
    ele.style.display = "none";
    let img = document.getElementById('img');
    img.className = 'classname1';
    // ele.classList.add('classname');
    setTimeout(() => {
      navigate('/login')
    }, 1000);
  }

  // eslint-disable-next-line
  const [pic, setPic] = useState();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: ""});
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const postDetails = (pics) => {
    setLoading(true);
    if(pics === undefined){
      console.log("Invalid Image");
      setLoading(false);
      return;
    }
    if(pics.type === "image/jpeg" || "image/png"){
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'ChitChatApp');
      data.append("cloud_name", "Sumit Kumar");
      fetch("https://api.cloudinary.com/v1_1/dbuh4z6d5", {
        method:'POST',
        body:data,
      }).then((res)=>res.json())
      .then(data =>{
        setPic(data.url.toString());
        setLoading(false);
      }).catch((err)=>{
        console.log(err);
        setLoading(false);
      })
    }else{
      console.log("Invalid Image");
      setLoading(false);
      return;
    }
  }

  const submitHandler = async(e) =>{
    e.preventDefault();
    if(!(credentials.cpassword === credentials.password)){
        // showAlert("Password and Confirm Password Do not match", 'warning')
        setCredentials({name:credentials.name, email:credentials.email, password:"", cpassword:""});
     }else{

         const response = await fetch(`http://localhost:5000/api/user`, {
             method: "POST",
             headers: {
               "Content-Type": "application/json", 
             },
             body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password}),
           });
 
           const json = await response.json();
           console.log(json)
           if(json.success){
             //save the auth token and redirect
            //  showAlert("Signup Successfull", 'success');
             localStorage.setItem('token', json.token);
             navigate("/chats");
           }else{
            // showAlert("Invalid Credentials", 'danger');
            // console.log("Invalid");
           }
          //  console.log(json);
     }
}
  return (
    <div>

      <div className='d-flex align-items-center justify-content-center' style={{ overflow: "hidden", backgroundColor: "lightgray" }}>
        <div className='continer' style={{ zIndex: "11" }} id='img'>
          <img src='https://image.imgcreator.ai/ImgCreator/a1b7bee377de4ee295f902d860c75f1d/hq/e0838930-d216-11ed-a073-0242ac110009_1.webp' width={"100%"} alt='random' />
        </div>
        <div className='continer' style={{ width: "85%" }}>
          <div className='d-flex align-items-center justify-content-center' style={{ color: "red", fontWeight: "800" }}>
            <form id='form'>
              <h1 style={{ textAlign: "center", fontSize: "7vw", color: "red" }} className='my-5 mx-0'>Sign Up</h1>
              <div className="mb-3 mx-0">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name='name' onChange={onChange} value={credentials.name} aria-describedby="emailHelp" />
              </div>
              <div className="mb-3 mx-0">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={onChange} value={credentials.password} name='password' />
              </div>
              <div className="mb-3">
                <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" onChange={onChange} value={credentials.cpassword} name='cpassword' />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Profile Picture</label>
                <input type="file" accept='image/*' onChange={(e) => postDetails(e.target.files[0])} className="form-control" id="image" name='image' />
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                <button style={{ textAlign: "center" }} type="submit" className="btn btn-primary my-2" onClick={submitHandler}>Sign Up</button>
              </div>
              <div className='d-flex align-items-center justify-content-center my-2'>
                <p>Already have an account? :
                  <Link style={{ textDecoration: "none", color: "green" }} onClick={handleOnClick}>Login</Link></p>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;
