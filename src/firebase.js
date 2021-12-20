import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";


const app = firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
  databaseURL: "",

});



const auth = app.auth();
const db = firebase.database();
export {auth, firebase, db}
export default app
