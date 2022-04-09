// npm start
import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import "./components/styles.css";
import Watchlist from "./components/watchlist";
// import Orderform from "./form/form";
import Orderform2 from "./components/Orderform2";
import HoldingsTable from "./component_2/dashboard";
import Onn_the_sockets from "./components/Onn_the_sockets";
import axios from "axios";
import url from "./url";
import Home from "./component_2/home";
import DBDataToMasterData from "./utility/DBDataToMasterData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./component_2/about";
const masterOBJ_1 = require("./utility/masterOBJ");
const perm_d = require("./utility/permanent_data");
function App() {
  const [typeoftrade, settypeoftrade] = useState("");
  const [form, setform] = useState(false);
  const [Selected_stock, setSelected_stock] = useState("");
  const [key, setkey] = useState("");
  const [masterOBJ, setmasterOBJ] = useState(masterOBJ_1);
  const [perm_data, setperm_data] = useState(perm_d);
  const [change_perm_data, setchange_perm_data] = useState(true);

  useEffect(() => {
    axios.post(url + "/get_BD_data").then((res) => {
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
    Onn_the_sockets(setmasterOBJ, perm_data);
    console.log("!!!!!!");
  }, []);

  return (
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
      <div className="app">
        <Watchlist 
          
          settypeoftrade={settypeoftrade}
          masterOBJ={masterOBJ}
          key={key}
          setkey={setkey}
          setform={setform}
          setSelected_stock={setSelected_stock}
        />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/holdings"
            element={
              <HoldingsTable masterOBJ={masterOBJ} perm_data={perm_data} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

/* <Alert className="Alert" variant="filled" severity="success">Executed Successfully</Alert> */
