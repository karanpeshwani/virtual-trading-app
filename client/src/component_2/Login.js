/*
Login page of the app
*/
import React, { useState } from "react";
import "./formStyles.css";
import CustomInput from "./components/CustomInput";
import Button from "./components/Button";

const Login = (props) => {
  const { setToken } = props;
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    console.log(token);
    setToken(token);
  }

  async function loginUser(credentials) {
    return fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
  }

  return (
    <div className="Login">
      <form className="form" onSubmit={handleSubmit}>
        <CustomInput
          labelText="Email"
          id="email"
          formControlProps={{
            fullWidth: true
          }}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
        />
        <CustomInput
          labelText="Password"
          id="password"
          formControlProps={{
            fullWidth: true
          }}
          onChange={(e) => setPassword(e.target.value)} 
          type="password"
        />

        <Button type="submit" color="primary" className="form__custom-button">
          Log in
        </Button>
      </form>
    </div>
  );
}

export default Login;