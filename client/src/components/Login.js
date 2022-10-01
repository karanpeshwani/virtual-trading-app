/*
Login page of the app
*/
import React, { useState } from "react";
import "../stylings/login.css"
import Button from "../components/Coppied_Components/components/Button";
import TextField from "@mui/material/TextField";

const Login = (props) => {
  const { email , setEmail , setToken } = props;
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({ email: email, password: password });
    if(token.token === "not-a-token"){
      // setError
      setError("Either the user is not registered or the password is incorrect. Please try again.")
    }
    else{
      setToken(token);
    }
    console.log(token);
  };

  async function loginUser(credentials) {
    return fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  return (
    <div className="Login">
      <form className="form" onSubmit={handleSubmit}>
      <div className="dv1" />
        <TextField
          required
          id="outlined-required"
          label="Required"
          type="email"
          placeholder="Email"
          className="tf1"
          value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}
        />

        <div className="dv1" />

        <TextField
          required
          id="outlined-required"
          label="Required"
          type="password"
          placeholder="Password"
          className="tf2"

          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
        />
        <div className="dv4">{error}</div>
        <Button
          type="submit"
          color="primary"
          className="form__custom-button"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          Log in
        </Button>
      </form>
    </div>
  );
};

export default Login;
