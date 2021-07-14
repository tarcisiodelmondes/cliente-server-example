import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";

export function Router() {
  return (
    <Switch>
      <Route component={Home} exact path={["", "/"]} />
      <Route component={SignIn} exact path={["", "/sign-in"]} />
    </Switch>
  );
}
