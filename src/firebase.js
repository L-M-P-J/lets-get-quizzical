// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMMq2mgTd8zCIWFk_3DPtuoDKvGQJfb_g",
  authDomain: "lets-get-quizzical-94a27.firebaseapp.com",
  databaseURL: "https://lets-get-quizzical-94a27-default-rtdb.firebaseio.com",
  projectId: "lets-get-quizzical-94a27",
  storageBucket: "lets-get-quizzical-94a27.appspot.com",
  messagingSenderId: "837207574855",
  appId: "1:837207574855:web:d14bf934cd8df4b2e0e462"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;