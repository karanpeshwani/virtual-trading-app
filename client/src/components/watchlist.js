/* Watchlist component of the app */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Buttons from "./button";
import "../stylings/watchlist.css";

import ListGroup from "react-bootstrap/ListGroup";
import { CallReceived } from "@material-ui/icons";

export default function BasicList(props) {
  const { masterOBJ, settypeoftrade, setform, setSelected_stock } = props;
  const [keyj, setkeyj] = useState("");

  return (
    <div className="dv2">
    <div className="dv3">
      <Box
        className="watchlist"
        // overflow={"auto"}
        sx={
          {
            // height: "89.6vh",
            // bgcolor: "background.paper",
            // height : '400px'
            // height: 'calc("100vh - 150px")',
            // 'min-height' : 'calc(~"100vh - 150px")',
            // height : calc(100% - 100px)
          }
        }
      >
        <nav aria-label="secondary mailbox folders">
          <ListGroup variant="flush">
            {Object.entries(masterOBJ).map(([key_1, val]) => {
              return (
                <ListGroup.Item
                  disablePadding
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
            })}
          </ListGroup>
        </nav>
      </Box>
    </div>
    </div>
  );
}
