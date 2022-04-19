import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import url from "../url";
import "./styles.css";
// import Draggable from "react-draggable";

import "../components/formstyles.css";
import TextField from '@mui/material/TextField';

const Buy_form = (props) => {
  const {
    setchange_perm_data,
    typeoftrade,
    masterOBJ,
    setform,
    Selected_stock,
  } = props;

  const [margin_required, setmargin_required] = useState(0);
  const [userInput, setUserInput] = useState(0);

  useEffect(() => {
    setmargin_required(userInput * masterOBJ[Selected_stock]["LTP"]);
  }, [userInput, masterOBJ[Selected_stock]["LTP"]]);

  const handleSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    var qty = 1;
    for (let [key, value] of formData.entries()) {
      qty = parseInt(value, 10);
      console.log(qty);
    }
    setform(!setform);

    const margin_req = masterOBJ[Selected_stock]["LTP"] * qty;
    const data = {
      email: "karanpeshwani7@gmail.com",
      quantity: qty,
      margin_req: margin_req,
      Selected_stock: Selected_stock,
    };

    if (typeoftrade === "buy") {
      axios
        .post(url + `/getData/price/query/hello`, data)
        .then((res) => {
          console.log("res.data");
          console.log(res.data);
        })
        .then(() => {
          setchange_perm_data((old) => {
            return !old;
          });
        });
    } else if (typeoftrade === "sell") {
      axios
        .post(url + `/getData/price/query/hello_sell`, data)
        .then((res) => {
          console.log("res.data");
          console.log(res.data);
        })
        .then(() => {
          setchange_perm_data((old) => {
            return !old;
          });
        });
    }
  };

  useEffect(() => {
    console.log(userInput);
  }, [userInput]);

  return (
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <div className="formHeader">
          <div className="title">{Selected_stock}</div>
        </div>
        <div className="input-container ic1">
          <TextField
            id="outlined-number"
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            label="Quantity"
            type="number"
            InputProps={{ inputProps: { min: 1, max: 10 } }}
            required="true"
            sx={{
              color: 'blue'
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <h3>Margin Required {margin_required}</h3>
        </div>
        <button type="text" className="cancel" onClick={() => setform(false)}>
          cancel
        </button>
        <button type="submit" className="submit">
          submit
        </button>
      </form>
  );
};

export default Buy_form;
