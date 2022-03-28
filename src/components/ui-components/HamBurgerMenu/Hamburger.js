import React , {useState} from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames"

import classes from "./Hamburger.module.css";

import MenuNav from "../../../images/MenuNav.png";
import ExitNav from "../../../images/Vector.svg";


const Hamburger = () => {
    const [navClicked, setNavClicked] = useState(false)
  return (
    <>
      <img onClick={(e) => setNavClicked(!navClicked)} className={classnames(classes.MenuNav, navClicked&&classes.Visibile)} src={MenuNav} alt="Nav bar"></img>
      <img onClick={(e) => setNavClicked(!navClicked)} className={classnames(classes.MenuNav, !navClicked&&classes.Visibile)} src={ExitNav} alt="Nav bar"></img>


      <div className={classnames(classes.Container, !navClicked&&classes.Visibile)}>
        <NavLink
          to="/dashboard"
          className={classes.Navitem}
          activeClassName={classes.Active}
        >
          Detect
        </NavLink>
        <NavLink
          to="/donate"
          className={classes.Navitem}
          activeClassName={classes.Active}
        >
          Donate
        </NavLink>
        <NavLink
          to="/account"
          className={classes.Navitem}
          activeClassName={classes.Active}
        >
          Account
        </NavLink>
        <NavLink
          to="/settings"
          className={classes.Navitem}
          activeClassName={classes.Active}
        >
          Settings
        </NavLink>
      </div>
    </>
  );
};

export default Hamburger;
