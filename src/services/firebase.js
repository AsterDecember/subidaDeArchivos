import firebase from "firebase/app";
import "firebase/storage";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDteNWSohoGFYAcvjjAcesliQz1Jm0SpKs",
  authDomain: "testing-ac6cb.firebaseapp.com",
  databaseURL: "https://testing-ac6cb.firebaseio.com",
  projectId: "testing-ac6cb",
  storageBucket: "testing-ac6cb.appspot.com",
  messagingSenderId: "923452842776"
};
firebase.initializeApp(config);

export default firebase;
