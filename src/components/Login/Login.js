import React, { useState, useRef, useEffect } from "react";
import cocoa from "../../images/CocoadecWhite.png";
import cocoaMobile from "../../images/Cocoadec.png";
import Input from "../ui-components/Input/Input";
import classes from "./Login.module.css";
import Footer from "../ui-components/Footer/Footer";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { firebase, auth, db } from "../../firebase";

const Login = () => {
  const history = useHistory();
  const formRef = useRef(null);
  const { signInWithNumber, otp, setOtp, setCurrentNumber } = useAuth();
  const unmounted = useRef(false);

  useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("unmounted");
      unmounted.current = true;
    };
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!unmounted.current) {
      try {
        let verify = new firebase.auth.RecaptchaVerifier("sign-in-button", {
          size: "invisible",
        });
        db.ref()
          .child("users")
          .orderByChild("number")
          .equalTo(formRef.current["phonenumber"].value)
          .once("value", function (snapshot) {
            if (snapshot.exists()) {
              console.log("true");
              auth
                .setPersistence(firebase.auth.Auth.Persistence.SESSION)
                .then(() =>
                  signInWithNumber(
                    formRef.current["phonenumber"].value,
                    verify
                  ).then((result) => {
                    setCurrentNumber(formRef.current["phonenumber"].value)
                    setOtp(result);

                    history.push("/verify");
                  })
                );
            } else {
              console.log("false");
              alert("User needs to register")
              history.push("/signup")
            }
          });
      } catch (error) {
        // console.log(error.message);
      }
    }
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

        <div className={classes.LoginDesc}>
          <h1>Welcome Back!</h1>
          <p>
            For the safety of your personal data, there will be an additional
            verification step on the next page.
          </p>
        </div>
      </div>
      <div className={classes.LoginFormDesc}>
        <h1>Log in </h1>
        <p>Login with your phone number.</p>
        <form
          className={classes.LoginForm}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Input
            className={classes.InputStyle}
            type="tel"
            placeholder="+234(NG)| 9013231131"
            name="phonenumber"
            required={true}
          />
          {/* <div id="sign-in-button"></div> */}
          <button id="sign-in-button" type="submit">
            Request OTP
          </button>
        </form>
        <h3
          className={[classes.Otp, classes.H3Text].join(" ")}
          style={{ paddingTop: "50px" }}
        >
          You will receive an OTP code to verify your number.
        </h3>

        <div className={classes.FooterContainer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Login;
