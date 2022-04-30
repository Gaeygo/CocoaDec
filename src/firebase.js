import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";


const app = firebase.initializeApp({
  apiKey: "AIzaSyAugQntR9Q3eDkrUvQAuNJderjbUOXxwFE",
  authDomain: "cocoadec.firebaseapp.com",
  projectId: "cocoadec",
  storageBucket: "cocoadec.appspot.com",
  messagingSenderId: "1009721840843",
  appId: "1:1009721840843:web:cfd3d066058b2980ab774e",
  measurementId: "G-VKVKTVRJRD",
  databaseURL: "https://cocoadec-default-rtdb.firebaseio.com",


});



const auth = app.auth();
const db = firebase.database();
export {auth, firebase, db}
export default app
