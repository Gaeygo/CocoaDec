import React from "react";
import classes from "./Navbar.module.css";
import logo from "../../../images/Cocoadec.png";
import { NavLink, useHistory } from "react-router-dom";


const Navbar = () => {
  const history = useHistory()
  const handleClick = (e) => {
    e.preventDefault()
    history.push("/login")
  }
  return (
    <div>
      <div className={classes.NavDiv}>
        <img src={logo} alt="logo" />
        <div className={classes.LinkDiv}>
          <NavLink
            activeClassName={classes.ActiveNavItem}
            to="/"
            className={[classes.NavItem, classes.NoMargin].join(" ")}
          >
            <h1 className={classes.NavItem}>Home</h1>
          </NavLink>

          <p className={classes.NavItem}>About</p>
          <NavLink
            activeClassName={classes.ActiveNavItem}
            to="/dashboard"
            className={[classes.NavItem, classes.NoMargin].join(" ")}
          >
            <h1 className={classes.NavItem}>Detect</h1>
          </NavLink>
        </div>
        <button onClick={handleClick}>Login</button>
      </div>
    </div>
  );
};

export default Navbar;
