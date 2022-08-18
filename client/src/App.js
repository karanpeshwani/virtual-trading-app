// npm start
import React, { useState, useEffect } from "react";
import useToken from "./useToken";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/navbar";
// import "./components/styles.css";
import "../src/stylings/App.css";
import Watchlist from "./components/watchlist";
import Orderform2 from "./components/Orderform2";
import HoldingsTable from "./component_2/holdingsTable";
import On_the_sockets from "./components/on-sockets";
import Login from "./component_2/Login";
import axios from "axios";
import url from "./url";
import Home from "./component_2/home";
import DBDataToMasterData from "./utility/DBDataToMasterData";
import About from "./component_2/about";
const masterOBJ_1 = require("./utility/masterOBJ");
const perm_d = require("./utility/permanent_data");

function App() {
  const { token, setToken } = useToken();
  const [typeoftrade, settypeoftrade] = useState("");
  const [form, setform] = useState(false);
  const [Selected_stock, setSelected_stock] = useState("");
  const [key, setkey] = useState("");
  const [masterOBJ, setmasterOBJ] = useState(masterOBJ_1);
  const [perm_data, setperm_data] = useState(perm_d);
  const [change_perm_data, setchange_perm_data] = useState(true);
  const [email, setEmail] = useState("karanpeshwani7@gmail.com");

  /*
  useEffect(() => {
    axios.get(url + "/get_BD_data", {headers : {"email" : email}} ).then((res) => {
      console.log(res.data);
      DBDataToMasterData(res.data).then((res) => {
        setperm_data((old) => {
          return {
            ...old,
            ...res,
          };
        });
      });
    });
  }, [change_perm_data]);
  */
  useEffect(() => {
    axios.get(url + `/${email}/get_BD_data`, {headers : {"email" : email}} ).then((res) => {
      console.log(res.data);
      DBDataToMasterData(res.data).then((res) => {
        setperm_data((old) => {
          return {
            ...old,
            ...res,
          };
        });
      });
    });
  }, [change_perm_data]);

  useEffect(() => {
    On_the_sockets(setmasterOBJ, perm_data, email);
  }, [token]);

  if (!token) {
    return (
      <div>
        <Login email={email} setEmail={setEmail} setToken={setToken} />
      </div>
    );
  }

  return (
    <div className="DDD">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Navbar />
              {form ? (
                <Orderform2
                  perm_data={perm_data}
                  setchange_perm_data={setchange_perm_data}
                  masterOBJ={masterOBJ}
                  typeoftrade={typeoftrade}
                  Selected_stock={Selected_stock}
                  setform={setform}
                  form_={form}
                />
              ) : null}
              <div className="pageBody">
                <Watchlist
                  settypeoftrade={settypeoftrade}
                  masterOBJ={masterOBJ}
                  key={key}
                  setkey={setkey}
                  setform={setform}
                  setSelected_stock={setSelected_stock}
                />
              </div>
            </div>
          }
        ></Route>

        <Route
          path="/holdings"
          element={
            <div>
              <Navbar />
              {form ? (
                <Orderform2
                  perm_data={perm_data}
                  setchange_perm_data={setchange_perm_data}
                  masterOBJ={masterOBJ}
                  typeoftrade={typeoftrade}
                  Selected_stock={Selected_stock}
                  setform={setform}
                  form_={form}
                />
              ) : null}
              <div className="pageBody">
                <Watchlist
                  settypeoftrade={settypeoftrade}
                  masterOBJ={masterOBJ}
                  key={key}
                  setkey={setkey}
                  setform={setform}
                  setSelected_stock={setSelected_stock}
                />
                <HoldingsTable masterOBJ={masterOBJ} perm_data={perm_data} />
              </div>
            </div>
          }
        ></Route>

        <Route
          path="/about"
          element={
            <div>
              <Navbar />
              <About />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

/* <Alert className="Alert" variant="filled" severity="success">Executed Successfully</Alert> */

/*
<Route
path="/login"
element={
  <div>
    <Login setToken={setToken} />
  </div>
}
></Route>

*/
