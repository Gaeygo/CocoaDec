import React, { useRef } from "react";
import cocoa from "../../images/CocoadecWhite.png";
import cocoaMobile from "../../images/Cocoadec.png";
import Input from "../ui-components/Input/Input";
import classes from "./OtpVerification.module.css";
import Footer from "../ui-components/Footer/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router";

const OtpVerification = () => {
  const { otp,setOtp, setCurrentUser, currentUser, currentNumber } = useAuth();
  const formRef = useRef();
  const history = useHistory();
  const verifyOtp = (e) => {
    e.preventDefault();
    try {
      otp.confirm(formRef.current["otp"].value).then((res) => {
        setCurrentUser(res.user);
        console.log(res.user);
        setOtp(null)
        history.push("/dashboard");
      });
    } catch (error) {
      alert(error);
      console.log(error);
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

        <div className={classes.OtpDesc}>
          <h1>Tip!</h1>
          <p>
            You should never share your cocoadec user credentials with anyone
          </p>
        </div>
      </div>
      <div className={classes.OtpFormDesc}>
        <h1>Verify your phone number</h1>
        <p>
          Please enter the verification code that was sent to {currentNumber}
        </p>
        <form className={classes.OtpForm} ref={formRef} onSubmit={verifyOtp}>
          <Input className={classes.InputStyle} name="otp" />
          <button type="submit">Verify</button>
        </form>
        <h3
          className={[classes.Otp, classes.H3Text].join(" ")}
          style={{ paddingTop: "50px" }}
        >
          Didn't receive code? Send it again.
        </h3>

        <div className={classes.FooterContainer}>
          <Footer className={classes.Footer} />
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
