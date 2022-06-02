import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap'

const Auth = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setPassword(formValues.password)
    setEmail(formValues.email)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      signin()
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  const nav = useNavigate()
  const [Isregister, setIsregister] = useState(false)
  // cityslicka
  // eve.holt@reqres.in
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  console.log(email,'email')
  console.log(password,'password')

  async function signup() {
    let item = { email, password }
    console.warn(item)

    let result = await fetch("https://reqres.in/api/register", {
      method: 'POST',
      body: JSON.stringify(item),
      header: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    })
    result = await result.json()
    localStorage.setItem("user-info", JSON.stringify(result))
  }

  async function signin() {
    console.warn(email, password)
    let item = { email, password }
    let result = await fetch("https://reqres.in/api/login", {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify(item)
    });
    result = await result.json()
    localStorage.setItem("user-info", JSON.stringify(result.token))
    // navigate.push("/add")
  }

  return (
    <>
      <div className="col-sm-6 offset-sm-3">
        {Isregister ?
          <div className="registerform">
            <h1>Register Page</h1>
            <br />

            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter Password" />
            <br />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="email" />
            <br />
            <button className="btn btn-primary" onClick={signup}>Sign Up</button>
            <br />
            <button onClick={() => setIsregister(!Isregister)} className="btn btn-primary">sign In</button>

          </div>
          :
          <div id="loginform">
            <form onSubmit={handleSubmit}>
              <input type="email" id="mail" name="email" value={formValues.email}
                onChange={handleChange} className="form-control" placeholder="Enter Email" />
              <p>{formErrors.email}</p>
              <br />
              <input type="password" name="password" id="mail" value={formValues.password}
                onChange={handleChange} className="form-control" placeholder="Enter Password" />
              <p>{formErrors.password}</p>
              <br />
              <button className="btn btn-primary">Sign In</button>
              <br />
              <button onClick={() => setIsregister(!Isregister)} className="btn btn-primary">signup</button>
            </form>
          </div>}
      </div>
    </>

  )
}

export default Auth