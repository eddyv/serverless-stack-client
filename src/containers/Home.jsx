import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  lander: {
    padding: "80px 0",
    textAlign: "center",
    "& h1": {
      fontFamily: ["Open-Sans", "sans-serif"],
      fontWeight: 600,
    },
    "& p": {
      color: "#999",
    },
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.lander}>
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    </div>
  );
}
