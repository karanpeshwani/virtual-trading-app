import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import url from "../constants/url";
import Button from "react-bootstrap/Button";
import "../stylings/Orderform.css";


export default function Form(props) {
  const {
    setchange_perm_data,
    typeoftrade,
    masterOBJ,
    setform,
    Selected_stock,
    form_,
  } = props;

  const [margin_required, setmargin_required] = useState(0);
  const [userInput, setUserInput] = useState(0);

  useEffect(() => {
    setmargin_required(userInput * masterOBJ[Selected_stock]["LTP"]);
  }, [userInput, masterOBJ[Selected_stock]["LTP"]]);

  const handleSubmit = () => {
    var qty = parseInt(userInput, 10);
    setform(false);
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
    <Modal
      className="dialog"
      show={form_}
      onHide={() => setform(false)}
    >
      <Modal.Dialog className="dialog">
        <Modal.Header
          closeButton
          className={typeoftrade === "buy" ? "blue" : "red"}
        >
          <Modal.Title>{Selected_stock}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="formBody">
          <div className="input-container ic1">
            <TextField
              id="outlined-number"
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              label="Quantity"
              type="number"
              required="true"
              sx={{
                color: "blue",
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="margin">Margin: $ {margin_required}</div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            color="danger"
            onClick={() => setform(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="primary"
            color="blue"
            type="submit"
          >
            Execute
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
