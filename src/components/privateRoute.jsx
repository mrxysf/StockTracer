import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "./navbar";
export default function PrivateRoute({
  component: Component,
  authed,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <div>
            <Navbar {...rest.location} />
            <Component {...props} />
          </div>
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
}
