// npm start
import React from "react";
import useToken from "./utility/useToken";
import useEmail from "./utility/useEmail";
import Login from "./components/Login";
import HomeScreen from "./components/homeScreen";

const App = () => {
  const { email, setEmail } = useEmail(null);
  const { token, setToken } = useToken(null);

  if (token == null || email == null) {
    return (
      <div>
        <Login setEmail={setEmail} setToken={setToken} />
      </div>
    );
  }

  return <HomeScreen email = {email} />;
};

export default App;
