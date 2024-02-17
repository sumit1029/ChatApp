import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./login.css"
import { useNavigate } from "react-router-dom"
import userContext from '../Context/usercontext';

const Login = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState({name:"", email:"", pic:""});

  // const {setUser} = ChatProvider();
  const context = useContext(userContext);
  const {stateSetter} = context;

  useEffect(() => {
    
    if(localStorage.getItem('token')){
      // console.log(auth)
      navigate('/chats')
    }
  }, [navigate]);

  useEffect(() => { 
    stateSetter(users);
   }, [users])
   
  const handleOnClick = () => {
    let ele = document.getElementById('form');
    ele.style.display = "none";
    let img = document.getElementById('img');
    img.className = 'classname';
    setTimeout(() => {
      navigate('/signup')
    }, 1000);
  }

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const submitHandler = async(e) => { 
    e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/user/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
          });

          const json = await response.json();
          // console.log(json)
          // const {success} = json.success;
          if(json.success){
            //save the auth token and redirect
            // showAlert("Login Successfull", 'success');
            localStorage.setItem('token', json.token);
            
            // console.log(user);
            // stateSetter(name, email, pic);
            setUsers({name:json.name, email:json.email, pic:json.pic});
            navigate("/chats");
            // console.log(users);
          }else{
            // showAlert("Invalid Credentials", 'danger');
            console.log("Invalid");
          }
          // console.log(json.name);

  }
  return (
    <div>

      <div className='d-flex align-items-center justify-content-center' style={{ overflow: "hidden", backgroundColor: "lightgray"}}>
        <div className='continer' style={{ width: "85%"}}>
          <div className='d-flex align-items-center justify-content-center' style={{ color: "red", fontWeight: "800" }}>

            <form id='form'>
              <div className="mb-3 mx-0">
                <h1 style={{ textAlign: "center", fontSize: "8vw", color: "red" }} className='my-5 mx-0'>Sign In</h1>
                <label htmlFor="email" className="form-label my-3">Email address</label>
                <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name='password' required />
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                <button style={{ textAlign: "center" }} type="submit" className="btn btn-primary my-5" onClick={submitHandler}>Login</button>
              </div>
              <div className='d-flex align-items-center justify-content-center'>
                <i className="fa-brands fa-facebook-f mx-5" style={{ color: "#2369e1", fontSize: "3vw" }}></i>
                <i className="fa-brands fa-twitter mx-5" style={{ color: "#30dfdc", fontSize: "3vw" }}></i>
                <i className="fa-brands fa-google mx-5" style={{ color: "#20c214", fontSize: "3vw" }}></i>
              </div>
              <div className='d-flex align-items-center justify-content-center my-3'>
                <p>Don't have a account? :
                  <Link style={{ textDecoration: "none", color: "green" }} onClick={handleOnClick}>Sign Up</Link></p>
              </div>
            </form>
          </div>
        </div>
        <div className='continer' style={{ zIndex: "11" }} id='img'>
          <img src='https://image.imgcreator.ai/ImgCreator/c293eb1da2994d55a44985724b96e2d4/hq/24aab7d2-e293-11ed-83f9-0242ac110008_1.webp' width={"100%"} alt='random' />
        </div>

      </div>
    </div>
  );
}

export default Login;
