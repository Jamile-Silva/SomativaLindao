import firebase from "firebase"
import "firebase/firestore"
import "firebase/storage"

var firebaseConfig = {
  apiKey: "AIzaSyC7yix8-4HSqbL_yVscic2SRN_3O0Vves8",
  authDomain: "somativalindao.firebaseapp.com",
  projectId: "somativalindao",
  storageBucket: "somativalindao.appspot.com",
  messagingSenderId: "715952411293",
  appId: "1:715952411293:web:7417e95653bf2c3ddbfa74",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
