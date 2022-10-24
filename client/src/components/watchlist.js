/* Watchlist component of the app */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Buttons from "./button";
import "../stylings/watchlist.css";
import ListGroup from "react-bootstrap/ListGroup";
import symbolToName from "../constants/symbolToName";

export default function BasicList(props) {
  const { masterOBJ, settypeoftrade, setform, setSelected_stock, search } = props;
  const [keyj, setkeyj] = useState("");

  const matchWithSearch = (key)=>{
    return key.toLowerCase().includes(search.toLowerCase()) || symbolToName.get(key).toLowerCase().includes(search.toLowerCase());
  };

  return (
    <div className="dv2">
    <div className="dv3">
      <Box
        className="watchlist"
        /*
        sx={
          {
            height: "89.6vh",
            bgcolor: "background.paper",
            height : '400px'
            height: 'calc("100vh - 150px")',
            'min-height' : 'calc(~"100vh - 150px")',
            height : calc(100% - 100px)
          }
        }
        */
      >
        <nav aria-label="secondary mailbox folders">
          <ListGroup variant="flush">
            {Object.entries(masterOBJ).map(([key_1, val]) => {
              if(val["LTP"] !== 0){  
                if(search !== ""){
                  if(matchWithSearch(key_1)){
                    return (
                  <ListGroup.Item
                    className="item"
                    onMouseLeave={() => setkeyj("")}
                    onMouseEnter={() => {
                      setkeyj(key_1);
                    }}
                  >
                    <ListItemButton>
                      <ListItemText primary={key_1} />

                      {keyj === key_1 ? (
                        <Buttons
                          settypeoftrade={settypeoftrade}
                          keyj={key_1}
                          setSelected_stock={setSelected_stock}
                          setform={setform}
                        />
                      ) : null}
                      <div className="prc"> {val["LTP"]} </div>
                    </ListItemButton>
                  </ListGroup.Item>
                    );
                  }
                }
                else{
                  return (
                    <ListGroup.Item
                      className="item"
                      onMouseLeave={() => setkeyj("")}
                      onMouseEnter={() => {
                        setkeyj(key_1);
                      }}
                    >
                      <ListItemButton>
                        <ListItemText primary={key_1} />

                        {keyj === key_1 ? (
                          <Buttons
                            settypeoftrade={settypeoftrade}
                            keyj={key_1}
                            setSelected_stock={setSelected_stock}
                            setform={setform}
                          />
                        ) : null}
                        <div className="prc"> {val["LTP"]} </div>
                      </ListItemButton>
                    </ListGroup.Item>
                  );
                }
              }
              else{
                return (<div></div>);
              }
            })}
          </ListGroup>
        </nav>
      </Box>
    </div>
    </div>
  );
}
