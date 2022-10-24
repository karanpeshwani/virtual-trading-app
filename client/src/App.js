// npm start
import React, { useState, useEffect } from "react";
import useToken from "./utility/useToken";
import {
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/navbar";
import "../src/stylings/App.css";
import Watchlist from "./components/watchlist";
import Orderform from "./components/Orderform";
import HoldingsTable from "./components/holdingsTable";
import On_the_sockets from "./utility/on-sockets";
import Login from "./components/Login";
import axios from "axios";
import url from "./constants/url";
import DBDataToMasterData from "./utility/DBDataToMasterData";
import About from "./components/about";
const masterOBJ_1 = require("./constants/masterOBJ");
const perm_d = require("./constants/permanent_data");

function App() {
  const { token, setToken } = useToken(null);
  const [typeoftrade, settypeoftrade] = useState("");
  const [form, setform] = useState(false);
  const [Selected_stock, setSelected_stock] = useState("");
  const [key, setkey] = useState("");
  const [BackmasterOBJ, setBackmasterOBJ] = useState(masterOBJ_1);
  const [masterOBJ, setmasterOBJ] = useState(BackmasterOBJ);
  const [perm_data, setperm_data] = useState(perm_d);
  const [change_perm_data, setchange_perm_data] = useState(true);
  // const [email, setEmail] = useState("karanpeshwani7@gmail.com");
  const [email, setEmail] = useState(null);
  const [cashRemaining, setCashRemaining] = useState(1000000);
  const [PandL, setPandL] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if(email != null){
      axios.get(url + `/${email}/get_BD_data`, {headers : {"email" : email}} ).then((res) => {
        setCashRemaining((res.data)["cash_remaining"]);
        console.log(res.data);
        DBDataToMasterData(res.data).then(([res, pl]) => {
          setperm_data((old) => {
            return {
              ...old,
              ...res,
            };
          });
          setPandL(pl.toFixed(2));
        });
      });
    }
  }, [change_perm_data, email]);

  useEffect(() => {
    if(token != null){
      On_the_sockets(setBackmasterOBJ, perm_data, email);
    }
  }, [token]);

  setTimeout(() => {
    setmasterOBJ(BackmasterOBJ);
  }, 15000);

  if (token == null) {
    return (
      <div>
        <Login setEmail={setEmail} setToken={setToken} />
      </div>
    );
  }

  return (
    <div className="Div1">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Navbar search={search} setSearch={setSearch} />
              {form ? (
                <Orderform
                  perm_data={perm_data}
                  setchange_perm_data={setchange_perm_data}
                  masterOBJ={masterOBJ}
                  typeoftrade={typeoftrade}
                  Selected_stock={Selected_stock}
                  setform={setform}
                  form_={form}
                />
              ) : null}
              <div className="Div2">
                <div>
                  <Watchlist
                    settypeoftrade={settypeoftrade}
                    masterOBJ={masterOBJ}
                    key={key}
                    setkey={setkey}
                    setform={setform}
                    setSelected_stock={setSelected_stock}
                    search={search}
                  />
                </div>
                <div className="Div3">
                  <h4>Hello User, {email}</h4>
                  <hr />
                  <h5>Cash Remaining : {cashRemaining.toFixed(2)}</h5>
                  <hr />
                  <div className="Div4">
                    <h5>Total Profit/Loss : </h5>
                    <div className="margin10px"></div>
                    <h5 className={ PandL > 0
                          ? "greenText"
                          : "redText"}>{PandL}</h5>
                  </div>
                </div>
              </div>
            </div>
          }
        ></Route>

        <Route
          path="/holdings"
          element={
            <div>
              <Navbar search={search} setSearch={setSearch} />
              {form ? (
                <Orderform
                  perm_data={perm_data}
                  setchange_perm_data={setchange_perm_data}
                  masterOBJ={masterOBJ}
                  typeoftrade={typeoftrade}
                  Selected_stock={Selected_stock}
                  setform={setform}
                  form_={form}
                />
              ) : null}
              <div className="Div2">
                <Watchlist
                  settypeoftrade={settypeoftrade}
                  masterOBJ={masterOBJ}
                  key={key}
                  setkey={setkey}
                  setform={setform}
                  setSelected_stock={setSelected_stock}
                  search = {search}
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
              <Navbar search={search} setSearch={setSearch} />
              <About />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;