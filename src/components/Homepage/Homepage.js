import React, {useRef} from "react";
import classes from "./Homepage.module.css";
import Navbar from "../ui-components/NavBar/Navbar";
import cocoa from "../../images/cocoa.png";
import FirebaseIMG from "../../images/Firebase.png";
import ReactjsIMG from "../../images/Reactjs.png";
import TensorflowIMG from "../../images/Tensorflow.png";
import Footer from "../ui-components/Footer/Footer";
import ToolsCard from "../ui-components/ToolsCard/ToolsCard";
import { useHistory } from "react-router";
import {useAuth} from "../../contexts/AuthContext"

const Homepage = () => {
  const {email, setEmail} = useAuth()
  const formRef = useRef(null)
  const history = useHistory()
  const directToSignUp = () => {
    history.push("/signup")
  }

  const startSignup = (e) => {
    e.preventDefault()
    setEmail(formRef.current["email"].value)
    history.push("/signup")
    console.log(email);
  }
  return (
    <div>
      <Navbar />
      <div className={classes.ContentDisplay}>
        <div className={classes.ImgContainer}>
          <img className={classes.CocoaIMG} src={cocoa} alt="cocoa pod" />
        </div>
        <div className={classes.IntroContainer}>
          <div className={classes.Intro}>
            <p>
              Helping you make your
              <span style={{ color: "#53B757" }}> farm</span>lands safe
            </p>
            <h2 className={classes.Declare}>
              IN PARTIAL FULFILMENT OF THE REQUIREMENTS FOR THE AWARD OF THE
              DEGREE OF BACHELOR OF SCIENCE(B.Sc.) IN COMPUTER SCIENCE
            </h2>
          </div>
          <div className={classes.ButtonContainer}>
            <button onClick={directToSignUp} className={classes.JoinButton}>Join Now</button>{" "}
            <p className={classes.Invisible}>
              See how it works➞
            </p>
          </div>
        </div>
      </div>
      <p className={[classes.DisplayedText, classes.ToolHeader].join(" ")}>
        Tools making this Possible
      </p>
      <div className={classes.ToolContainer}>
        <ToolsCard
          imageSrc={TensorflowIMG}
          ToolDesc="An Opensource machine learning library capable of doing many
          insane stuff"
          ToolName="Tensorflow"
        />
        <ToolsCard
          imageSrc={FirebaseIMG}
          ToolDesc=" A Google developed service that provides backend functionalities
          for developers."
          ToolName="Firebase"
        />{" "}
        <ToolsCard
          imageSrc={ReactjsIMG}
          ToolDesc="An frontend javascript library capable of doing many insane stuff"
          ToolName="React"
        />
        
      </div>
      <div className={classes.ContactInfoContainer}>
        <div className={classes.ContactInfo}>
          <div className={classes.SignUpText}>
            <h1>Sign up today</h1>
            <h3>Save your plants from diseases</h3>
          </div>

          <form ref={formRef} className={classes.ContactForm} onSubmit={startSignup}>
            <input placeholder="Your email" onFocus={(e) => e.target.placeholder =""} name="email" type="email" required />
            <div className={classes.FormBtn}>
              <button type="submit">SIGN UP</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
