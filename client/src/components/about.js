import React from 'react'
import { Container, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 300,
  },
}));

function About() {
  const classes = useStyles();
  return (
    <Container  style={{ marginTop: "0px", background: "rgba(185, 187, 188, 0.728)" }}>
      <Typography style={{ marginTop: "0px"}} variant="h4" className={classes.heading}>
        About this project
      </Typography>
      <Typography paragraph style={{ marginTop: "20px", fontSize: "1.2rem" }}>
        <u>
          <h2 className={classes.heading}>The Virtual Trading Terminal</h2>
        </u>
        <Typography
          variant="h5"
          className={classes.heading}
          style={{ marginTop: "10px" }}
        >
          Features include:
        </Typography>
        <li>
          The project facilitates trading of stocks and cryptocurrency in the US
          through virtual currency.
        </li>
        <li>
          Users first need to SignIn/Login. The account is
          credited with a virtual currency amounting $ 1,000,000.
        </li>{" "}
        <li>
          Post registration the users can buy/sell stocks and cryptos
          given in the watchlist, and can also search for specific instrument.
        </li>
        <li>
          The <b>Holdings</b> page enables to track the current position of a
          purchase/sell of different instruments.
        </li>
        <li>
          Front-End was created using <b>React</b> while Back-End was developed
          with <b>NodeJS</b>, <b>Express</b> with database as <b>MongoDB</b>.
        </li>
        <li>
          <b>Socket IO</b> and <b>Finnhub API</b> is used for streaming live
          market prices and <b>Token</b> serves the purpose for authentication.
        </li>
      </Typography>
    </Container>
  );
}

export default About