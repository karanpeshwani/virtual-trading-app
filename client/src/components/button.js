import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Buttons(props) {
  const { setSelected_stock, settypeoftrade, keyj, setform } = props;

  const HandleClick = (arg) => {
    settypeoftrade(arg);
    setSelected_stock(keyj);
    console.log(keyj);
    setform(true);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        onClick={() => HandleClick("buy")}
        color="success"
        variant="contained"
        size="medium"
      >
        BUY
      </Button>
      <Button
        onClick={() => HandleClick("sell")}
        color="error"
        variant="contained"
        size="medium"
      >
        SELL
      </Button>
    </Stack>
  );
}
