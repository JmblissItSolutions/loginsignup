import React,{useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap'

function Signin(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    

    async function signin(){
        console.warn(email,password)
        let item={email,password}
        let result=await fetch("https://reqres.in/api/login",{
            method:'POST',
            headers:{
                "Content-Type":'application/json',
                "Accept":'application/json'
            },
            body:JSON.stringify(item)
        });
        result = await result.json()
        localStorage.setItem("user-info",JSON.stringify(result))
        // navigate.push("/add")
    }

    return(
        <>
        <div id="loginform">
        <input type="email" id="mail" onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Email"   />
        <br />
        <input type="password" id="mail" onChange={(e)=>setPassword(e.target.value)}  className="form-control" placeholder="Enter Password"   />
        <br />
        <button onClick={signin} className="btn btn-primary">Sign In</button>
        <br />
        <button className="btn btn-primary">signup</button>
        </div>
        </>
    )
}
export default Signin;