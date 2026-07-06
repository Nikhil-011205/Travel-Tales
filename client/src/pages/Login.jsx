import { useState } from "react";
import NavBar from "../pages/NavBar";
import { Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate = useNavigate();

    async function handleLogin(){

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            email:email,

            password:password

        })

    });

    const data = await response.json();

    console.log(data);
    if (data.message === "Login Successful") {
      localStorage.setItem("token",data.token);

    alert("Login Successful");

    navigate("/profile");

} else {

    alert(data.message);

}

}

  return (
    <div>
        <NavBar />

        <div className="login-container">
       <div className="login-card">

        <h1>Welcome!</h1>

    <p>
      Login to continue your travel journey.
    </p>

    
      <input type="email" placeholder="Enter Email" value={email} onChange={(event)=>{
        setEmail(event.target.value);
      }} />

      <br />
      <br />

      <input type="password" placeholder="Enter Password" value={password} onChange={(event)=>{
        setPassword(event.target.value);
      }} />

      <br />
      <br />


    

    <button onClick={handleLogin}>Login</button>

    <p className="register-text">
      Don't have an account?{" "}
      <Link to="/register" className="register-link">
        Register
      </Link>
    </p>

  </div>
</div>
     

    


    </div>
  );
}

export default Login;