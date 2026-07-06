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

    if (password !== confirmPassword) {

        alert("Passwords do not match!");

        return;

    }

    // Register User
    const registerResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {

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

    const registerData = await registerResponse.text();

    if (registerData !== "User Registered Successfully") {

        alert(registerData);

        return;

    }

    // Automatically Login
    const loginResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            email,
            password

        })

    });

    const loginData = await loginResponse.json();

    localStorage.setItem("token", loginData.token);

    alert("Registration Successful!");

    navigate("/profile");

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
                setConfirmPassword(event.target.value);
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