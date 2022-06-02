import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

function Register() {

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const history = useNavigate()

    async function signup() {
        let item = { email, password }
        console.warn(item)

        let result = await fetch("https://reqres.in/api/register", {
            method: 'Post',
            body: JSON.stringify(item),
            header: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'

            }
        })
        result = await result.json()
        localStorage.setItem("user-info", JSON.stringify(result))
        // history.push("/add")
    }

    return (
        <>
            <div className="col-sm-6 offset-sm-3">
                <h1>Register Page</h1>
                <br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter Password" />
                <br />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="email" />
                <br />
                <button className="btn btn-primary" onClick={signup}>Sign Up</button>
            </div>

        </>
    )
}
export default Register;