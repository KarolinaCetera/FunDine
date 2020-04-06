import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBd6B2AZrYYC09X20P5gALfBwHMRqgfp2E",
    authDomain: "fun-dine-app.firebaseapp.com",
    databaseURL: "https://fun-dine-app.firebaseio.com",
    projectId: "fun-dine-app",
    storageBucket: "fun-dine-app.appspot.com",
    messagingSenderId: "1081545924086",
    appId: "1:1081545924086:web:b4a18208aaa8c921ecfbd7"
};

firebase.initializeApp(firebaseConfig);

export default firebaseConfig;