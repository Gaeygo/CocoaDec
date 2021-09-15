import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from "./Hamburger.module.css"

const Hamburger = () => {
    return (
        <div className={classes.Container}>
               <NavLink to="/dashboard" className={classes.Navitem} activeClassName={classes.Active}>Detect</NavLink>
               <NavLink to="/donate" className={classes.Navitem} activeClassName={classes.Active}>Donate</NavLink>
               <NavLink to="/account" className={classes.Navitem} activeClassName={classes.Active}>Account</NavLink>
               <NavLink to="/settings" className={classes.Navitem} activeClassName={classes.Active}>Settings</NavLink>

        </div>
    )
}

export default Hamburger
