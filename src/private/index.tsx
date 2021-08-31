import React, { Component, useContext } from "react";
import { Redirect, Route, RouteComponentProps, RouterProps } from "react-router";
import { AuthContext } from "../config/AuthContext";

export default function PrivateRoute(props: { Component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>; rest: RouterProps }) {
  const { Component, rest } = props;
  const { loading, isLoggedIn, currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props: RouteComponentProps) =>
        loading && !isLoggedIn ? null : currentUser === undefined ? (
          <Redirect to={`/login`} />
        ) : currentUser !== undefined && !loading ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/login`} />
        )
      }
    />
  );
}
