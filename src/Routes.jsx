import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import ResetPassword from "./containers/ResetPassword";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/login/reset">
        <ResetPassword />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
