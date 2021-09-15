import React, { useState, useEffect, useRef } from "react";
import cocoa from "../../images/CocoadecWhite.png";
import { Alert } from "react-bootstrap";
import cocoaMobile from "../../images/Cocoadec.png";
import Input from "../ui-components/Input/Input";
import classes from "./Signup.module.css";
import Footer from "../ui-components/Footer/Footer";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

import { useHistory } from "react-router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [errorType, setErrorType] = useState(null)
  const formRef = useRef(null);
  const { email } = useAuth();
  const history = useHistory();
  useEffect(() => {}, []);
  let Error = (
    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
      <p class="mb-0 h6 " >This {errorType} is taken </p>
    </Alert>
  );

  const signUpusers = async (e) => {
    e.preventDefault();
    let available;
    if (email) {
      formRef.current["email"].value = email;
      console.log(formRef.current["email"].value);
    }

    const userCheck = (value, order) => {
      return db
        .ref()
        .child("users")
        .orderByChild(order)
        .equalTo(value)
        .once("value", function (snapshot) {
          if (snapshot.exists()) {
            console.log("true");
            available = true;
          } else {
            console.log("false");
            available = false;
          }
        });
    };



    const checkUser = async () => {
      userCheck(formRef.current["email"].value, "email").then((res) => {
        if (!available) {
          userCheck(formRef.current["phonenumber"].value, "number").then(
            (res) => {
              if (available) {
                setShow(true)
                setErrorType("number")
              } else {
                db.ref("users/" + formRef.current["phonenumber"].value)
                  .set({
                    name: formRef.current["name"].value,
                    number: formRef.current["phonenumber"].value,
                    email: formRef.current["email"].value,
                    location: formRef.current["location"].value,
                  })
                  .catch(alert("added"));
                history.push("/login");
              }
            }
          );
        } else {
          setShow(true)
          setErrorType("email")

        }
      });

      // return available
    };

    checkUser();
  };

  return (
    
    <div className={classes.Container}>
      <div className={classes.FirstDiv}>
        <img className={classes.Logo} src={cocoa} alt="cocodec logo" />
        <img
          className={classes.LogoMobile}
          src={cocoaMobile}
          alt="cocodec logo"
        />

        <div className={classes.SignupDesc}>
          <h1>Create an account today!</h1>
          <p>
            For the safety of your personal data, there will be an additional
            verification step on the next page.
          </p>
        </div>
      </div>
      <div className={classes.SignupFormDesc}>
        {show ? Error : null}
        <h1>Sign Up</h1>
        <p>Sign Up to Cocoadec with your phone number.</p>
        <form
          onSubmit={signUpusers}
          ref={formRef}
          className={classes.SignupForm}
        >
          <Input
            className={classes.InputStyle}
            type="text"
            placeholder="Name"
            name="name"
            required
          />
          <Input
            className={classes.InputStyle}
            type="tel"
            placeholder="+234(NG)| 9013231131"
            name="phonenumber"
            required
          />
          <Input
            className={classes.InputStyle}
            type="email"
            name="email"
            placeholder="exampl@email.com"
            value={email}
            required
          />
          <Input
            className={classes.InputStyle}
            type="location"
            name="location"
            required
            placeholder="location"
          />

          <button type="submit">Sign Up</button>
        </form>
        <div className={classes.FooterContainer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Signup;
