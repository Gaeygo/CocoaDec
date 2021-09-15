import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...props}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
};

const PreventVerify = ({ component: Component, ...props }) => {
    const { otp } = useAuth();
    return (
      <Route
        {...props}
        render={(props) => {
          return otp ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          );
        }}
      ></Route>
    );
  };

export {ProtectedRoute, PreventVerify};
