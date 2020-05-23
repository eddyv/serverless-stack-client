import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  notFound: {
    paddingTop: "100px",
    textAlign: "center",
  },
}));

export default function NotFound() {
  const classes = useStyles();

  return (
    <div className={classes.notFound}>
      <h3>Sorry, page not found!</h3>
    </div>
  );
}
