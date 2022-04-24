/* Watchlist component of the app */
import React, { useState } from "react";
import "./styles.css";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Buttons from "./button";

import ListGroup from "react-bootstrap/ListGroup";

export default function BasicList(props) {
  const { masterOBJ, settypeoftrade, setform, setSelected_stock } = props;
  const [keyj, setkeyj] = useState("");

  return (
    <Box
      className="watchlist"
      overflow={"auto"}
      sx={{
        height: "89.6vh",
        bgcolor: "background.paper",
      }}
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
  );
}
