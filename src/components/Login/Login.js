import React, { useState, useRef, useEffect } from "react";
import Loader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

import cocoa from "../../images/CocoadecWhite.png";
import cocoaMobile from "../../images/Cocoadec.png";
import Input from "../ui-components/Input/Input";
import classes from "./Login.module.css";
import Footer from "../ui-components/Footer/Footer";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { firebase, auth, db } from "../../firebase";

const Login = () => {
  const [loading, setloading] = useState(false);
  const history = useHistory();
  const formRef = useRef(null);
  const { signInWithNumber, otp, setOtp, setCurrentNumber } = useAuth();
  const unmounted = useRef(false);

  const override = css`
    display: block;
    margin: 0 auto;
  `;

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
        setloading(true);
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
                    setCurrentNumber(formRef.current["phonenumber"].value);
                    setOtp(result);
                    setloading(false);

                    history.push("/verify");
                  })
                );
            } else {
              console.log("false");
              alert("User needs to register");
              history.push("/signup");
            }
          });
      } catch (error) {
        setloading(false);
        // console.log(error.message);
        alert(error);
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
          <Loader loading={loading} css={override} />

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
