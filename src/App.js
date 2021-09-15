import React from "react";
import Homepage from "./components/Homepage/Homepage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import OtpVerification from "./components/Otp/OtpVerification";
import DashBoard from "./components/DashBoard/DashBoard";
import { AuthProvider } from "./contexts/AuthContext";
import { TensorProvider } from "./contexts/TensorContext";
import {
  ProtectedRoute,
  PreventVerify,
} from "./components/ProtectedRoute/ProtectedRoute";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {" "}
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PreventVerify exact path="/verify" component={OtpVerification} />

            <TensorProvider>
              <ProtectedRoute exact path="/dashboard" component={DashBoard} />
            </TensorProvider>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
