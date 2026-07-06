import { useState} from "react";
import NavBar from "../pages/NavBar";
import "./Register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register(){
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");

    const navigate = useNavigate();

    async function handleRegister() {

    const response = await fetch("http://localhost:5000/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name,
            email,
            password

        })

    });

    const data = await response.text();

    console.log(data);

    if(data === "User Registered Successfully"){

        alert("Registration Successful!");

        navigate("/login");

    }
    else{

        alert("Registration Failed");

    }

}

    

    
    return(
        <div>
            <NavBar />

            


        <div className="register-container">



            <div className="register-card">
                
                <h1>Create Your Account</h1>
                
                <p className="text-description">

                    Join Travel Tales and start preserving
                    your unforgettable adventures.
                    
                </p>


            <input type="text" placeholder="Enter name" value={name} onChange={(event)=>{
                setName(event.target.value);

            }}
            />
            <br />
            <br />
            <input type="email" placeholder="Enter email" value={email} onChange={(event)=>{
                setEmail(event.target.value);
            }} 
            />
            <br />
            <br />
            <input type="password" placeholder="Enter password" value={password} onChange={(event)=>{
                setPassword(event.target.value);

            }}
            />
            <br />
            <br />
            <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(event)=>{
                setconfirmPassword(event.target.value);
            }} 
            />
            <br />
            <br />




    

    <button onClick={handleRegister}>Create Account</button>

    <p className="login-text">
      Already have an account? 
      <Link to="/login" className="login-link">
      Login
      </Link>
    </p>

  </div>
</div>




</div>
    );
}

export default Register;