import React, { useEffect, useState, useRef } from "react";
// import * as tf from "@tensorflow/tfjs";
import classes from "./DashBoard.module.css";
import Logo from "../../images/CocoadecWhite.png";
import Footer from "../ui-components/Footer/Footer";
import Hamburger from "../ui-components/HamBurgerMenu/Hamburger";
import LogoutBtn from "../../images/logout.png";
import Dragdrop from "../DragDrop/Dragdrop";
import { useTensor } from "../../contexts/TensorContext";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router";

import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const DashBoard = () => {
  const { image, imageName } = useTensor();
  const [result, setResult] = useState();
  const [show, setShow] = useState(false);

  const { currentUser, signOutUser, setCurrentUser } = useAuth();
  const history = useHistory();
  const [currentPathname, setCurrentPathname] = useState();
  const [currentSearch, setCurrentSearch] = useState();

  useEffect(() => {
    console.log("running");
  }, [currentPathname, currentSearch, history]);

  const handlePrediction = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      console.log(imageName);
      formData.append("image", image);
      formData.append("filename", `${imageName}`);

      await axios
        .post("http://localhost:5000/predict", formData)
        .then((res) => {
          setShow(true);
          setResult(res.data.Label);
          console.log(res);
        });
    }
  };

  const signOut = async (e) => {
    e.preventDefault();
    await signOutUser()
      .then((res) => {
        setCurrentUser(null);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };
  const handleClose = () => setShow(false);

  let resultElement = (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
      animation={false}
      
    >
      <Modal.Header  closeButton></Modal.Header>
      <Modal.Body style={{ backgroundColor: "#4F3835", color: "white", border: "none" }}>
        Detected: {result}
      </Modal.Body>
      <Modal.Footer >
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className={classes.Container}>
      <div className={classes.FirstDiv}>
        <img alt="logo" src={Logo} />
        <div className={classes.Nav}>
          <Hamburger />
        </div>
        <div onClick={signOut} className={classes.BtnContainer}>
          <button style={{ backgroundColor: " #4F3835" }}>
            <img alt="Logout" src={LogoutBtn} />
          </button>
          <span>
            {" "}
            LOGOUT <br />
            {currentUser.phoneNumber}
          </span>
        </div>
        <Footer colorStyle={{ color: "white" }} />
      </div>
      <div className={classes.Dragdrop}>
        {show ? resultElement : null}
        <h1>Upload Image here</h1>
        <Dragdrop />
        <button className={classes.Predict} onClick={handlePrediction}>
          Predict
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
