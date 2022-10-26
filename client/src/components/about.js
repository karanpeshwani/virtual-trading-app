import React from "react";
import { Container, Typography, makeStyles } from "@material-ui/core";
import "../stylings/about.css";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 300,
  },
}));

function About() {
  const classes = useStyles();
  return (
    <div className="div1">
      <Container
        style={{ marginTop: "0px", background: "rgba(185, 187, 188, 0.728)" }}
      >
        <Typography
          style={{ marginTop: "0px" }}
          variant="h4"
          className={classes.heading}
        >
          About The Project
        </Typography>
        <Typography paragraph style={{ marginTop: "20px", fontSize: "1.2rem" }}>
          <u>
            <h2 className={classes.heading}>The Virtual Trading Application</h2>
          </u>
          <Typography
            variant="h5"
            className={classes.heading}
            style={{ marginTop: "10px" }}
          >
            <div style={{ marginTop: "30px" }}></div>
          </Typography>
          <li style={{ marginTop: "10px" }}>
            The project facilitates the trade of stocks and cryptocurrency in
            the US stock market through virtual currency.
          </li>
          <li style={{ marginTop: "10px" }}>
            Users first need to SignIn/Login. The account is credited with a
            virtual currency amounting $ 1,000,000.
          </li>
          <li style={{ marginTop: "10px" }}>
            After successful Sign-in, the user can buy/sell stocks and cryptos
            given in the watchlist and search for specific instruments.
          </li>
          <li style={{ marginTop: "10px" }}>
            The <b>Holdings</b> page displays your portfolio and tracks
            profit/loss on each active position.
          </li>
          <li style={{ marginTop: "10px" }}>
            Front-End was created using <b>React</b> while Back-End was
            developed with <b>NodeJS</b>, <b>Express</b> with database as{" "}
            <b>MongoDB</b>.
          </li>
          <li style={{ marginTop: "10px" }}>
            <b>Socket IO</b> and <b>Finnhub API</b> were used for streaming live
            market prices and <b>Token</b> serves the purpose of authentication.
          </li>
        </Typography>
      </Container>
    </div>
  );
}

export default About;
