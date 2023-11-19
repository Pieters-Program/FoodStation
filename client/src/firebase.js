// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-project-af1cb.firebaseapp.com",
    projectId: "mern-project-af1cb",
    storageBucket: "mern-project-af1cb.appspot.com",
    messagingSenderId: "445204976171",
    appId: "1:445204976171:web:81b20423b1800710df906e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);