import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";


function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  const handleLogin = async(e)=>{

    e.preventDefault();

    try{

      const response = await api.post("/auth/login",{
        email,
        password
      });


      localStorage.setItem(
        "token",
        response.data.access_token
      );


      navigate("/dashboard");


    }catch(error){

      alert("Login Failed");

    }

  };


  return (

    <div
      style={{
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        background:"#f1f5f9"
      }}
    >


      <div
        style={{
          width:"350px",
          padding:"35px",
          background:"white",
          borderRadius:"15px",
          boxShadow:"0 10px 25px rgba(0,0,0,0.15)"
        }}
      >


        <h1
          style={{
            textAlign:"center",
            marginBottom:"25px",
            color:"#1e293b"
          }}
        >
          Admin Login
        </h1>


        <form onSubmit={handleLogin}>


          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={{
              width:"100%",
              padding:"12px",
              marginBottom:"15px",
              borderRadius:"8px",
              border:"1px solid #cbd5e1",
              fontSize:"15px"
            }}
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{
              width:"100%",
              padding:"12px",
              marginBottom:"20px",
              borderRadius:"8px",
              border:"1px solid #cbd5e1",
              fontSize:"15px"
            }}
          />


          <button
            type="submit"
            style={{
              width:"100%",
              padding:"12px",
              background:"#2563eb",
              color:"white",
              border:"none",
              borderRadius:"8px",
              fontSize:"16px",
              cursor:"pointer"
            }}
          >
            Login
          </button>


        </form>


      </div>


    </div>

  );

}


export default Login;